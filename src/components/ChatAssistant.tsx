import { useState, useRef, useEffect, ReactNode } from "react";
import { MessageCircle, CornerDownLeft, RotateCcw, ExternalLink } from "lucide-react";
import type { BiositeData } from "../data/conectacard";

interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

interface ChatAssistantProps {
  data: BiositeData;
}

/**
 * Parses plain text containing URLs or Markdown links and renders them as clickable <a> tags.
 */
function renderFormattedText(text: string, isUser: boolean): ReactNode[] {
  // Regex to match markdown links [label](url) or standalone URLs (http:// or https://)
  const regex = /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g;
  const elements: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      elements.push(text.substring(lastIndex, matchIndex));
    }

    if (match[1]) {
      // Markdown link: [Label](url)
      const label = match[2];
      const url = match[3];
      elements.push(
        <a
          key={`md-${matchIndex}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            isUser
              ? "underline font-bold text-black hover:opacity-80 inline-flex items-center gap-0.5 break-all"
              : "text-[#38bdf8] hover:text-[#7dd3fc] font-semibold underline underline-offset-2 inline-flex items-center gap-1 break-all transition-colors cursor-pointer"
          }
        >
          <span>{label}</span>
          <ExternalLink className="w-3 h-3 inline shrink-0 opacity-80" />
        </a>
      );
    } else if (match[4]) {
      // Standalone URL: https://...
      const url = match[4];
      const isWhatsApp = url.includes("whatsapp.com") || url.includes("wa.me");
      elements.push(
        <a
          key={`url-${matchIndex}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            isUser
              ? "underline font-bold text-black hover:opacity-80 inline-flex items-center gap-0.5 break-all"
              : isWhatsApp
              ? "text-[#22c55e] hover:text-[#4ade80] font-semibold underline underline-offset-2 inline-flex items-center gap-1 break-all transition-colors cursor-pointer"
              : "text-[#38bdf8] hover:text-[#7dd3fc] font-semibold underline underline-offset-2 inline-flex items-center gap-1 break-all transition-colors cursor-pointer"
          }
        >
          <span>{url}</span>
          <ExternalLink className="w-3 h-3 inline shrink-0 opacity-80" />
        </a>
      );
    }

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements;
}

