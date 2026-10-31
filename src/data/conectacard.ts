export interface BiositeLink {
  id: string;
  title: string;
  image: string;
  url: string | null;
}

export interface CatalogoItem {
  id: string;
  title: string;
  image: string;
  price?: string;
  description?: string;
}

export interface FaqItem {
  id: string;
  pergunta: string;
  resposta: string;
}

export interface BiositeData {
  slug: string;
  name: string;
  bio: string;
  banner: {
    src: string;
    alt: string;
  };
  avatar: {
    src: string;
    alt: string;
  };
  video?: {
    title: string;
    poster: string;
    url: string;
  };
  produtos: {
    title: string;
    image: string;
    url: string;
  };
  catalogo: {
    title: string;
    items: CatalogoItem[];
  };
  linksTitulo: string;
  links: BiositeLink[];
  servicos?: {
    title: string;
    text: string;
    items: BiositeLink[];
  };
  mapa: {
    title: string;
    link: string;
    embed: string;
  };
  contato: {
    local: string;
    telefone: string;
    email: string;
  };
  footer: string;
  atendimento: {
    saudacao: string;
    conhecimento: string;
    empresa: FaqItem[];
    produtos: FaqItem[];
  };
  seo?: {
    title: string;
    description: string;
  };
}

export const conectacardData: BiositeData = {
  slug: "start-mkt-local",
  name: "Conectacard Cartão NFC",
  bio: "Conectacard – Seu Cartão NFC Infinito. Conecte-se com estilo, tecnologia e praticidade. Com o cartão Conectacard NFC infinito você compartilha seus contatos, localização, redes sociais e muito mais com um simples toque. Cartões NFC personalizados, biolinks para Instagram e WhatsApp, além de plaquinhas com QR Code | NFC. Para destacar sua presença em qualquer lugar. Modernize sua forma de conectar. Peça seu Conectacard cartão NFC infinito agora! 💳",
  banner: {
    src: "/assets/produtos-superlimpo-2KK8JWDt.png",
    alt: "Superlimpo - Soluções em produtos de limpeza"
  },
  avatar: {
    src: "/assets/logo-conectacard-Bp31Uc4f.jpg",
    alt: "Logo ConectaCard"
  },
  video: {
    title: "Superlimpo Produtos de Limpeza",
    poster: "https://img.youtube.com/vi/NA0t9I4CSls/hqdefault.jpg",
    url: "https://youtube.com/shorts/NA0t9I4CSls?is=2Lm50yj3M3qJsIL3"
  },
  produtos: {
    title: "Nossos Produtos",
    image: "/assets/produtos-superlimpo-2KK8JWDt.png",
    url: "https://superlimpoprodutosdelimpeza.lovable.app/"
  },
  catalogo: {
    title: "Produtos",
    items: [
      {
        id: "tabela-de-precos",
        title: "Tabela de Preço",
        image: "/assets/produto-tabela-precos-FOBjNveZ.jpg",
        description: "Confira a tabela completa de produtos de limpeza e preços especiais direto de fábrica."
      },
      {
        id: "desinfetante",
        title: "Desinfetante",
        image: "/assets/produto-desinfetante-DSB2befn.jpg",
        price: "R$ 15,00",
        description: "Desinfetante perfumado 5 litros de alto rendimento com aromas duradouros."
      },
      {
        id: "agua-sanitaria",
        title: "Água Sanitária",
        image: "/assets/produto-agua-sanitaria-aqkcM0KF.jpg",
        price: "R$ 12,00",
        description: "Água Sanitária 5 litros com ação bactericida potente para higienização completa."
      },
      {
        id: "kit-de-produtos",
        title: "Kit de Produtos",
        image: "/assets/produto-kit-W498VUC5.jpg",
        price: "R$ 38,00",
        description: "Kit Econômico: Água Sanitária 5L + Desinfetante 5L + Sabão de Álcool 5L por apenas R$ 38,00."
      },
      {
        id: "desincrust",
        title: "Desincrust",
        image: "/assets/produto-desincrust-FLyMIkA4.jpg",
        price: "R$ 30,00",
        description: "Desincrustante profissional 5 litros para remoção pesada de sujidades e resíduos."
      },
      {
        id: "sabao-de-alcool",
        title: "Sabão de Álcool",
        image: "/assets/produto-sabao-alcool-DQUNx1Kp.jpg",
        price: "R$ 15,00",
        description: "Sabão de Álcool 5 litros formulado com óleo novo, excelente poder de desengorduramento."
      }
    ]
  },
  linksTitulo: "Nossos links",
  links: [
    {
      id: "whatsapp",
      title: "WhatsApp",
      image: "/assets/whatsapp-refined-CgyhsBcW.jpg",
      url: "https://wa.me/5567993174612"
    },
    {
      id: "location",
      title: "Nossa Localização",
      image: "/assets/location-refined-DWPeLfoT.jpg",
      url: "https://maps.app.goo.gl/H2ryHrEQQBdfYkTw5"
    },
    {
      id: "google",
      title: "Nosso Perfil no Google",
      image: "/assets/google-refined-DXn0GVJk.jpg",
      url: "https://g.co/kgs/e9wwCVY"
    },
    {
      id: "review",
      title: "Avalie nossa empresa no Google",
      image: "/assets/review-refined-BTSPoTYD.jpg",
      url: "https://g.page/r/CRV6qIFyKdSEEBM/review"
    },
    {
      id: "instagram",
      title: "Instagram",
      image: "/assets/instagram-refined-BsHeVKuq.jpg",
      url: "https://www.instagram.com/superlimpoprodutosdelimpeza?exln=YTQxenNhaXB0ejdn"
    },
    {
      id: "website",
      title: "Nosso Site Start Mkt Local",
      image: "/assets/website-refined-BhyhUZGx.jpg",
      url: "https://www.startmktlocal.com.br/"
    }
  ],
  mapa: {
    title: "Superlimpo no Google Maps",
    link: "https://share.google/UCCXWFvQdBxv3jnTb",
    embed: "https://www.openstreetmap.org/export/embed.html?bbox=-55.7332969%2C-22.5356989%2C-55.6932969%2C-22.5156989&layer=mapnik&marker=-22.5256989%2C-55.7132969"
  },
  contato: {
    local: "Start Mkt Local Ponta Porã MS",
    telefone: "67993174612",
    email: "startmktlocal@gmail.com"
  },
  footer: "Superlimpo Produtos de Limpeza",
  atendimento: {
    saudacao: "Olá! Eu sou a LIA, atendente virtual inteligente da Superlimpo. Estou aqui para tirar suas dúvidas sobre nossos produtos, preços e entregas. Como posso ajudar você hoje?",
    conhecimento: `Agente Virtual: LIA
Empresa: Superlimpo Produtos de Limpeza — O maior Delivery de Produtos de Limpeza da fronteira.
WhatsApp: 67 99834-2469 (67998342469)
Link do WhatsApp: https://api.whatsapp.com/send?phone=5567998342469
Nosso Site: https://superlimpoprodutosdelimpeza.lovable.app/
Chave Pix: 67993174612
Instagram: https://www.instagram.com/superlimpoprodutosdelimpeza?exln=YTQxenNhaXB0ejdn
Perfil no Google: https://g.co/kgs/NzjgPj
Como Chegar: https://maps.app.goo.gl/WP6PrQUTYoC1ZQ5Y9

REGRAS DE OPERAÇÃO, ENTREGA E PAGAMENTO:
- Loja Física: Não temos loja física. Trabalhamos apenas com entrega em toda a região de Ponta Porã e Pedro Juan Caballero.
- Horários de Entrega (Segunda a Sexta): As entregas são feitas até às 16:00 horas.
- Horários de Entrega (Sábados): Aos sábados somente às 07:00 horas e às 15:30 horas.
- Taxa de Entrega: A maioria das entregas não tem custo. Dependendo da distância e do pedido, existe uma pequena taxa de entrega.
- Documento Fiscal: Não temos Nota Fiscal, apenas Recibo.
- Pagamento via Pix: Chave Pix 67993174612.

TABELA DE PRODUTOS E PREÇOS:
Linha Dona de Casa:
- Kit de Produto (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L): Todos os 3 por R$ 38,00
- Água sanitária (5 litros): R$ 12,00
- Cloro Ativo 12% (5 litros): R$ 45,00
- Desinfetante Perfumado (5 litros): R$ 15,00
- Sabão de álcool - Feito com óleo novo (5 litros): R$ 15,00
- Sabão Lava Roupas Azul: R$ 35,00
- Amaciante de roupa (5 litros): R$ 25,00
- Alvejante sem cloro - Tipo Vanish (5 litros): R$ 30,00
- Lava louças (5 litros): R$ 25,00
- Limpa Pedras (5 litros): R$ 30,00
- Limpa Porcelanato & Cerâmica (5 litros): R$ 30,00

Linha Empresas (5 litros):
- Limpa Chapas (5 litros): R$ 30,00
- Brilho alumínio (5 litros): R$ 30,00
- Shampoo Automotivo (5 litros): R$ 30,00
- Desengraxante Automotivo (5 litros): R$ 30,00
- Ativado (5L): R$ 30,00`,
    empresa: [
      {
        id: "e-loja",
        pergunta: "Tem loja física para retirar?",
        resposta: "Não temos loja física! A Superlimpo trabalha exclusivamente com entregas rápidas em toda a região de Ponta Porã e Pedro Juan Caballero.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "e-horarios",
        pergunta: "Quais os horários de entrega?",
        resposta: "Nossos horários de entrega são:\n• Segunda a Sexta: entregas até às 16:00 horas.\n• Sábados: entregas às 07:00 horas e às 15:30 horas.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "e-taxa",
        pergunta: "Qual o valor da taxa de entrega?",
        resposta: "A maioria das nossas entregas não tem custo! Dependendo da distância e do pedido, existe uma pequena taxa de entrega.\n\n[Clique aqui para consultar sua entrega no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "e-pix",
        pergunta: "Qual a chave Pix da Superlimpo?",
        resposta: "Nossa chave Pix é o número de telefone celular: 67993174612.\n\n[Clique aqui para confirmar seu pagamento no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "e-nf",
        pergunta: "Vocês emitem Nota Fiscal?",
        resposta: "Não emitimos Nota Fiscal, trabalhamos apenas com Recibo.\n\n[Clique aqui para falar no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "e-regioes",
        pergunta: "Quais regiões vocês atendem?",
        resposta: "Entregamos em toda a região de Ponta Porã MS e Pedro Juan Caballero!\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      }
    ],
    produtos: [
      {
        id: "p-tabela",
        pergunta: "Qual a tabela de preços?",
        resposta: `Tabela de produtos Superlimpo

Linha dona de casa:
• Kit de Produto com (Água sanitária 5L, Desinfetante 5L e Sabão de álcool 5L) todos os 3 por R$ 38,00
• Água sanitária 5 litros R$ 12,00
• Cloro Ativo 12% 5 litros R$ 45,00
• Desinfetante Perfumado 5 litros R$ 15,00
• Sabão de álcool (Feito com óleo novo) 5 litros R$ 15,00
• Sabão Lava Roupas Azul R$ 35,00
• Amaciante de roupa 5 litros R$ 25,00
• Alvejante sem cloro 5 litros (Tipo Vanish) R$ 30,00
• Lava louças 5 litros R$ 25,00
• Limpa Pedras 5 litros R$ 30,00
• Limpa Porcelanato & Cerâmica 5 litros R$ 30,00

Linha empresas:
• Limpa Chapas 5 litros R$ 30,00
• Brilho alumínio 5 litros R$ 30,00
• Shampoo Automotivo 5 litros R$ 30,00
• Desengraxante Automotivo 5 litros R$ 30,00
• Ativado 5L R$ 30,00

[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)`
      },
      {
        id: "p-kit",
        pergunta: "Quanto custa o Kit Dona de Casa?",
        resposta: "O Kit de Produto (Água Sanitária 5L, Desinfetante 5L e Sabão de Álcool 5L) sai todos os 3 galões por apenas R$ 38,00!\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-agua",
        pergunta: "Qual o preço da Água Sanitária?",
        resposta: "Água sanitária (5 litros) custa R$ 12,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-cloro",
        pergunta: "Qual o preço do Cloro Ativo 12%?",
        resposta: "Cloro Ativo 12% (5 litros) custa R$ 45,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-desinfetante",
        pergunta: "Quanto custa o Desinfetante Perfumado?",
        resposta: "Desinfetante Perfumado (5 litros) custa R$ 15,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-sabao-alcool",
        pergunta: "Qual o valor do Sabão de Álcool?",
        resposta: "Sabão de álcool - feito com óleo novo (5 litros) custa R$ 15,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-sabao-azul",
        pergunta: "Quanto custa o Sabão Lava Roupas Azul?",
        resposta: "Sabão Lava Roupas Azul (5 litros) custa R$ 35,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-amaciante",
        pergunta: "Quanto custa o Amaciante de Roupa?",
        resposta: "Amaciante de roupa (5 litros) custa R$ 25,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-alvejante",
        pergunta: "Quanto custa o Alvejante sem Cloro?",
        resposta: "Alvejante sem cloro - Tipo Vanish (5 litros) custa R$ 30,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-lava-loucas",
        pergunta: "Quanto custa o Lava Louças?",
        resposta: "Lava louças (5 litros) custa R$ 25,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-limpa-pedras",
        pergunta: "Quanto custa o Limpa Pedras?",
        resposta: "Limpa Pedras (5 litros) custa R$ 30,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-porcelanato",
        pergunta: "Quanto custa o Limpa Porcelanato & Cerâmica?",
        resposta: "Limpa Porcelanato & Cerâmica (5 litros) custa R$ 30,00.\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      },
      {
        id: "p-empresas",
        pergunta: "Quais os produtos da Linha Empresas?",
        resposta: "Nossos produtos da Linha Empresas (galões de 5 litros) custam R$ 30,00 cada:\n• Limpa Chapas (5L): R$ 30,00\n• Brilho Alumínio (5L): R$ 30,00\n• Shampoo Automotivo (5L): R$ 30,00\n• Desengraxante Automotivo (5L): R$ 30,00\n• Ativado (5L): R$ 30,00\n\n[Clique aqui para fazer seu pedido no WhatsApp](https://api.whatsapp.com/send?phone=5567998342469)"
      }
    ]
  },
  seo: {
    title: "Conectacard Cartão NFC | Cartão de visitas inteligente",
    description: "Cartão NFC infinito Conectacard: compartilhe contatos, localização e redes sociais com um toque. Biolinks e plaquinhas QR Code | NFC."
  }
};
