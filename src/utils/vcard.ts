export interface VCardContactInfo {
  name?: string;
  org?: string;
  whatsapp?: string;
  whatsappLink?: string;
  website?: string;
  pix?: string;
  instagram?: string;
  googleProfile?: string;
  howToReach?: string;
  address?: string;
}

export function downloadVCard(custom?: VCardContactInfo) {
  const name = custom?.name || "Superlimpo produtos de limpeza";
  const org = custom?.org || "Superlimpo produtos de limpeza";
  const whatsapp = custom?.whatsapp || "67998342469";
  const whatsappLink = custom?.whatsappLink || "https://api.whatsapp.com/send?phone=5567998342469";
  const website = custom?.website || "https://superlimpoprodutosdelimpeza.lovable.app/";
  const pix = custom?.pix || "67993174612";
  const instagram = custom?.instagram || "https://www.instagram.com/superlimpoprodutosdelimpeza?exln=YTQxenNhaXB0ejdn";
  const googleProfile = custom?.googleProfile || "https://g.co/kgs/NzjgPj";
  const howToReach = custom?.howToReach || "https://share.google/UCCXWFvQdBxv3jnTb";
  const address = custom?.address || "Ponta Porã MS e Pedro Juan Caballero";

  const noteContent = [
    `${name}`,
    `Whatsapp: ${whatsapp}`,
    `Link whatsapp: ${whatsappLink}`,
    `Nosso Site: ${website}`,
    `Chave Pix: ${pix}`,
    `Instagram: ${instagram}`,
    `Perfil Google: ${googleProfile}`,
    `Como Chegar: ${howToReach}`
  ].join("\\n");

  const cleanPhone = whatsapp.replace(/\D/g, "");

  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:de limpeza;Superlimpo;produtos;;",
    `FN:${name}`,
    `ORG:${org}`,
    "TITLE:Produtos de Limpeza Domésticos e Profissionais",
    `TEL;TYPE=CELL,VOICE,pref:+55${cleanPhone}`,
    `TEL;TYPE=WORK:+55${cleanPhone}`,
    `URL;TYPE=WORK:${website}`,
    `URL;TYPE=WHATSAPP:${whatsappLink}`,
    `URL;TYPE=INSTAGRAM:${instagram}`,
    `URL;TYPE=GOOGLE:${googleProfile}`,
    `URL;TYPE=MAPS:${howToReach}`,
    `X-SOCIALPROFILE;type=instagram:${instagram}`,
    `ADR;TYPE=WORK:;;${address};MS;;Brasil`,
    `NOTE:${noteContent}`,
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Superlimpo-produtos-de-limpeza.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

