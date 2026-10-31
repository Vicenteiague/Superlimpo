import { formatPhone } from "../utils/format";

interface FooterProps {
  footerText: string;
  local: string;
  telefone: string;
  email: string;
}

export function Footer({ footerText, local, telefone, email }: FooterProps) {
  const cleanPhone = telefone.replace(/\D/g, "");

  return (
    <footer className="biosite-footer">
      <div className="footer-linha">
        <span className="footer-mark" />
        <span>{footerText}</span>
        <span className="footer-dot">·</span>
        <span>Todos os direitos reservados</span>
      </div>

      <div className="footer-contato">
        <p>{local}</p>
        {cleanPhone && (
          <a
            href={`https://wa.me/55${cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline transition-colors"
          >
            Contato {formatPhone(telefone)}
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="hover:underline transition-colors"
          >
            {email}
          </a>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-[#1e3056]/80 flex items-center justify-center text-xs">
        <a
          href="https://wa.me/5567993174612"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#94a3b8] hover:text-[#38bdf8] transition-colors flex items-center gap-1.5 py-1 px-3 rounded-full bg-[#111c35]/80 border border-[#1e3056] hover:border-[#38bdf8]/40 shadow-sm"
        >
          <span>Criado por <strong className="text-[#38bdf8] font-semibold">BiositesAi</strong> 67993174612</span>
        </a>
      </div>
    </footer>
  );
}
