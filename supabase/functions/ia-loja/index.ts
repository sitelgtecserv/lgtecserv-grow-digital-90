import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const WHATSAPP_LINK = "https://wa.me/258869824047";

const COMPANY_CONTEXT = `SOBRE A LG TECSERV:
Empresa moçambicana de soluções digitais e tecnologia, sediada em Maputo, Moçambique. Fundada em 2019.

CONTACTOS OFICIAIS:
- Email geral: contato@lgtecserv.com
- Email loja/pedidos: loja@lgtecserv.com
- Email topografia: topografia@lgtecserv.com
- Telefone 1: +258 84 1524 822
- Telefone 2: +258 86 982 4047
- WhatsApp: +258 86 982 4047 (link directo: ${WHATSAPP_LINK})
- Website: www.lgtecserv.com

REDES SOCIAIS:
- Facebook: facebook.com/lgtecserv
- Instagram: instagram.com/lgtecserv
- WhatsApp Business: wa.me/258869824047

NOSSOS 8 SERVIÇOS:
1. Criação de Sites — sites profissionais, responsivos, optimizados SEO (/servicos/criacao-de-sites)
2. Design Gráfico — logotipos, cartões, flyers, identidade visual (/servicos/design-grafico)
3. Tráfego Pago — campanhas Google Ads, Meta Ads, conversão (/servicos/trafego-pago)
4. Gestão de Redes Sociais — conteúdo, calendário editorial, engagement (/servicos/redes-sociais)
5. Consultoria de Marketing — estratégia digital, branding (/servicos/consultoria-marketing)
6. Instalações Eléctricas — Residencial e Industrial (/servicos/eletricidade-residencial e /servicos/eletricidade-industrial)
7. Topografia — levantamentos topográficos profissionais (/servicos/topografia)
8. Ensaios Fotográficos — fotografia profissional (/servicos/ensaios-fotograficos)

PÁGINAS DO SITE:
- Home: /
- Loja Online: /loja
- Sobre Nós: /sobre
- Serviços: /servicos
- Contacto: /contacto
- FAQ: /faq
- Documentação: /documentacao
- Carrinho: /carrinho
- Meus Pedidos: /meus-pedidos

LOJA ONLINE:
Vendemos produtos tecnológicos: celulares, laptops, computadores, acessórios. Moeda: MTn (Meticais moçambicanos).`;

const NO_MARKDOWN_RULE = `REGRA CRÍTICA DE FORMATAÇÃO:
NUNCA use markdown nas suas respostas. Proibido absolutamente:
- Asteriscos para negrito ou itálico (** ou *)
- Cardinais para títulos (#, ##, ###)
- Traços ou bullets para listas (-, *, +)
- Blocos de código (\`\`\`)
- Underscores para ênfase (_)
Escreva sempre em texto corrido natural, fluido e conversacional. Para enumerar use frases ou números seguidos de ponto (1. 2. 3.).`;

const SYSTEM_PROMPT = `Você é a assistente virtual inteligente da LG TecServ.

${COMPANY_CONTEXT}

REGRAS DE ATENDIMENTO:
1. Responda SEMPRE em português de Moçambique, simpática e profissional
2. Recomende produtos baseados nas necessidades do cliente
3. Mencione preços em MTn
4. Nunca invente produtos que não estão no catálogo
5. Se não souber a resposta, responda: "Não tenho essa informação no momento. A nossa equipa pode ajudar! Fale connosco pelo WhatsApp ${WHATSAPP_LINK} ou ligue +258 86 982 4047"
6. Incentive o cliente a adicionar ao carrinho ou contactar via WhatsApp
7. Mantenha respostas curtas (máx 3 parágrafos)
8. Para serviços, explique brevemente e redirecione ao WhatsApp ou página do serviço
9. Seja proactiva: sugira produtos relacionados, pergunte orçamento

${NO_MARKDOWN_RULE}`;

function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function callOpenAI(apiKey: string, messages: any[], maxTokens: number) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    console.error("OpenAI error:", data);
    throw new Error(data.error?.message || "Erro OpenAI");
  }
  return data.choices?.[0]?.message?.content || "";
}

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

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { action, messages, prompt } = await req.json();

    // ========== CHAT ==========
    if (action === "chat") {
      const { data: products } = await supabase
        .from("products")
        .select("name, description, price, stock, categories(name)")
        .order("created_at", { ascending: false });

      let catalog = "CATÁLOGO ACTUAL DA LOJA:\n";
      if (products && products.length > 0) {
        const available = products.filter((p: any) => p.stock > 0);
        const soldOut = products.filter((p: any) => p.stock === 0);

        catalog += available
          .map((p: any) =>
            `• ${p.name} — ${p.price} MTn | Stock: ${p.stock} | Categoria: ${p.categories?.name || "Geral"} | ${(p.description || "").substring(0, 80)}`
          )
          .join("\n");

        if (soldOut.length > 0) {
          catalog += "\n\nEsgotados (não recomendar):\n";
          catalog += soldOut.map((p: any) => `• ${p.name} (VENDIDO)`).join("\n");
        }
      } else {
        catalog += "Sem produtos no momento.";
      }

      const apiMessages = [
        { role: "system", content: `${SYSTEM_PROMPT}\n\n${catalog}` },
        ...(messages || []),
      ];

      const raw = await callOpenAI(OPENAI_KEY, apiMessages, 500);
      const reply = stripMarkdown(raw) || "Erro ao gerar resposta.";

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

      const raw = await callOpenAI(OPENAI_KEY, [
        {
          role: "system",
          content: `Você é um consultor de vendas de e-commerce em Moçambique para a LG TecServ. Analise os dados e forneça:
1. Três sugestões práticas para aumentar vendas
2. Alertas sobre produtos com stock baixo
3. Tendências identificadas
4. Sugestão de novos produtos para o catálogo

Responda em português de Moçambique, objectivo e profissional.

${NO_MARKDOWN_RULE}`,
        },
        { role: "user", content: context },
      ], 800);

      const insights = stripMarkdown(raw) || "Sem dados suficientes.";
      return new Response(
        JSON.stringify({ insights }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ========== GENERATE DESCRIPTION ==========
    if (action === "generate-description") {
      const raw = await callOpenAI(OPENAI_KEY, [
        {
          role: "system",
          content: `Você é copywriter SEO profissional de e-commerce em Moçambique para a LG TecServ. Crie descrições de produtos:
- Optimizadas para SEO com keywords moçambicanas relevantes (Moçambique, Maputo, MTn quando fizer sentido)
- Curtas (2 a 3 frases), vendedoras e focadas em benefícios
- Texto corrido natural em português de Moçambique
- Que convertem visitas em vendas

${NO_MARKDOWN_RULE}`,
        },
        { role: "user", content: `Crie uma descrição SEO profissional para: ${prompt}` },
      ], 300);

      const description = stripMarkdown(raw) || "Erro ao gerar descrição.";
      return new Response(
        JSON.stringify({ description }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: "Acção inválida" }),
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
