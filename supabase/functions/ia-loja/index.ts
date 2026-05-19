import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const WHATSAPP_LINK = "https://wa.me/258869824047";

const SYSTEM_PROMPT = `Você é a assistente virtual inteligente da LG TecServ, uma empresa moçambicana de soluções digitais e tecnologia.

SOBRE A EMPRESA:
- Nome: LG TecServ
- Localização: Moçambique
- WhatsApp: +258 86 982 4047
- Website: www.lgtecserv.com
- Serviços: Criação de Sites, Design Gráfico, Tráfego Pago, Gestão de Redes Sociais, Consultoria de Marketing, Instalações Elétricas, Topografia, Ensaios Fotográficos
- Loja Online: vende produtos tecnológicos (celulares, laptops, computadores, acessórios)
- Moeda: MTn (Meticais moçambicanos)

REGRAS OBRIGATÓRIAS:
1. Responda SEMPRE em português de Moçambique, de forma simpática e profissional
2. Recomende produtos baseados nas necessidades do cliente
3. Mencione preços em MTn
4. Nunca invente produtos que não estão no catálogo
5. Se não souber a resposta ou não tiver o produto, responda:
   "Não tenho essa informação no momento. 😊 Mas a nossa equipa pode ajudar! Fale connosco directamente pelo WhatsApp: ${WHATSAPP_LINK} ou ligue para +258 86 982 4047"
6. Incentive o cliente a adicionar ao carrinho ou contactar via WhatsApp
7. Mantenha respostas curtas (máx 3 parágrafos)
8. Quando o cliente perguntar sobre serviços (sites, design, etc), explique brevemente e redirecione para o WhatsApp
9. Seja proactiva: sugira produtos relacionados, pergunte o orçamento do cliente
10. Use emojis com moderação para ser mais amigável`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const OPENAI_KEY = Deno.env.get("iadaloja");
    if (!OPENAI_KEY) {
      return new Response(
        JSON.stringify({ error: "Chave da IA não configurada" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, messages, prompt } = await req.json();

    // ========== CHAT ==========
    if (action === "chat") {
      const { data: products } = await supabase
        .from("products")
        .select("name, description, price, stock, categories(name)")
        .order("created_at", { ascending: false });

      let catalog = "CATÁLOGO ACTUAL:\n";
      if (products) {
        const available = products.filter((p: any) => p.stock > 0);
        const soldOut = products.filter((p: any) => p.stock === 0);

        catalog += available
          .map((p: any) =>
            `• ${p.name} — ${p.price} MTn | Stock: ${p.stock} | Cat: ${p.categories?.name || "Geral"} | ${(p.description || "").substring(0, 80)}`
          )
          .join("\n");

        if (soldOut.length > 0) {
          catalog += "\n\nEsgotados (não recomendar):\n";
          catalog += soldOut.map((p: any) => `• ${p.name} (VENDIDO)`).join("\n");
        }
      }

      const apiMessages = [
        { role: "system", content: `${SYSTEM_PROMPT}\n\n${catalog}` },
        ...(messages || []),
      ];

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: apiMessages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("OpenAI error:", data);
        throw new Error(data.error?.message || "Erro OpenAI");
      }

      const reply = data.choices?.[0]?.message?.content || "Erro ao gerar resposta.";
      return new Response(
        JSON.stringify({ reply }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ========== AI INSIGHTS ==========
    if (action === "ai-insights") {
      const { data: products } = await supabase
        .from("products")
        .select("name, price, stock, categories(name)");

      const { data: orders } = await supabase
        .from("orders")
        .select("total_amount, status");

      const totalOrders = orders?.length || 0;
      const completed = orders?.filter((o: any) => o.status === "completed").length || 0;
      const revenue = orders
        ?.filter((o: any) => o.status === "completed")
        .reduce((sum: number, o: any) => sum + (Number(o.total_amount) || 0), 0) || 0;

      const context = `
PRODUTOS (${products?.length || 0} total):
${products?.map((p: any) => `- ${p.name}: ${p.price} MTn, stock: ${p.stock}, cat: ${p.categories?.name}`).join("\n") || "Nenhum"}

PEDIDOS: Total=${totalOrders}, Concluídos=${completed}, Receita=${revenue} MTn`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `Você é um consultor de vendas de e-commerce em Moçambique. Analise os dados e forneça:
1. 3 sugestões práticas para aumentar vendas
2. Alertas sobre produtos com estoque baixo
3. Tendências identificadas
4. Sugestão de novos produtos para o catálogo
Responda em português, objectivo e profissional. Use emojis.`,
            },
            { role: "user", content: context },
          ],
          max_tokens: 800,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const insights = data.choices?.[0]?.message?.content || "Sem dados suficientes.";
      return new Response(
        JSON.stringify({ insights }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ========== GENERATE DESCRIPTION ==========
    if (action === "generate-description") {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Você é um copywriter profissional de e-commerce em Moçambique. Crie descrições de produtos atraentes, curtas (2-3 frases), focadas em benefícios. Use português de Moçambique. A descrição deve vender o produto.",
            },
            { role: "user", content: `Crie uma descrição profissional para: ${prompt}` },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      const data = await response.json();
      const description = data.choices?.[0]?.message?.content || "Erro.";
      return new Response(
        JSON.stringify({ description }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Ação inválida" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
