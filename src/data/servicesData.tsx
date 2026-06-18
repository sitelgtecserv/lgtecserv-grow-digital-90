import { 
  Globe, 
  Palette, 
  TrendingUp, 
  Share2, 
  MessageSquare,
  Zap,
  MapPin,
  Camera,
  CheckCircle,
  ShieldCheck,
  Cctv
} from "lucide-react";

export const mainServices = [
  {
    slug: "criacao-de-sites",
    title: "Criação de Sites",
    description: "Sites profissionais, responsivos e otimizados para converter visitantes em clientes.",
    icon: <Globe className="w-8 h-8" />,
    image: "/lovable-uploads/criacao-sites-banner.webp",
    features: [
      "Design responsivo para todos os dispositivos",
      "Otimização para motores de busca (SEO)",
      "Integração com redes sociais",
      "Painel administrativo intuitivo",
      "Segurança e backup automático",
      "Suporte técnico contínuo"
    ],
    pricing: "A partir de 15,000 MT",
    deliveryTime: "2-4 semanas"
  },
  {
    slug: "design-grafico",
    title: "Design Gráfico",
    description: "Identidade visual profissional que destaca a sua marca da concorrência.",
    icon: <Palette className="w-8 h-8" />,
    image: "/lovable-uploads/design-grafico-banner.webp",
    features: [
      "Criação de logótipos únicos e memoráveis",
      "Manual de identidade visual completo",
      "Material gráfico para marketing",
      "Design para redes sociais",
      "Cartões de visita e papelaria",
      "Banners e materiais promocionais"
    ],
    pricing: "A partir de 8,000 MT",
    deliveryTime: "1-2 semanas"
  },
  {
    slug: "trafego-pago",
    title: "Tráfego Pago",
    description: "Campanhas estratégicas no Google e Facebook para aumentar suas vendas.",
    icon: <TrendingUp className="w-8 h-8" />,
    image: "/lovable-uploads/consultoria-marketing-banner.webp",
    features: [
      "Google Ads e Facebook Ads",
      "Segmentação precisa do público-alvo",
      "Criação de anúncios persuasivos",
      "Relatórios detalhados de performance",
      "Otimização contínua das campanhas",
      "ROI garantido e mensurável"
    ],
    pricing: "A partir de 5,000 MT/mês",
    deliveryTime: "Início imediato"
  },
  {
    slug: "gestao-de-redes-sociais",
    title: "Gestão de Redes Sociais",
    description: "Presença digital forte e engajamento autêntico com o seu público.",
    icon: <Share2 className="w-8 h-8" />,
    image: "/lovable-uploads/consultoria-marketing-banner.webp",
    features: [
      "Criação de conteúdo estratégico",
      "Gestão completa das redes sociais",
      "Aumento do engajamento orgânico",
      "Análise de métricas e resultados",
      "Resposta a comentários e mensagens",
      "Estratégia de crescimento personalizada"
    ],
    pricing: "A partir de 6,000 MT/mês",
    deliveryTime: "Início imediato"
  },
  {
    slug: "consultoria-de-marketing",
    title: "Consultoria de Marketing",
    description: "Estratégias personalizadas para acelerar o crescimento do seu negócio.",
    icon: <MessageSquare className="w-8 h-8" />,
    image: "/lovable-uploads/consultoria-marketing-banner.webp",
    features: [
      "Análise completa do mercado",
      "Estratégia de marketing personalizada",
      "Plano de ação detalhado",
      "Acompanhamento e mentoria",
      "Otimização de processos",
      "Relatórios de progresso regulares"
    ],
    pricing: "A partir de 10,000 MT",
    deliveryTime: "1 semana"
  },
  {
    slug: "instalacoes-eletricas",
    title: "Instalações Elétricas",
    description: "Soluções elétricas completas para residências e indústrias com segurança garantida.",
    icon: <Zap className="w-8 h-8" />,
    image: "/lovable-uploads/instalacoes-eletricas-banner.webp",
    features: [
      "Instalações elétricas residenciais",
      "Projetos elétricos industriais",
      "Manutenção elétrica preventiva",
      "Adequação às normas técnicas",
      "Certificação e ART profissional",
      "Suporte técnico especializado"
    ],
    pricing: "A partir de 12,000 MT",
    deliveryTime: "1-3 semanas"
  },
  {
    slug: "topografia",
    title: "Topografia",
    description: "Levantamentos topográficos e demarcação de terrenos com precisão e qualidade.",
    icon: <MapPin className="w-8 h-8" />,
    image: "/lovable-uploads/topografia-banner.webp",
    features: [
      "Levantamentos topográficos precisos",
      "Demarcação e divisão de terrenos",
      "Plantas topográficas detalhadas",
      "Certificação profissional ART",
      "Equipamentos de última geração",
      "Relatórios técnicos completos"
    ],
    pricing: "A partir de 8,000 MT",
    deliveryTime: "1-2 semanas"
  },
  {
    slug: "ensaios-fotograficos",
    title: "Ensaios Fotográficos",
    description: "Fotografia profissional sem sair de casa com flexibilidade total.",
    icon: <Camera className="w-8 h-8" />,
    image: "/lovable-uploads/ensaios-fotograficos-banner.webp",
    features: [
      "Sessões no local da sua escolha",
      "Edição profissional incluída",
      "Flexibilidade total de horário",
      "Entrega rápida das fotos",
      "Sem limitações de vestuário",
      "Qualidade de estúdio garantida"
    ],
    pricing: "A partir de 3,500 MT",
    deliveryTime: "48 horas"
  },
  {
    slug: "construcao-civil",
    title: "Construção Civil",
    description: "Construção de raiz, remodelações e projetos de arquitetura com excelência.",
    icon: <CheckCircle className="w-8 h-8" />,
    image: "/lovable-uploads/construcao-civil-banner.webp",
    features: [
      "Construção de moradias e edifícios",
      "Remodelações completas de espaços",
      "Projetos de arquitetura e engenharia",
      "Gestão e fiscalização de obras",
      "Cumprimento rigoroso de prazos",
      "Materiais de alta qualidade"
    ],
    pricing: "Sob orçamento",
    deliveryTime: "Conforme o projeto"
  },
  {
    slug: "seguranca-eletronica",
    title: "Segurança Eletrónica",
    description: "Sistemas avançados de CCTV, controlo de acessos e alarmes para proteger o seu património.",
    icon: <ShieldCheck className="w-8 h-8" />,
    image: "/lovable-uploads/Baner principal seguranca eletronica.webp",
    features: [
      "Instalação de sistemas de videovigilância (CCTV)",
      "Sistemas de controlo de acessos biométricos",
      "Alarmes contra intrusão e incêndio",
      "Monitorização remota 24/7",
      "Integração de segurança perimetral (cerca elétrica)",
      "Manutenção preventiva e corretiva"
    ],
    pricing: "Sob orçamento",
    deliveryTime: "Conforme o projeto"
  }
];
