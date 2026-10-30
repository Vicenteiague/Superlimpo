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
    </footer>
  );
}
