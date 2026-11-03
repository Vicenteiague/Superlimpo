import { useState } from "react";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import type { BiositeLink } from "../data/conectacard";

interface LinksGridProps {
  title: string;
  links: BiositeLink[];
  onOpenInfo: (title: string, desc: string) => void;
}

export function LinksGrid({ title, links, onOpenInfo }: LinksGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!links || links.length === 0) return null;

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, link: BiositeLink) => {
    if (link.id.includes("pix") || link.url?.includes("pix")) {
      e.preventDefault();
      const pixKey = "67993174612";
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(pixKey);
        }
      } catch {
        // clipboard fallback
      }
      setCopiedId(link.id);
      setTimeout(() => setCopiedId(null), 3000);
      onOpenInfo(
        "Chave Pix: 67993174612",
        "A chave Pix (Celular: 67993174612) foi copiada para a área de transferência! Cole no app do seu banco para transferir com facilidade."
      );
      return;
    }

    if (!link.url) {
      e.preventDefault();
      onOpenInfo(link.title, "Este contato ainda não foi disponibilizado pela empresa.");
    }
  };

  return (
    <div>
      {title && <h2 className="links-titulo">{title}</h2>}
      <section className="links-grid" aria-label="Contatos e redes sociais">
        {links.map((link) => {
          const isPix = link.id.includes("pix") || link.url?.includes("pix");
          const isCopied = copiedId === link.id;

          return (
            <a
              key={link.id}
              href={link.url || "#"}
              target={isPix ? undefined : link.url ? "_blank" : undefined}
              rel={isPix ? undefined : link.url ? "noopener noreferrer" : undefined}
              onClick={(e) => handleLinkClick(e, link)}
              aria-label={link.title}
              className="link-card group relative"
            >
              <div className="link-image relative">
                <img
                  src={link.image}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/assets/website-refined-BhyhUZGx.jpg";
                  }}
                  className="group-hover:scale-105 transition-transform duration-350"
                />
                {isPix && (
                  <span className="absolute top-2 right-2 bg-[#1A56DB]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1 backdrop-blur-sm">
                    {isCopied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                    {isCopied ? "Copiado!" : "Copiar Pix"}
                  </span>
                )}
              </div>
              <div className="link-caption">
                <span className={isCopied ? "text-emerald-400 font-semibold" : ""}>
                  {isCopied ? "Chave Pix Copiada!" : link.title}
                </span>
                {isPix ? (
                  isCopied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                  )
                ) : (
                  <ArrowUpRight
                    aria-hidden="true"
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                )}
              </div>
            </a>
          );
        })}
      </section>
    </div>
  );
}

