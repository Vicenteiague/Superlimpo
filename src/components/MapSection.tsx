import { MapPin, ExternalLink } from "lucide-react";

interface MapSectionProps {
  embedUrl: string;
  linkUrl: string;
  title: string;
}

export function MapSection({ embedUrl, linkUrl, title }: MapSectionProps) {
  // Reliable interactive embed for Ponta Porã MS (Start Mkt Local: -22.5256989, -55.7132969)
  const defaultEmbed =
    "https://www.openstreetmap.org/export/embed.html?bbox=-55.7332969%2C-22.5356989%2C-55.6932969%2C-22.5156989&layer=mapnik&marker=-22.5256989%2C-55.7132969";
  const finalEmbed = embedUrl || defaultEmbed;

  // Universal Google Maps search link (opens Google Maps App on mobile and Google Maps Web on desktop)
  const finalLink =
    linkUrl ||
    "https://www.google.com/maps/search/?api=1&query=Start+Mkt+Local+-+Rua+Luiz+Pinto+Magalh%C3%A3es,+154+-+Santa+Isabel,+Ponta+Por%C3%A3+-+MS";

  return (
    <section className="mapa" aria-label="Nossa localização no mapa">
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#23375e] shadow-lg bg-[#131f37]">
        <iframe
          src={finalEmbed}
          title={title || "Start Mkt Local no Mapa"}
          loading="lazy"
          allowFullScreen
          className="w-full h-64 sm:h-72 border-0 block"
        />
        <a
          href={finalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-2.5 right-2.5 bg-[#0b1120]/90 hover:bg-[#0b1120] text-[#f8fafc] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#23375e] shadow-md flex items-center gap-1 transition-all hover:scale-105"
        >
          <ExternalLink className="w-3 h-3 text-[#38bdf8]" />
          <span>Ver mapa</span>
        </a>
      </div>

      <a
        href={finalLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mapa-botao flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#162442] hover:bg-[#1d3158] border border-[#23375e] hover:border-[#3b82f6] text-[#f8fafc] text-sm font-semibold transition-all shadow-md group mt-3"
      >
        <MapPin className="w-4 h-4 text-[#38bdf8] group-hover:scale-110 transition-transform" aria-hidden="true" />
        <span>Abrir no Google Maps</span>
      </a>
    </section>
  );
}
