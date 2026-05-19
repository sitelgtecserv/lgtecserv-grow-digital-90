import { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Bot, Send, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      {/* Floating Button - positioned ABOVE BottomNav on mobile */}
      <button
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
      </button>

      {/* Chat Panel */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col">
          <SheetHeader className="p-4 border-b bg-gradient-to-r from-primary/5 to-primary/10">
            <SheetTitle className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-base">Assistente LG TecServ</p>
                <p className="text-xs text-muted-foreground font-normal">Posso ajudar a encontrar o produto ideal</p>
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Olá! 👋</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sou a assistente da LG TecServ. Posso ajudar a encontrar produtos, recomendar o melhor para si ou tirar dúvidas!
                </p>
                <div className="space-y-2">
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
                      className="w-full text-left justify-start text-xs"
                      onClick={() => handleSuggestion(s)}
                    >
                      <MessageCircle className="h-3 w-3 mr-2 flex-shrink-0" />
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
                    'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm',
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted rounded-bl-sm'
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-background">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escreva uma mensagem..."
                disabled={loading}
                className="flex-1"
              />
              <Button size="icon" onClick={sendMessage} disabled={!input.trim() || loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              IA assistente — respostas podem conter imprecisões
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
