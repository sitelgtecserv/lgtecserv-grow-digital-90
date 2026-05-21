import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Loader2, Sparkles, MessageCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WHATSAPP_LINK = 'https://wa.me/258849951015';

export const AiAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) setShowPulse(false);
  }, [open]);

  // Limpar markdown das respostas (**, *, [links], etc.)
  const stripMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')  // **bold** → bold
      .replace(/\*(.*?)\*/g, '$1')      // *italic* → italic
      .replace(/\[(.*?)\]\((.*?)\)/g, '$1 ($2)')  // [text](url) → text (url)
      .replace(/#{1,6}\s/g, '')         // ### headers → plain
      .replace(/`(.*?)`/g, '$1')        // `code` → code
      .trim();
  };

  const sendToAI = async (allMessages: Message[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('ia-loja', {
        body: {
          action: 'chat',
          messages: allMessages.map(m => ({ role: m.role, content: m.content })),
        },
      });

      if (error) throw error;

      const raw = data?.reply || `Desculpe, não consegui processar. Fale connosco pelo WhatsApp: ${WHATSAPP_LINK}`;
      return stripMarkdown(raw);
    } catch (err: any) {
      console.error('Erro IA:', err);
      return `Peço desculpa, ocorreu um erro. 😊 Fale com a nossa equipa:\n\n📱 WhatsApp: ${WHATSAPP_LINK}\n📞 +258 86 982 4047`;
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    const reply = await sendToAI(newMessages);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestion = async (text: string) => {
    const userMessage: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);

    const reply = await sendToAI(newMessages);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button - animated toggle */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="floating-btn"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setOpen(true)}
            className={cn(
              'fixed z-40',
              'bottom-[8.5rem] right-6 md:bottom-[5.5rem] md:right-6',
              'w-12 h-12 md:w-14 md:h-14 rounded-full',
              'bg-gradient-to-br from-primary to-primary-dark',
              'text-white shadow-lg hover:shadow-xl',
              'flex items-center justify-center',
              'transition-all duration-300 hover:scale-110',
              'group'
            )}
            aria-label="Assistente IA"
          >
            <Sparkles className="h-5 w-5 md:h-6 md:w-6 group-hover:rotate-12 transition-transform" />
            {showPulse && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500" />
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-popup"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'fixed z-50',
              'bottom-20 right-4 left-4 md:left-auto md:right-6 md:bottom-24',
              'w-auto md:w-[380px] h-[480px] md:h-[550px]',
              'max-h-[calc(100dvh-150px)] md:max-h-[calc(100vh-120px)]',
              'bg-background/95 backdrop-blur-md border border-border/80 rounded-2xl shadow-2xl',
              'flex flex-col overflow-hidden'
            )}
          >
            {/* Header */}
            <div className="p-4 border-b bg-gradient-to-r from-primary to-primary/90 text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base leading-tight">Assistente LG TecServ</h3>
                  <p className="text-[10px] md:text-xs text-white/80 font-normal leading-normal">
                    Posso ajudar a encontrar o produto ideal
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="h-8 w-8 rounded-full text-white/90 hover:text-white hover:bg-white/10"
              >
                <X className="h-4.5 w-4.5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.length === 0 && (
                <div className="text-center py-4">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 border border-primary/20">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-base mb-2">Olá! 👋</h3>
                  <p className="text-xs text-muted-foreground mb-4 max-w-[280px] mx-auto leading-relaxed">
                    Sou a assistente da LG TecServ. Posso ajudar a encontrar produtos, recomendar o melhor para si ou tirar dúvidas!
                  </p>
                  <div className="space-y-2 max-w-[300px] mx-auto">
                    {[
                      'Quais são os produtos mais baratos?',
                      'Preciso de um celular bom e barato',
                      'Que serviços vocês oferecem?',
                      'Quero falar com a equipa',
                    ].map((s) => (
                      <Button
                        key={s}
                        variant="outline"
                        size="sm"
                        className="w-full text-left justify-start text-xs rounded-xl hover:bg-primary/5 hover:text-primary transition-all duration-300 border-border/80"
                        onClick={() => handleSuggestion(s)}
                      >
                        <MessageCircle className="h-3 w-3 mr-2 text-primary flex-shrink-0" />
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                >
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs md:text-sm leading-relaxed shadow-sm',
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-muted border border-border/40 rounded-bl-sm text-foreground'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted border border-border/40 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5 items-center">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t bg-card">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escreva uma mensagem..."
                  disabled={loading}
                  className="flex-1 rounded-xl border-border/85"
                />
                <Button size="icon" onClick={sendMessage} disabled={!input.trim() || loading} className="rounded-xl shrink-0">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-[9px] text-muted-foreground text-center mt-2 font-medium">
                IA assistente — respostas podem conter imprecisões
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
