import { useState } from "react";
import { QrCode, Share2, UserPlus, Check } from "lucide-react";
import { downloadVCard } from "../utils/vcard";

interface HeaderProps {
  banner: { src: string; alt: string };
  avatar: { src: string; alt: string };
  name: string;
  bio: string;
  onOpenQr: () => void;
}

export function Header({ banner, avatar, name, bio, onOpenQr }: HeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: name,
          text: bio,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="relative">
      <div className="profile-banner">
        <img
          src={banner.src}
          alt={banner.alt}
          fetchPriority="high"
          loading="eager"
        />
        <div className="banner-cut" />
      </div>

      <div className="profile-content">
        <img
          className="profile-avatar"
          src={avatar.src}
          alt={avatar.alt}
          fetchPriority="high"
          loading="eager"
        />
        
        {/* Quick action buttons right under avatar */}
        <div className="flex items-center justify-center gap-2 mt-4 mb-2">
          <button
            type="button"
            onClick={() => downloadVCard()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#131f37] hover:bg-[#1a2b4c] border border-[#23375e] hover:border-[#3b82f6] text-[#f8fafc] transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Salvar cartão na agenda"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Salvar Contato</span>
          </button>

          <button
            onClick={onOpenQr}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#131f37] hover:bg-[#1a2b4c] border border-[#23375e] hover:border-[#3b82f6] text-[#f8fafc] transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Exibir QR Code"
          >
            <QrCode className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>QR Code</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#131f37] hover:bg-[#1a2b4c] border border-[#23375e] hover:border-[#3b82f6] text-[#f8fafc] transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Compartilhar link"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Compartilhar</span>
              </>
            )}
          </button>
        </div>

        <h1>{name}</h1>
        <p className="profile-bio">{bio}</p>
      </div>
    </header>
  );
}
