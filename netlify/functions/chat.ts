import { GoogleGenAI } from "@google/genai";

interface CacheEntry {
  reply: string;
  timestamp: number;
}

const responseCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 24; // 24 hours TTL
const MAX_CACHE_SIZE = 500;

function getCacheKey(msg: string, clientName?: string): string {
  const normalized = msg
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[?!.,;]/g, "");
  return `${clientName || "default"}:${normalized}`;
}

export const handler = async (event: any) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Health-check endpoint for Netlify
  if (event.httpMethod === "GET") {
    const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "online",
        agent: "LIA - Superlimpo Atendente Virtual",
        platform: "Netlify Functions",
        aiConfigured: hasKey,
        timestamp: new Date().toISOString(),
      }),
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let body: any = {};
  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf-8")
      : event.body;
    body = typeof rawBody === "string" ? JSON.parse(rawBody || "{}") : (rawBody || {});
  } catch (e) {
    console.error("Netlify body parsing error:", e);
    body = {};
  }

  const { message, history, clientKnowledge, clientName } = body;

  if (!message || typeof message !== "string") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "Mensagem obrigatória" }),
    };
  }

  // 0. Cache lookup for fast repeated queries
  const cacheKey = getCacheKey(message, clientName);
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return {
      statusCode: 200,
      headers: { ...headers, "X-Cache": "HIT" },
      body: JSON.stringify({ reply: cached.reply, cached: true }),
    };
  }

  const hasKnowledge = typeof clientKnowledge === "string" && clientKnowledge.trim().length > 0;
  // Support any common naming variation of the API key
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const defaultLiaPrompt = `Você é a LIA, atendente virtual inteligente oficial da Superlimpo Produtos de Limpeza — O maior Delivery de Produtos de Limpeza da fronteira.

# ATENDIMENTO HUMANIZADO E LEITURA DE CONTEXTO (MUITO IMPORTANTE)
1. LEIA O HISTÓRICO DA CONVERSA: Você lê com atenção todas as mensagens anteriores trocadas com o cliente para entender o contexto. Se o cliente mandar perguntas curtas de continuação como "e esse?", "quanto custa ele?", "quais os cheiros?", "tem cheiro bom?", "vocês entregam ele?", "cobra taxa?", "qual a chave?", "e no sábado?", você deve identificar imediatamente a qual produto ou assunto ele se referiu na mensagem anterior e responder de forma coerente e conectada.
2. TOM HUMANIZADO: Seja sempre muito educada, acolhedora, simpática e prestativa. Use expressões naturais do dia a dia no Brasil (ex: "Com certeza!", "Perfeito!", "Que ótimo!", "Temos sim!", "Excelente escolha!", "Fica tranquila(o) que entregamos na sua porta!").
3. EQUIVALÊNCIAS E GÍRIAS POPULARES:
   - "vcs" ou "vc" significa "vocês" / "você".
   - "vocês entregam?" ou "vcs entregam?" significa "vocês fazem entrega?". A resposta é SIM, somos delivery exclusivo em Ponta Porã e Pedro Juan Caballero!
   - "cobra quanto?" ou "quanto cobra?" significa "qual o valor da taxa de entrega?". A resposta é que a grande maioria das nossas entregas NÃO tem custo algum (é grátis!). Dependendo da distância e do pedido, cobramos apenas uma pequena taxa.
   - "limpa pisos", "limpador de piso" ou "produto para piso" é o mesmo que o nosso "Limpa Porcelanato e Cerâmica 5L" (R$ 30,00).
   - "Vanish" ou "tipo vanish" é o nosso "Alvejante sem Cloro 5L" (R$ 30,00).
   - "Desinfetante Perfumado" tem 6 essências disponíveis: Lavanda, Jasmin, Citronela, Kayak, Frutas Vermelhas e Eucalipto. Quando perguntarem sobre aromas, cheiros ou essências, apresente com carinho essas 6 opções!

# REGRAS RÍGIDAS DE SEGURANÇA (GUARDRAILS)
1. NÃO INVENTAR E NÃO ALUCINAR: Responda com base nas informações contidas neste banco de dados. Nunca invente produtos, tamanhos, descontos ou regras que não estejam listados.
2. REGRA DE TRANSBORDO: Se o cliente perguntar algo fora do escopo ou que você não saiba, responda com gentileza e o link do WhatsApp:
"Vou passar para o atendimento humano: [Clique aqui para falar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
3. LINKS CLICÁVEIS: Sempre use Markdown [Texto do Botão](URL) para links clicáveis.

# DADOS DA EMPRESA E CANAIS OFICIAIS
- Nome: Superlimpo Produtos de Limpeza
- Posicionamento: O maior Delivery de Produtos de limpeza da fronteira
- WhatsApp (Número): 67 99834-2469 (67998342469)
- Link do WhatsApp: [Falar no WhatsApp da Superlimpo](https://api.whatsapp.com/send?phone=5567998342469)
- Nosso Site: [Acessar Site Superlimpo](https://superlimpoprodutosdelimpeza.lovable.app/)
- Chave Pix: 67993174612
- Instagram: [Seguir no Instagram](https://www.instagram.com/superlimpoprodutosdelimpeza?exln=YTQxenNhaXB0ejdn)
- Perfil no Google: [Ver Perfil no Google](https://g.co/kgs/NzjgPj)
- Como Chegar: [Abrir no Google Maps](https://maps.app.goo.gl/WP6PrQUTYoC1ZQ5Y9)

# REGRAS DE OPERAÇÃO, ENTREGA E PAGAMENTO
- Loja Física: Não temos loja física. Trabalhamos exclusivamente com entrega em toda a região de Ponta Porã e Pedro Juan Caballero.
- Entregas / Delivery: SIM, entregamos na sua casa ou comércio!
- Horários de Entrega (Segunda a Sexta): As entregas são feitas até às 16:00 horas.
- Horários de Entrega (Sábados): Aos sábados somente às 07:00 horas e às 15:30 horas.
- Taxa de Entrega (Cobra Quanto): A maioria das entregas não tem custo (grátis!). Dependendo da distância e do pedido, cobramos apenas uma pequena taxa de entrega.
- Documento Fiscal: Não temos Nota Fiscal, apenas Recibo.
- Pagamento via Pix: Chave Pix 67993174612.

# TABELA DE PRODUTOS E PREÇOS

## Linha Dona de Casa
- Kit de Produto (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L): Todos os 3 por R$ 38,00
- Água sanitária (5 litros): R$ 12,00
- Cloro Ativo 12% (5 litros): R$ 45,00
- Desinfetante Perfumado (5 litros): R$ 15,00 (Essências disponíveis: Lavanda, Jasmin, Citronela, Kayak, Frutas Vermelhas e Eucalipto)
- Sabão de álcool - Feito com óleo novo (5 litros): R$ 15,00
- Sabão Lava Roupas Azul: R$ 35,00
- Amaciante de roupa (5 litros): R$ 25,00
- Alvejante sem cloro - Tipo Vanish (5 litros): R$ 30,00 (Vanish)
- Lava louças (5 litros): R$ 25,00
- Limpa Pedras (5 litros): R$ 30,00
- Limpa Porcelanato & Cerâmica (5 litros) [Limpa Pisos]: R$ 30,00

## Linha Empresas (5 litros)
- Limpa Chapas (5 litros): R$ 30,00
- Brilho alumínio (5 litros): R$ 30,00
- Shampoo Automotivo (5 litros): R$ 30,00
- Desengraxante Automotivo (5 litros): R$ 30,00
- Ativado (5L): R$ 30,00

# REGRA DA TABELA DE PREÇOS
Se o cliente pedir a tabela de preços, preços completos ou todos os produtos, envie:
Tabela de produtos Superlimpo

Linha dona de casa:
• Kit de Produto com (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L) todos os 3 por R$ 38,00
• Água sanitária 5 litros R$ 12,00
• Cloro Ativo 12% 5 litros R$ 45,00
• Desinfetante Perfumado 5 litros R$ 15,00 (Essências: Lavanda, Jasmin, Citronela, Kayak, Frutas Vermelhas e Eucalipto)
• Sabão de álcool (Feito com óleo novo) 5 litros R$ 15,00
• Sabão Lava Roupas Azul R$ 35,00
• Amaciante de roupa 5 litros R$ 25,00
• Alvejante sem cloro 5 litros (Tipo Vanish) R$ 30,00
• Lava louças 5 litros R$ 25,00
• Limpa Pedras 5 litros R$ 30,00
• Limpa Porcelanato & Cerâmica 5 litros (Limpa Pisos) R$ 30,00

Linha empresas:
• Limpa Chapas 5 litros R$ 30,00
• Brilho alumínio 5 litros R$ 30,00
• Shampoo Automotivo 5 litros R$ 30,00
• Desengraxante Automotivo 5 litros R$ 30,00
• Ativado (5L): R$ 30,00

[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)

# DIRETRIZES FINAIS
- Ao final de cada resposta sobre produtos, cheiros ou entregas, convide o cliente de forma acolhedora para fechar o pedido pelo WhatsApp com o link clicável: [Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)`;

      const systemInstruction = hasKnowledge
        ? `${defaultLiaPrompt}\n\nBANCO DE DADOS E CONHECIMENTO ADICIONAL:\n${clientKnowledge}`
        : defaultLiaPrompt;

      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      // Add conversation history ensuring first turn is from user (required by Gemini)
      if (Array.isArray(history)) {
        const validTurns = history.filter(
          (h: any) => h && h.text && (h.role === "user" || h.role === "assistant")
        );
        const firstUserIdx = validTurns.findIndex((h: any) => h.role === "user");
        if (firstUserIdx >= 0) {
          const userStartedHistory = validTurns.slice(firstUserIdx);
          for (const h of userStartedHistory.slice(-8)) {
            contents.push({
              role: h.role === "user" ? "user" : "model",
              parts: [{ text: h.text }],
            });
          }
        }
      }

      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const candidateModels = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-3.8-flash", "gemini-2.5-flash-lite"];
      let reply = "";

      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction,
              temperature: 0.2,
              maxOutputTokens: 1024,
            },
          });
          if (response.text) {
            reply = response.text;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${model} failed on Netlify:`, err?.message);
        }
      }

      if (reply) {
        if (responseCache.size >= MAX_CACHE_SIZE) {
          const firstKey = responseCache.keys().next().value;
          if (firstKey) responseCache.delete(firstKey);
        }
        responseCache.set(cacheKey, { reply, timestamp: Date.now() });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ reply, cached: false }),
        };
      }
    } catch (error: any) {
      console.error("Netlify Function Error:", error);
    }
  }

function getSmartFallback(msg: string): string {
  const q = msg
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\bvcs\b/g, "voces")
    .replace(/\bvc\b/g, "voce")
    .replace(/\bqto\b/g, "quanto")
    .replace(/\bpq\b/g, "porque")
    .replace(/\btbm\b/g, "tambem");

  if (
    q.includes("essencia") ||
    q.includes("fragrancia") ||
    q.includes("aroma") ||
    q.includes("cheiro") ||
    q.includes("lavanda") ||
    q.includes("jasmin") ||
    q.includes("citronela") ||
    q.includes("kayak") ||
    q.includes("frutas vermelhas") ||
    q.includes("eucalipto")
  ) {
    return "Temos 6 essências maravilhosas para o nosso Desinfetante Perfumado (galão de 5 litros por R$ 15,00):\n• 🌸 Lavanda\n• 🌺 Jasmin\n• 🌿 Citronela\n• 🌊 Kayak\n• 🍓 Frutas Vermelhas\n• 🍃 Eucalipto\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
  }

  if (q.includes("piso") || q.includes("porcelanato") || q.includes("ceramica")) {
    return "Temos sim! O nosso Limpa Porcelanato & Cerâmica (5 litros) é o produto ideal para pisos, cerâmicas e porcelanatos. Custa apenas R$ 30,00 e deixa o chão com brilho incrível!\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
  }

  if (q.includes("vanish") || q.includes("sem cloro") || q.includes("tira mancha") || q.includes("alvejante")) {
    return "Temos sim! O nosso Alvejante sem Cloro (Tipo Vanish) galão de 5 litros custa R$ 30,00. Possui oxigênio ativo que remove manchas difíceis sem agredir os tecidos!\n\n[Clique aqui para pedir no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
  }

  if (q.includes("entrega") || q.includes("entregam") || q.includes("delivery")) {
    return "Sim, com certeza! A Superlimpo trabalha exclusivamente com entregas rápidas em toda Ponta Porã e Pedro Juan Caballero!\n\nHorários de entrega:\n• Segunda a Sexta: até às 16:00h\n• Sábados: às 07:00h e às 15:30h\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
  }

  if (q.includes("cobra") || q.includes("taxa") || q.includes("frete")) {
    return "A grande maioria das nossas entregas não tem custo algum (é grátis!). Dependendo da distância e do pedido, cobramos apenas uma pequena taxa de entrega.\n\n[Clique aqui para consultar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
  }

  if (q.includes("tabela") || q.includes("preco") || q.includes("produto") || q.includes("catalogo") || q.includes("valor")) {
    return `Tabela de produtos Superlimpo

Linha dona de casa:
• Kit de Produto com (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L) todos os 3 por R$ 38,00
• Água sanitária 5 litros R$ 12,00
• Cloro Ativo 12% 5 litros R$ 45,00
• Desinfetante Perfumado 5 litros R$ 15,00 (Essências: Lavanda, Jasmin, Citronela, Kayak, Frutas Vermelhas e Eucalipto)
• Sabão de álcool (Feito com óleo novo) 5 litros R$ 15,00
• Sabão Lava Roupas Azul R$ 35,00
• Amaciante de roupa 5 litros R$ 25,00
• Alvejante sem cloro 5 litros (Tipo Vanish) R$ 30,00
• Lava louças 5 litros R$ 25,00
• Limpa Pedras 5 litros R$ 30,00
• Limpa Porcelanato & Cerâmica 5 litros (Limpa Pisos) R$ 30,00

Linha empresas:
• Limpa Chapas 5 litros R$ 30,00
• Brilho alumínio 5 litros R$ 30,00
• Shampoo Automotivo 5 litros R$ 30,00
• Desengraxante Automotivo 5 litros R$ 30,00
• Ativado 5L R$ 30,00

[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)`;
  }

  if (q.includes("pix") || q.includes("pagar") || q.includes("chave")) {
    return "Nossa chave Pix é o número de celular: 67993174612.\n\n[Clique aqui para confirmar o comprovante no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
  }

  return "Vou passar para o atendimento humano: [Clique aqui para falar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
}

  // Fallback if no API key is configured or offline
  const reply = getSmartFallback(message);

  if (responseCache.size >= MAX_CACHE_SIZE) {
    const firstKey = responseCache.keys().next().value;
    if (firstKey) responseCache.delete(firstKey);
  }
  responseCache.set(cacheKey, { reply, timestamp: Date.now() });

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ reply, cached: false, isFallback: true }),
  };
};
