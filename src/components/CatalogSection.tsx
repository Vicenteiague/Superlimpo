import type { CatalogoItem } from "../data/conectacard";

interface CatalogSectionProps {
  title: string;
  items: CatalogoItem[];
  onSelectProduct: (product: CatalogoItem) => void;
}

export function CatalogSection({ title, items, onSelectProduct }: CatalogSectionProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="servicos catalogo" aria-label={title}>
      <h2 className="servicos-titulo">{title}</h2>
      <div className="servicos-grid catalogo-grid">
        {items.map((item) => (
          <figure
            key={item.id}
            className="catalogo-card group cursor-pointer"
            onClick={() => onSelectProduct(item)}
            title={`Ver detalhes de ${item.title}`}
          >
            <div className="overflow-hidden rounded-[5px]">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="group-hover:scale-105 transition-transform duration-350"
              />
            </div>
            <figcaption className="flex items-center justify-between">
              <span className="font-medium text-sm">{item.title}</span>
              {item.price && (
                <span className="text-xs text-[#38bdf8] font-bold bg-[#1A56DB]/20 border border-[#1A56DB]/40 px-2 py-0.5 rounded-full">
                  {item.price}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