export function ChatAssistant({ data }: ChatAssistantProps) {
  const liaAvatar = "/assets/lia-avatar.png";

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-lia",
      role: "assistant",
      text: data.atendimento.saudacao || "Olá! Como posso ajudar você hoje?",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const clientCache = useRef<Map<string, string>>(new Map());

  // Sugestões extraídas dinamicamente das perguntas configuradas no cliente
  const sugestoes = [
    ...(data.atendimento.empresa || []),
    ...(data.atendimento.produtos || []),
  ].map((i) => i.pergunta);

  // Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const defaultFallback =
    "Vou passar para o atendimento humano: [Clique aqui para falar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";

  const findSmartResponse = (query: string): string => {
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

    // 1. Busca exata nas perguntas e respostas cadastradas
    const allFaqs = [
      ...(data.atendimento.empresa || []),
      ...(data.atendimento.produtos || []),
    ];

    for (const faq of allFaqs) {
      const qNorm = faq.pergunta.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
      if (q.includes(qNorm) || qNorm.includes(q)) {
        return faq.resposta;
      }
    }

    // 2. Busca prioritária por Tabela de Preços / Catálogo Completo
    const isTabelaQuery =
      q.includes("tabela") ||
      q.includes("preco") ||
      q.includes("precos") ||
      q.includes("valor") ||
      q.includes("valores") ||
      q.includes("catalogo") ||
      q === "produtos" ||
      q === "quais produtos" ||
      q.includes("lista de preco") ||
      q.includes("quanto custa os produtos") ||
      q.includes("linha dona de casa") ||
      q.includes("linha empresas") ||
      q.includes("linha empresa");

    if (isTabelaQuery) {
      return `Tabela de produtos Superlimpo

Linha dona de casa:
• Kit de Produto com (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L) todos os 3 por R$ 38,00
• Água sanitária 5 litros R$ 12,00
• Cloro Ativo 12% 5 litros R$ 45,00
• Desinfetante Perfumado 5 litros R$ 15,00
• Sabão de álcool (Feito com óleo novo) 5 litros R$ 15,00
• Sabão Lava Roupas Azul R$ 35,00
• Amaciante de roupa 5 litros R$ 25,00
• Alvejante sem cloro 5 litros (Tipo Vanish) R$ 30,00
• Lava louças 5 litros R$ 25,00
• Limpa Pedras 5 litros R$ 30,00
• Limpa Porcelanato & Cerâmica 5 litros R$ 30,00

Linha empresas:
• Limpa Chapas 5 litros R$ 30,00
• Brilho alumínio 5 litros R$ 30,00
• Shampoo Automotivo 5 litros R$ 30,00
• Desengraxante Automotivo 5 litros R$ 30,00
• Ativado 5L R$ 30,00

[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)`;
    }

    // 3. Busca específica por produto individual ou kit
    if (q.includes("kit") || q.includes("dona de casa") || (q.includes("3") && q.includes("38"))) {
      return "O Kit de Produto (Água Sanitária 5L, Desinfetante 5L e Sabão de Álcool 5L) sai todos os 3 galões por apenas R$ 38,00!\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("cloro") || q.includes("ativo 12%")) {
      return "Cloro Ativo 12% (5 litros) custa R$ 45,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("agua sanitaria") || q.includes("sanitaria") || q.includes("candida")) {
      return "Água sanitária (5 litros) custa R$ 12,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("desinfetante") || q.includes("perfumado")) {
      return "Desinfetante Perfumado (5 litros) custa R$ 15,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("alcool") || q.includes("oleo novo") || (q.includes("sabao") && q.includes("alcool"))) {
      return "Sabão de álcool - feito com óleo novo (5 litros) custa R$ 15,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("azul") || q.includes("lava roupas") || q.includes("lava roupa") || q.includes("sabao liquido")) {
      return "Sabão Lava Roupas Azul (5 litros) custa R$ 35,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("amaciante")) {
      return "Amaciante de roupa (5 litros) custa R$ 25,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("alvejante") || q.includes("vanish") || q.includes("sem cloro")) {
      return "Alvejante sem cloro - Tipo Vanish (5 litros) custa R$ 30,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("louca") || q.includes("loucas") || q.includes("detergente")) {
      return "Lava louças (5 litros) custa R$ 25,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("pedra") || q.includes("pedras") || q.includes("limpa pedra")) {
      return "Limpa Pedras (5 litros) custa R$ 30,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("porcelanato") || q.includes("ceramica") || q.includes("piso")) {
      return "Limpa Porcelanato & Cerâmica (5 litros) custa R$ 30,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (
      q.includes("empresa") ||
      q.includes("empresas") ||
      q.includes("chapa") ||
      q.includes("chapas") ||
      q.includes("aluminio") ||
      q.includes("shampoo") ||
      q.includes("automotivo") ||
      q.includes("desengraxante") ||
      q.includes("ativado")
    ) {
      return "Nossos produtos da Linha Empresas (galões de 5 litros) custam R$ 30,00 cada:\n• Limpa Chapas (5L): R$ 30,00\n• Brilho Alumínio (5L): R$ 30,00\n• Shampoo Automotivo (5L): R$ 30,00\n• Desengraxante Automotivo (5L): R$ 30,00\n• Ativado (5L): R$ 30,00\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("loja") || q.includes("retirar") || q.includes("fisica") || q.includes("balcao") || q.includes("onde comprar")) {
      return "Não temos loja física! A Superlimpo trabalha exclusivamente com entregas rápidas em toda a região de Ponta Porã e Pedro Juan Caballero.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("horario") || q.includes("sabado") || q.includes("quando entrega") || q.includes("horas") || q.includes("funciona")) {
      return "Nossos horários de entrega são:\n• Segunda a Sexta: entregas até às 16:00 horas.\n• Sábados: entregas às 07:00 horas e às 15:30 horas.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("taxa") || q.includes("frete") || q.includes("custo de entrega") || q.includes("valor da entrega")) {
      return "A maioria das nossas entregas não tem custo! Dependendo da distância e do pedido, existe uma pequena taxa de entrega.\n\n[Clique aqui para consultar sua entrega no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("pix") || q.includes("pagar") || q.includes("pagamento") || q.includes("chave")) {
      return "Nossa chave Pix é o número de telefone celular: 67993174612.\n\n[Clique aqui para confirmar seu pagamento no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("nota fiscal") || q.includes("nf") || q.includes("recibo") || q.includes("fiscal")) {
      return "Não temos Nota Fiscal, apenas Recibo.\n\n[Clique aqui para falar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("whatsapp") || q.includes("telefone") || q.includes("contato") || q.includes("falar com atendente") || q.includes("humano")) {
      return "Nosso WhatsApp oficial é (67) 99834-2469.\n\n[Falar no WhatsApp da Superlimpo](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("site") || q.includes("pagina") || q.includes("loja virtual")) {
      return "Acesse nosso site oficial: [Acessar Site Superlimpo](https://superlimpoprodutosdelimpeza.lovable.app/)\n\n[Clique aqui para falar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("instagram") || q.includes("insta") || q.includes("rede social")) {
      return "Siga nosso perfil oficial no Instagram: [Seguir no Instagram](https://www.instagram.com/superlimpoprodutosdelimpeza?exln=YTQxenNhaXB0ejdn)\n\n[Clique aqui para falar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    if (q.includes("onde fica") || q.includes("localizacao") || q.includes("como chegar") || q.includes("maps")) {
      return "Trabalhamos com entregas em Ponta Porã e Pedro Juan Caballero. Veja nossa localização: [Abrir no Google Maps](https://maps.app.goo.gl/WP6PrQUTYoC1ZQ5Y9)\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)";
    }

    return defaultFallback;
  };

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query || isTyping) return;

    const userMsg: ChatMessage = {
      id: "u-" + Date.now(),
      role: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal("");
    setIsTyping(true);

    const norm = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const normKey = norm.replace(/[?!.,;]/g, "");

    // 1. Instant client-side cache check
    if (clientCache.current.has(normKey)) {
      const cachedReply = clientCache.current.get(normKey)!;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: "a-" + Date.now(), role: "assistant", text: cachedReply },
        ]);
        setIsTyping(false);
      }, 180);
      return;
    }

    // 2. Greetings
    const greetings = ["oi", "ola", "bom dia", "boa tarde", "boa noite", "opa", "e ai", "tudo bem", "ola tudo bem"];
    if (greetings.includes(norm)) {
      setTimeout(() => {
        const greetingReply = data.atendimento.saudacao || "Olá! Como posso ajudar você hoje?";
        clientCache.current.set(normKey, greetingReply);
        setMessages((prev) => [
          ...prev,
          {
            id: "a-" + Date.now(),
            role: "assistant",
            text: greetingReply,
          },
        ]);
        setIsTyping(false);
      }, 200);
      return;
    }

    // 3. Verifica correspondência no banco de dados configurado
    const directSmartResponse = findSmartResponse(query);
    const hasMatch = directSmartResponse !== defaultFallback;

    if (hasMatch) {
      setTimeout(() => {
        clientCache.current.set(normKey, directSmartResponse);
        setMessages((prev) => [
          ...prev,
          { id: "a-" + Date.now(), role: "assistant", text: directSmartResponse },
        ]);
        setIsTyping(false);
      }, 260);
      return;
    }

    // 4. Try calling server AI endpoint with knowledge
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: query,
          clientName: data.name,
          clientKnowledge: data.atendimento.conhecimento
            ? `Assistente: LIA.\n${data.atendimento.conhecimento}\n\nPerguntas Frequentes:\n${[
                ...data.atendimento.empresa,
                ...data.atendimento.produtos,
              ]
                .map((i) => `P: ${i.pergunta}\nR: ${i.resposta}`)
                .join("\n")}`
            : "",
          history: messages,
        }),
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        if (json.reply && !json.isFallback) {
          clientCache.current.set(normKey, json.reply);
          setMessages((prev) => [
            ...prev,
            { id: "a-" + Date.now(), role: "assistant", text: json.reply },
          ]);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Abort or network failure -> falls through
    }

    // 5. Final fallback
    setTimeout(() => {
      const responseText = directSmartResponse;
      clientCache.current.set(normKey, responseText);
      setMessages((prev) => [
        ...prev,
        { id: "a-" + Date.now(), role: "assistant", text: responseText },
      ]);
      setIsTyping(false);
    }, 250);
  };

  const handleClear = () => {
    setMessages([
      {
        id: "init-lia-" + Date.now(),
        role: "assistant",
        text:
          data.atendimento.saudacao ||
          "Olá! Eu sou a LIA, atendente virtual inteligente da Superlimpo. Estou aqui para tirar suas dúvidas sobre nossos produtos, preços e entregas. Como posso ajudar você hoje?",
      },
    ]);
  };

  return (
    <section className="cliente-chat" aria-label="Atendimento com LIA">
      {/* 1. LIA Model Card (Conforme o layout exato do anexo) */}
      <div className="bg-white text-[#121212] rounded-2xl p-4 sm:p-5 shadow-lg border border-[#e2e8f0] mb-3 text-left">
        {/* Header: Avatar + Title + Online Badge */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="relative shrink-0">
            <img
              src={liaAvatar}
              alt="LIA - Assistente virtual inteligente"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border border-[#cbd5e1] shadow-sm"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#0f172a] flex items-center gap-1.5 font-sans">
                <span>Olá! Eu sou a LIA</span>
                <span className="text-base">👋</span>
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Online</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-[#64748b] mt-0.5">
              Assistente virtual inteligente
            </p>
          </div>
        </div>

        {/* Descrição oficial solicitada */}
        <p className="text-xs sm:text-sm text-[#334155] leading-relaxed mt-3.5 font-normal">
          Estou aqui para tirar suas dúvidas sobre produtos, valores e funcionamento da Superlimpo. Pode perguntar!
        </p>

        {/* Caixa: Sugestões de perguntas */}
        {sugestoes.length > 0 && (
          <div className="mt-3.5 bg-[#f1f5f9] border border-[#e2e8f0] rounded-xl p-3">
            <p className="text-[11px] font-semibold text-[#64748b] mb-2">
              Sugestões de perguntas
            </p>
            <div className="flex flex-wrap gap-1.5">
              {sugestoes.map((sugestao, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isTyping}
                  onClick={() => handleSend(sugestao)}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-white hover:bg-[#1A56DB] hover:text-white text-[#334155] border border-[#cbd5e1] hover:border-[#1A56DB] transition-all shadow-xs active:scale-95 disabled:opacity-50"
                >
                  {sugestao}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Área de Mensagens da Conversa */}
      <div className="flex items-center justify-between px-1 mb-1.5">
        <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider flex items-center gap-1">
          <MessageCircle className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Conversa com LIA</span>
        </span>
        <button
          type="button"
          onClick={handleClear}
          className="text-xs text-[#94a3b8] hover:text-white inline-flex items-center gap-1 px-2 py-0.5 rounded transition-colors"
          title="Reiniciar conversa"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reiniciar</span>
        </button>
      </div>

      <div
        ref={scrollRef}
        className="cliente-chat-transcript bg-[#0f172a] rounded-xl p-3 border border-[#1e3056] max-h-72 overflow-y-auto space-y-2.5"
        role="log"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`w-full flex ${msg.role === "user" ? "justify-end" : "justify-start gap-2"}`}
          >
            {msg.role === "assistant" && (
              <img
                src={liaAvatar}
                alt="LIA"
                className="w-6 h-6 rounded-full object-cover shrink-0 border border-blue-500/50 mt-0.5 shadow-xs"
              />
            )}
            {msg.role === "user" ? (
              <div className="cliente-chat-question bg-[#1A56DB] text-white font-semibold text-xs sm:text-sm py-2 px-3.5 rounded-2xl rounded-tr-xs max-w-[85%] shadow-md shadow-[#1A56DB]/30">
                <div className="whitespace-pre-wrap">{renderFormattedText(msg.text, true)}</div>
              </div>
            ) : (
              <div className="bg-[#131f37] border border-[#23375e] p-3 rounded-2xl rounded-tl-xs text-[#f8fafc] text-xs sm:text-sm leading-relaxed max-w-[85%] shadow-xs">
                <div className="whitespace-pre-wrap">{renderFormattedText(msg.text, false)}</div>
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#94a3b8] bg-[#131f37] px-3 py-1.5 rounded-xl border border-[#23375e] w-fit">
            <img
              src={liaAvatar}
              alt="LIA"
              className="w-4 h-4 rounded-full object-cover shrink-0"
            />
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
            <span className="italic">LIA está digitando...</span>
          </div>
        )}
      </div>

      {/* 3. Input de Texto */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="relative my-2.5"
      >
        <div className="flex items-center bg-[#131f37] border border-[#23375e] focus-within:border-[#1A56DB] focus-within:ring-1 focus-within:ring-[#1A56DB] rounded-xl p-1.5 transition-all">
          <textarea
            ref={inputRef}
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Pergunte qualquer coisa para a LIA…"
            aria-label="Sua pergunta para a LIA"
            className="w-full bg-transparent border-0 resize-none outline-none text-xs sm:text-sm text-[#f8fafc] placeholder-[#64748b] min-h-[38px] max-h-24 py-1.5 px-2.5"
            rows={1}
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            className="size-8 rounded-lg bg-[#1A56DB] hover:bg-[#1447b8] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-white shrink-0 transition-all shadow-sm ml-1 active:scale-95"
            title="Enviar para LIA"
            aria-label="Enviar mensagem"
          >
            <CornerDownLeft className="size-4" />
          </button>
        </div>
      </form>

      {/* 4. Botão de Contato WhatsApp */}
      <a
        href={`https://wa.me/55${data.contato.telefone}?text=Olá!%20Estava%20conversando%20com%20a%20LIA%20no%20site%20e%20gostaria%20de%20atendimento%20humano.`}
        target="_blank"
        rel="noopener noreferrer"
        className="cliente-chat-contact shadow-lg bg-gradient-to-r from-[#25D366] to-[#16a34a] hover:brightness-110 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm transition-all shadow-emerald-950/30"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Falar pelo WhatsApp</span>
      </a>
    </section>
  );
}
