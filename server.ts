import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Initialize Gemini API client (automatically picks up GEMINI_API_KEY from environment)
const ai = new GoogleGenAI();

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

// Endpoint for smart AI chatbot
app.post("/api/chat", async (req, res) => {
  const { message, history, clientKnowledge, clientName } = req.body;

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: "Mensagem inválida" });
    return;
  }

  // 0. Cache lookup for fast repeated queries
  const cacheKey = getCacheKey(message, clientName);
  const cached = responseCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    res.setHeader("X-Cache", "HIT");
    res.json({ reply: cached.reply, cached: true });
    return;
  }

  res.setHeader("X-Cache", "MISS");

  try {
    const hasKnowledge = typeof clientKnowledge === "string" && clientKnowledge.trim().length > 0;

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

    // Add recent history if available
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
        console.warn(`Model ${model} attempt failed:`, err?.message || err);
      }
    }

    if (!reply) {
      reply = "Vou passar para o atendimento humano: [Clique aqui para falar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (reply) {
      if (responseCache.size >= MAX_CACHE_SIZE) {
        const firstKey = responseCache.keys().next().value;
        if (firstKey) responseCache.delete(firstKey);
      }
      responseCache.set(cacheKey, { reply, timestamp: Date.now() });
    }

    res.json({ reply, cached: false });
  } catch (error: any) {
    console.error("Gemini API Error:", error?.message || error);
    res.json({
      reply: "Olá! Como posso ajudar você hoje?",
      isFallback: true,
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

startServer();
