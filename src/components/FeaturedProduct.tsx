import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface FeaturedProductProps {
  title: string;
  image: string;
  url: string;
}

export function FeaturedProduct({ title, image, url }: FeaturedProductProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
      className="link-card produtos-card group block"
    >
      <div className="produtos-imagem">
        <img
          src={imgSrc}
          alt={title}
          loading="lazy"
          onError={() => setImgSrc("/assets/produtos-superlimpo-2KK8JWDt.png")}
          className="group-hover:scale-105 transition-transform duration-350"
        />
      </div>
      <div className="link-caption">
        <span className="font-medium">{title}</span>
        <ArrowUpRight aria-hidden="true" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </a>
  );
}
