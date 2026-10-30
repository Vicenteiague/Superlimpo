import { useState } from "react";
import { Header } from "./components/Header";
import { VideoCard } from "./components/VideoCard";
import { FeaturedProduct } from "./components/FeaturedProduct";
import { CatalogSection } from "./components/CatalogSection";
import { LinksGrid } from "./components/LinksGrid";
import { ServicesSection } from "./components/ServicesSection";
import { ChatAssistant } from "./components/ChatAssistant";
import { MapSection } from "./components/MapSection";
import { Footer } from "./components/Footer";
import { VideoModal, InfoModal, ProductModal, QrModal } from "./components/Modals";
import { conectacardData, type CatalogoItem } from "./data/conectacard";
import { getClientData, allClients } from "./data/clients";

export default function App() {
  const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const initialClient = urlParams?.get("c") || urlParams?.get("cliente") || "superlimpo";
  const [currentSlug, setCurrentSlug] = useState(initialClient);

  const data = getClientData(currentSlug);

  // Modal states
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [infoModal, setInfoModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    isService?: boolean;
  }>({
    isOpen: false,
    title: "",
    description: "",
  });
  const [selectedProduct, setSelectedProduct] = useState<CatalogoItem | null>(null);

  const handleOpenInfo = (title: string, description: string, isService = false) => {
    setInfoModal({
      isOpen: true,
      title,
      description,
      isService,
    });
  };

  return (
    <main className="biosite-shell min-h-screen">
      {/* 1. Header with banner, avatar, action buttons, and bio */}
      <Header
        banner={data.banner}
        avatar={data.avatar}
        name={data.name}
        bio={data.bio}
        onOpenQr={() => setIsQrOpen(true)}
      />

      <div className="biosite-body pb-12">
        {/* 2. Video Card */}
        {data.video && (
          <VideoCard
            title={data.video.title}
            poster={data.video.poster}
            name={data.name}
            onPlay={() => setIsVideoOpen(true)}
          />
        )}

        {/* 3. Featured Product (Superlimpo store banner) */}
        {data.produtos && (
          <FeaturedProduct
            title={data.produtos.title}
            image={data.produtos.image}
            url={data.produtos.url}
          />
        )}

        {/* 4. Products Catalog (Superlimpo 6-grid) */}
        {data.catalogo && (
          <CatalogSection
            title={data.catalogo.title}
            items={data.catalogo.items}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
          />
        )}

        {/* 5. Main Bio Links Grid */}
        <LinksGrid
          title={data.linksTitulo}
          links={data.links}
          onOpenInfo={handleOpenInfo}
        />

        {/* 6. Agency Services Section */}
        {data.servicos && (
          <ServicesSection
            title={data.servicos.title}
            text={data.servicos.text}
            items={data.servicos.items}
            onOpenInfo={handleOpenInfo}
          />
        )}

        {/* 7. Virtual Attendant / Chat Assistant */}
        <ChatAssistant data={data} />

        {/* 8. Google Maps Section */}
        {data.mapa && (
          <MapSection
            embedUrl={data.mapa.embed}
            linkUrl={data.mapa.link}
            title={data.mapa.title}
          />
        )}

        {/* 9. Footer */}
        <Footer
          footerText={data.footer}
          local={data.contato.local}
          telefone={data.contato.telefone}
          email={data.contato.email}
        />

        {/* Multi-Client quick switcher for demonstration */}
        <div className="mt-6 pt-4 border-t border-[#1e3056] flex flex-wrap items-center justify-center gap-2 text-xs text-[#94a3b8]">
          <span>Demonstração de Clientes:</span>
          {Object.keys(allClients).map((slug) => (
            <button
              key={slug}
              type="button"
              onClick={() => {
                setCurrentSlug(slug);
                try {
                  window.history.pushState({}, "", `?c=${slug}`);
                } catch {
                  // Sandboxed iframe safe
                }
              }}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                currentSlug === slug
                  ? "bg-[#1A56DB] text-white font-bold shadow-md shadow-[#1A56DB]/30"
                  : "bg-[#131f37] text-[#94a3b8] hover:text-white border border-[#23375e]"
              }`}
            >
              {allClients[slug].name}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Modals */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        title={data.video?.title || ""}
        videoUrl={data.video?.url || ""}
      />

      <InfoModal
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal((prev) => ({ ...prev, isOpen: false }))}
        title={infoModal.title}
        description={infoModal.description}
        isService={infoModal.isService}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <QrModal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        title={data.name}
      />
    </main>
  );
}
