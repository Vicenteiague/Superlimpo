import { conectacardData, type BiositeData } from "./conectacard";

export const allClients: Record<string, BiositeData> = {
  // 1. Modelo Oficial BiositesAI / Teste Geral
  "biositesai": conectacardData,
  "biosite": conectacardData,
  "teste": conectacardData,
  "start-mkt-local": conectacardData,
  "demo": conectacardData,

  // 2. Modelo Pizzaria & Gastronomia
  "pizzaria": {
    slug: "pizzaria",
    banner: {
      src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
      alt: "Pizzaria Forneria Artesanal"
    },
    avatar: {
      src: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=300&q=80",
      alt: "Logo Forno di Napoli"
    },
    name: "Forno di Napoli Pizzaria",
    bio: "🍕 PIZZAS ARTESANAIS NO FORNO A LENHA COM MASSA DE FERMENTAÇÃO NATURAL! COMBOS FAMÍLIA, REFRIGERANTE GRÁTIS E ENTREGA RÁPIDA E QUENTINHA NA SUA PORTA. FAÇA SEU PEDIDO PELO WHATSAPP! 🛵💨",
    video: {
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      title: "Como preparamos a autêntica pizza napolitana",
      poster: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
    },
    produtos: {
      title: "🍕 COMBOS EM PROMOÇÃO HOJE",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80",
      url: "https://wa.me/5567993174612?text=Olá!%20Quero%20fazer%20o%20pedido%20do%20Combo%20Família!"
    },
    catalogo: {
      title: "Cardápio Destaque",
      items: [
        {
          id: "p1",
          title: "Pizza Margherita Especial",
          price: "R$ 49,90",
          image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=500&q=80",
          description: "Molho de tomate pelado, mussarela de búfala, manjericão fresco e azeite trufado."
        },
        {
          id: "p2",
          title: "Calabresa com Cebola Roxa",
          price: "R$ 44,90",
          image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80",
          description: "Calabresa defumada artesanal, cebola roxa caramelizada e azeitonas pretas chilenas."
        },
        {
          id: "p3",
          title: "Quatro Queijos Nobres",
          price: "R$ 54,90",
          image: "https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=500&q=80",
          description: "Mussarela, provolone defumado, gorgonzola italiano e requeijão cremoso."
        },
        {
          id: "p4",
          title: "Pizza Doce Nutella com Morango",
          price: "R$ 39,90",
          image: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&w=500&q=80",
          description: "Generosa camada de Nutella original com morangos frescos e raspas de chocolate belga."
        }
      ]
    },
    linksTitulo: "Fazer Pedido & Redes",
    links: [
      {
        id: "l-wa",
        title: "Pedir pelo WhatsApp",
        url: "https://wa.me/5567993174612?text=Olá,%20gostaria%20de%20ver%20o%20cardápio%20e%20fazer%20um%20pedido!",
        image: "/assets/whatsapp-refined-CgyhsBcW.jpg"
      },
      {
        id: "l-mapa",
        title: "Nossa Localização",
        url: "https://maps.google.com/?q=Ponta+Pora+MS",
        image: "/assets/location-refined-DWPeLfoT.jpg"
      },
      {
        id: "l-insta",
        title: "Instagram da Pizzaria",
        url: "https://instagram.com",
        image: "/assets/instagram-refined-BsHeVKuq.jpg"
      },
      {
        id: "l-google",
        title: "Avalie no Google (5 Estrelas)",
        url: "https://maps.google.com",
        image: "/assets/review-refined-BTSPoTYD.jpg"
      }
    ],
    atendimento: {
      saudacao: "Olá! Como posso ajudar você hoje?",
      conhecimento: "",
      empresa: [],
      produtos: []
    },
    mapa: {
      title: "Forno di Napoli Pizzaria - Ponta Porã MS",
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14603.22014073386!2d-55.7275062!3d-22.5358055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9462709e9f9c735b%3A0xc344799e030b490f!2sPonta%20Por%C3%A3%2C%20MS!5e0!3m2!1spt-BR!2sbr!4v1711200000000!5m2!1spt-BR!2sbr",
      link: "https://maps.google.com/?q=Ponta+Pora+MS"
    },
    contato: {
      local: "Av. Brasil - Centro, Ponta Porã MS",
      telefone: "67993174612",
      email: "pedidos@fornodinapoli.com.br"
    },
    footer: "Forno di Napoli Pizzaria · Conectacard NFC"
  },

  // 3. Modelo Farmácia & Drogaria
  "farmacia": {
    slug: "farmacia",
    banner: {
      src: "https://images.unsplash.com/photo-1586015555751-63c299908cf0?auto=format&fit=crop&w=1200&q=80",
      alt: "Drogaria Mais Saúde"
    },
    avatar: {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80",
      alt: "Logo Drogaria Mais Saúde"
    },
    name: "Drogaria Mais Saúde",
    bio: "💊 FARMÁCIA COMPLETA COM MEDICAMENTOS, DERMOCOSMÉTICOS, SUPLEMENTOS E PERFUMARIA. PLANTÃO ATÉ AS 23H COM ENTREGA EXPRESSA EM ATÉ 30 MINUTOS NA SUA CASA! ENVIE SUA RECEITA PELO WHATSAPP! 🩺📲",
    produtos: {
      title: "🩺 ENVIE SUA RECEITA MÉDICA",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1000&q=80",
      url: "https://wa.me/5567993174612?text=Olá!%20Gostaria%20de%20enviar%20uma%20receita%20médica%20para%20cotação!"
    },
    catalogo: {
      title: "Ofertas da Semana",
      items: [
        {
          id: "f1",
          title: "Kit Vitamina C + Zinco (60 caps)",
          price: "R$ 29,90",
          image: "https://images.unsplash.com/photo-1550572017-edb20117094b?auto=format&fit=crop&w=500&q=80",
          description: "Auxilia na imunidade diária e ação antioxidante para toda a família."
        },
        {
          id: "f2",
          title: "Protetor Solar FPS 70 Facial",
          price: "R$ 49,90",
          image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80",
          description: "Toque seco anti-oleosidade, alta proteção UVA/UVB resistente à água."
        },
        {
          id: "f3",
          title: "Ômega 3 Puro Concentrado (120 caps)",
          price: "R$ 59,90",
          image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=500&q=80",
          description: "Auxilia na saúde cardiovascular, cerebral e articulações."
        },
        {
          id: "f4",
          title: "Fralda Descartável Mega Pack",
          price: "R$ 64,90",
          image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=500&q=80",
          description: "Até 12 horas de proteção sequinha dia e noite para bebês."
        }
      ]
    },
    linksTitulo: "Atendimento & Farmácia",
    links: [
      {
        id: "f-wa",
        title: "Enviar Receita no WhatsApp",
        url: "https://wa.me/5567993174612?text=Olá!%20Gostaria%20de%20saber%20o%20preço%20de%20um%20medicamento.",
        image: "/assets/whatsapp-refined-CgyhsBcW.jpg"
      },
      {
        id: "f-mapa",
        title: "Nossa Farmácia no Mapa",
        url: "https://maps.google.com/?q=Ponta+Pora+MS",
        image: "/assets/location-refined-DWPeLfoT.jpg"
      },
      {
        id: "f-insta",
        title: "Dicas de Saúde no Instagram",
        url: "https://instagram.com",
        image: "/assets/instagram-refined-BsHeVKuq.jpg"
      },
      {
        id: "f-google",
        title: "Avalie Nosso Atendimento",
        url: "https://maps.google.com",
        image: "/assets/review-refined-BTSPoTYD.jpg"
      }
    ],
    atendimento: {
      saudacao: "Olá! Como posso ajudar você hoje?",
      conhecimento: "",
      empresa: [],
      produtos: []
    },
    mapa: {
      title: "Drogaria Mais Saúde - Ponta Porã MS",
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14603.22014073386!2d-55.7275062!3d-22.5358055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9462709e9f9c735b%3A0xc344799e030b490f!2sPonta%20Por%C3%A3%2C%20MS!5e0!3m2!1spt-BR!2sbr!4v1711200000000!5m2!1spt-BR!2sbr",
      link: "https://maps.google.com/?q=Ponta+Pora+MS"
    },
    contato: {
      local: "Centro, Ponta Porã MS",
      telefone: "67993174612",
      email: "contato@drogariamaissaude.com.br"
    },
    footer: "Drogaria Mais Saúde · Conectacard NFC"
  },

  // 4. Modelo Distribuidora / Loja Superlimpo
  "superlimpo": {
    ...conectacardData,
    slug: "superlimpo",
    name: "Superlimpo Produtos de Limpeza",
    bio: "SOMOS A SUPERLIMPO, VENDEMOS PRODUTOS DE LIMPEZA DIRETO DE FÁBRICA. ENTREGAS EM TODA REGIÃO DE PONTA PORÃ E PEDRO JUAN CABALLERO. KITS ECONÔMICOS, LINHA DONA DE CASA E LINHA EMPRESAS! 🧼✨",
    banner: {
      src: "/assets/produtos-superlimpo-2KK8JWDt.png",
      alt: "Superlimpo - Soluções em produtos de limpeza"
    },
    avatar: {
      src: "/assets/logo-superlimpo.png",
      alt: "Logo Superlimpo"
    },
    video: {
      title: "Superlimpo Produtos de Limpeza",
      poster: "https://img.youtube.com/vi/NA0t9I4CSls/hqdefault.jpg",
      url: "https://youtube.com/shorts/NA0t9I4CSls?is=2Lm50yj3M3qJsIL3"
    },
    produtos: {
      title: "Promoção Kit Dona de Casa (3 Galões por R$ 38,00)",
      image: "/assets/kit-limpeza-superlimpo.webp",
      url: "https://superlimpoprodutosdelimpeza.lovable.app/"
    },
    linksTitulo: "Fale com a Superlimpo",
    links: [
      {
        id: "sl-wa",
        title: "WhatsApp Superlimpo (67) 99834-2469",
        image: "/assets/whatsapp-refined-CgyhsBcW.jpg",
        url: "https://api.whatsapp.com/send?phone=5567998342469"
      },
      {
        id: "sl-site",
        title: "Nosso Site Oficial",
        image: "/assets/superlimpo-site-card.png",
        url: "https://superlimpoprodutosdelimpeza.lovable.app/"
      },
      {
        id: "sl-insta",
        title: "Instagram @superlimpoprodutosdelimpeza",
        image: "/assets/instagram-refined-BsHeVKuq.jpg",
        url: "https://www.instagram.com/superlimpoprodutosdelimpeza?exln=YTQxenNhaXB0ejdn"
      },
      {
        id: "sl-maps",
        title: "Como Chegar (Localização)",
        image: "/assets/location-refined-DWPeLfoT.jpg",
        url: "https://share.google/UCCXWFvQdBxv3jnTb"
      },
      {
        id: "sl-pix",
        title: "Chave Pix: 67993174612",
        image: "/assets/aistudio/file_00000000a420820eb10b57b75091ec46_47854411.png",
        url: "#pix-67993174612"
      }
    ],
    catalogo: {
      title: "Tabela de Produtos Superlimpo",
      items: [
        {
          id: "kit-3",
          title: "Kit Dona de Casa (3 galões de 5L)",
          price: "R$ 38,00",
          image: "/assets/produto-kit-W498VUC5.jpg",
          description: "Kit Econômico: Água Sanitária 5L + Desinfetante 5L + Sabão de Álcool 5L todos os 3 por R$ 38,00."
        },
        {
          id: "agua-sanitaria-5l",
          title: "Água Sanitária 5 Litros",
          price: "R$ 12,00",
          image: "/assets/produto-agua-sanitaria-aqkcM0KF.jpg",
          description: "Água Sanitária 5L com ação bactericida potente para higienização completa."
        },
        {
          id: "cloro-ativo",
          title: "Cloro Ativo 12% 5 Litros",
          price: "R$ 45,00",
          image: "/assets/produto-agua-sanitaria-aqkcM0KF.jpg",
          description: "Cloro concentrado 12% de uso profissional e doméstico para desinfecção profunda."
        },
        {
          id: "desinfetante-5l",
          title: "Desinfetante Perfumado 5 Litros",
          price: "R$ 15,00",
          image: "/assets/produto-desinfetante-DSB2befn.jpg",
          description: "Desinfetante perfumado 5L de alto rendimento com perfume duradouro."
        },
        {
          id: "sabao-alcool-5l",
          title: "Sabão de Álcool (óleo novo) 5 Litros",
          price: "R$ 15,00",
          image: "/assets/produto-sabao-alcool-DQUNx1Kp.jpg",
          description: "Feito exclusivamente com óleo novo, alto poder de limpeza e desengordurante."
        },
        {
          id: "sabao-azul",
          title: "Sabão Lava Roupas Azul 5 Litros",
          price: "R$ 35,00",
          image: "/assets/produto-desincrust-FLyMIkA4.jpg",
          description: "Lava roupas líquido concentrado para roupas brancas e coloridas."
        },
        {
          id: "amaciante-5l",
          title: "Amaciante de Roupa 5 Litros",
          price: "R$ 25,00",
          image: "/assets/produto-desinfetante-DSB2befn.jpg",
          description: "Maciez e perfume prolongado para suas roupas."
        },
        {
          id: "alvejante-sem-cloro",
          title: "Alvejante sem Cloro 5 Litros (Tipo Vanish)",
          price: "R$ 30,00",
          image: "/assets/produto-desincrust-FLyMIkA4.jpg",
          description: "Alvejante com oxigênio ativo para remoção de manchas sem agredir tecidos."
        },
        {
          id: "lava-loucas-5l",
          title: "Lava Louças 5 Litros",
          price: "R$ 25,00",
          image: "/assets/produto-desinfetante-DSB2befn.jpg",
          description: "Detergente concentrado com alto rendimento para louças e utensílios."
        },
        {
          id: "limpa-pedras-5l",
          title: "Limpa Pedras 5 Litros",
          price: "R$ 30,00",
          image: "/assets/produto-desincrust-FLyMIkA4.jpg",
          description: "Desincrustante ácido para calçadas, pedras e pisos rústicos."
        },
        {
          id: "limpa-porcelanato",
          title: "Limpa Porcelanato & Cerâmica 5 Litros",
          price: "R$ 30,00",
          image: "/assets/produto-desincrust-FLyMIkA4.jpg",
          description: "Fórmula balanceada para limpeza de porcelanatos sem tirar o brilho natural."
        },
        {
          id: "linha-empresas",
          title: "Linha Empresas 5 Litros",
          price: "R$ 30,00",
          image: "/assets/produto-desincrust-FLyMIkA4.jpg",
          description: "Opções: Limpa Chapas (R$ 30), Brilho Alumínio (R$ 30), Shampoo Automotivo (R$ 30), Desengraxante Automotivo (R$ 30) e Ativado 5L (R$ 30)."
        }
      ]
    },
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
    contato: {
      local: "Ponta Porã MS e Pedro Juan Caballero",
      telefone: "67998342469",
      email: "superlimpoprodutos@gmail.com"
    },
    mapa: {
      title: "Superlimpo no Google",
      link: "https://share.google/UCCXWFvQdBxv3jnTb",
      embed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117079.1764654575!2d-55.79251846506348!3d-22.53609825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x946269222fb39fa5%3A0xb35a0937a0a55288!2sPonta%20Por%C3%A3%20-%20MS!5e0!3m2!1spt-BR!2sbr!4v1714488392000!5m2!1spt-BR!2sbr"
    },
    footer: "Superlimpo Produtos de Limpeza"
  }
};

export function getClientData(slug?: string | null): BiositeData {
  if (slug && allClients[slug]) {
    return allClients[slug];
  }
  return conectacardData;
}
