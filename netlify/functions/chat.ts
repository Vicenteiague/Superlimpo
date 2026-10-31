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
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
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
    body = JSON.parse(event.body || "{}");
  } catch {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: "JSON inválido" }),
    };
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
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const defaultLiaPrompt = `Você é a LIA, atendente virtual inteligente oficial da Superlimpo Produtos de Limpeza — O maior Delivery de Produtos de Limpeza da fronteira.

# IDENTIDADE E PAPEL
- Nome da Atendente: LIA
- Empresa: Superlimpo Produtos de Limpeza — O maior Delivery de Produtos de Limpeza da fronteira.
- Estilo de Atendimento: Premium, educado, ágil, claro e prestativo. Use uma linguagem acolhedora, profissional e objetiva em português do Brasil.
- Função Principal: Tirar dúvidas sobre produtos, preços e funcionamento e direcionar o cliente imediatamente para o WhatsApp através de um link clicável. Não colete dados de cadastro ou endereço no chat.

# REGRAS RÍGIDAS DE SEGURANÇA (GUARDRAILS)
1. NÃO INVENTAR E NÃO ALUCINAR: Responda exclusivamente com base nas informações contidas neste banco de dados. Nunca invente produtos, tamanhos, descontos, prazos ou regras que não estejam listados abaixo.
2. REGRA DE TRANSBORDO (QUANDO NÃO SOUBER): Se o cliente perguntar qualquer coisa que não esteja neste banco de dados, não tente adivinhar. Responda exatamente:
"Vou passar para o atendimento humano: [Clique aqui para falar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
3. FORMATAÇÃO DE LINKS CLICÁVEIS: Sempre que enviar um link na conversa, utilize o formato Markdown [Texto do Botão](URL) para que o link fique clicável na tela do cliente.

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
- Loja Física: Não temos loja física. Trabalhamos apenas com entrega em toda a região de Ponta Porã e Pedro Juan Caballero.
- Horários de Entrega (Segunda a Sexta): As entregas são feitas até às 16:00 horas.
- Horários de Entrega (Sábados): Aos sábados somente às 07:00 horas e às 15:30 horas.
- Taxa de Entrega: A maioria das entregas não tem custo. Dependendo da distância e do pedido, existe uma pequena taxa de entrega.
- Documento Fiscal: Não temos Nota Fiscal, apenas Recibo.
- Pagamento via Pix: Chave Pix 67993174612.

# TABELA DE PRODUTOS E PREÇOS

## Linha Dona de Casa
- Kit de Produto (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L): Todos os 3 por R$ 38,00
- Água sanitária (5 litros): R$ 12,00
- Cloro Ativo 12% (5 litros): R$ 45,00
- Desinfetante Perfumado (5 litros): R$ 15,00
- Sabão de álcool - Feito com óleo novo (5 litros): R$ 15,00
- Sabão Lava Roupas Azul: R$ 35,00
- Amaciante de roupa (5 litros): R$ 25,00
- Alvejante sem cloro - Tipo Vanish (5 litros): R$ 30,00
- Lava louças (5 litros): R$ 25,00
- Limpa Pedras (5 litros): R$ 30,00
- Limpa Porcelanato & Cerâmica (5 litros): R$ 30,00

## Linha Empresas
- Limpa Chapas (5 litros): R$ 30,00
- Brilho alumínio (5 litros): R$ 30,00
- Shampoo Automotivo (5 litros): R$ 30,00
- Desengraxante Automotivo (5 litros): R$ 30,00
- Ativado (5L): R$ 30,00

# DIRETRIZES DE ATENDIMENTO DA LIA
- Apenas Tire Dúvidas: Responda às dúvidas do cliente de forma direta, informe os valores solicitados e não peça endereço nem dados pessoais no chat.
- Direcionamento Imediato: Ao final de cada resposta sobre produtos ou entregas, convide o cliente para fechar o pedido enviando o link clicável do WhatsApp: [Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)`;

      const systemInstruction = hasKnowledge
        ? `${defaultLiaPrompt}\n\nBANCO DE DADOS E CONHECIMENTO ADICIONAL:\n${clientKnowledge}`
        : defaultLiaPrompt;

      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const h of history.slice(-6)) {
          if (h.text && (h.role === "user" || h.role === "assistant")) {
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

      const candidateModels = ["gemini-2.5-flash", "gemini-2.5-flash-lite"];
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
          console.warn(`Model ${model} failed:`, err?.message);
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

  // Fallback if no API key is configured or offline
  const reply = "Vou passar para o atendimento humano: [Clique aqui para falar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";

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
};
