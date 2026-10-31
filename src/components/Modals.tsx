import { useState } from "react";
import { X, MessageCircle, ExternalLink, QrCode } from "lucide-react";
import type { CatalogoItem } from "../data/conectacard";

// 1. Video Modal
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl: string;
}

export function VideoModal({ isOpen, onClose, title, videoUrl }: VideoModalProps) {
  if (!isOpen) return null;

  // Extract YouTube ID
  let embedUrl = videoUrl;
  try {
    const url = new URL(videoUrl);
    const host = url.hostname.replace(/^www\./, "");
    let id: string | null = null;
    if (host === "youtu.be") {
      id = url.pathname.slice(1);
    } else if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      id = url.searchParams.get("v") || url.pathname.match(/^\/(?:shorts|embed)\/([^/]+)/)?.[1] || null;
    }
    if (id) {
      embedUrl = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    }
  } catch {
    // Keep as is
  }

  return (
    <div
      className="media-dialog-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="media-dialog-content relative max-w-[420px] aspect-[9/16] max-h-[85vh] bg-black p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="media-close"
          aria-label="Fechar vídeo"
        >
          <X className="w-5 h-5" />
        </button>

        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0 rounded-xl"
        />
      </div>
    </div>
  );
}

// 2. Info / Alert Modal
interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  isService?: boolean;
}

export function InfoModal({ isOpen, onClose, title, description, isService }: InfoModalProps) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const isPix = title.toLowerCase().includes("pix") || description.includes("67993174612");

  const handleCopyPix = () => {
    navigator.clipboard.writeText("67993174612").catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="media-dialog-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="media-dialog-content max-w-md p-6 bg-[#131f37] border border-[#23375e] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#94a3b8] hover:text-white"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold mb-3 text-[#f8fafc] font-serif">{title}</h3>
        <p className="text-sm text-[#94a3b8] leading-relaxed mb-4 whitespace-pre-line">{description}</p>

        {isPix && (
          <div className="mb-5 p-3 rounded-xl bg-[#0d1627] border border-[#1e3056] flex items-center justify-between gap-3 text-left">
            <div>
              <span className="block text-[11px] uppercase tracking-wider text-[#93c5fd] font-semibold">Chave Pix Celular</span>
              <span className="text-lg font-mono font-bold text-white tracking-wide">67993174612</span>
            </div>
            <button
              type="button"
              onClick={handleCopyPix}
              className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-[#1A56DB] text-white hover:bg-blue-600"
              }`}
            >
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          {isPix && (
            <a
              href={`https://api.whatsapp.com/send?phone=5567998342469&text=${encodeURIComponent(
                "Olá Superlimpo! Segue o comprovante do pagamento via Pix referente ao meu pedido."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-md bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-sm hover:brightness-110 shadow-md inline-flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar Comprovante no WhatsApp</span>
            </a>
          )}

          {isService && (
            <a
              href={`https://wa.me/5567993174612?text=${encodeURIComponent(
                `Olá! Gostaria de saber mais informações sobre o serviço de ${title}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-md bg-gradient-to-r from-[#1A56DB] to-[#2563eb] text-white font-semibold text-sm hover:brightness-110 shadow-md shadow-[#1A56DB]/30 inline-flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar no WhatsApp sobre este serviço</span>
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-md bg-[#162442] hover:bg-[#1d3158] border border-[#23375e] text-[#f8fafc] text-sm font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

// 3. Product Preview Modal
interface ProductModalProps {
  product: CatalogoItem | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  const waOrderText = `Olá, vim pelo cartão da Superlimpo e gostaria de pedir o produto: ${product.title}!`;

  return (
    <div
      className="media-dialog-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="media-dialog-content max-w-sm p-5 bg-[#131f37] border border-[#23375e]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-black/60 text-[#94a3b8] hover:text-white"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="aspect-square w-full rounded-lg overflow-hidden mb-4 bg-black/40 border border-[#23375e]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-lg font-bold text-[#f8fafc]">{product.title}</h3>
          {product.price && (
            <span className="text-sm font-extrabold text-[#38bdf8] bg-[#1A56DB]/20 border border-[#1A56DB]/40 px-2.5 py-0.5 rounded-full">
              {product.price}
            </span>
          )}
        </div>

        {product.description && (
          <p className="text-xs text-[#94a3b8] leading-relaxed mb-5">
            {product.description}
          </p>
        )}

        <div className="flex flex-col gap-2">
          <a
            href={`https://wa.me/5567998342469?text=${encodeURIComponent(waOrderText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-md bg-gradient-to-r from-[#25D366] to-[#16a34a] hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/30"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Fazer Pedido no WhatsApp</span>
          </a>

          <a
            href="https://superlimpoprodutosdelimpeza.lovable.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-4 rounded-md bg-[#162442] hover:bg-[#1d3158] border border-[#23375e] text-[#93c5fd] font-medium text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Ver Loja Superlimpo Completa</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// 4. QR Code Modal
interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function QrModal({ isOpen, onClose, title }: QrModalProps) {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://conectacard.lovable.app";
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    currentUrl
  )}`;

  return (
    <div
      className="media-dialog-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="media-dialog-content max-w-xs p-6 bg-[#131f37] border border-[#23375e] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#94a3b8] hover:text-white"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2 text-[#38bdf8]">
          <QrCode className="w-5 h-5" />
          <h3 className="text-base font-bold text-[#f8fafc]">QR Code Conectacard</h3>
        </div>

        <p className="text-xs text-[#94a3b8] mb-4">
          Aponte a câmera do celular para abrir este cartão digital instantaneamente:
        </p>

        <div className="bg-white p-3 rounded-xl inline-block shadow-lg mx-auto mb-4">
          <img
            src={qrApiUrl}
            alt={`QR Code para ${title}`}
            className="w-48 h-48 block mx-auto"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(currentUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="w-full py-2 px-3 rounded-md bg-[#1A56DB] hover:bg-[#1447b8] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#1A56DB]/30"
          >
            <span>{copied ? "Link Copiado!" : "Copiar Link para Enviar"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 px-4 rounded-md bg-[#162442] hover:bg-[#1d3158] border border-[#23375e] text-[#f8fafc] text-xs font-semibold transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
