export interface TeamMemberProject {
  title: string;
  description: string;
  result: string;
}

export interface TeamMemberValue {
  icon: string;
  title: string;
  description: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  image: string;
  impactPhrase: string;
  metaDescription: string;
  bio: string[];
  responsibilities: string[];
  strategicContribution: string;
  impact: string;
  hardSkills: string[];
  softSkills: string[];
  tools: string[];
  values: TeamMemberValue[];
  projects: TeamMemberProject[];
  email: string;
}

export const teamMembers: TeamMember[] = [
  {
    slug: "luismatsenjua",
    name: "Luís Martins",
    role: "Director Geral",
    image: "/lovable-uploads/luis-matsenjua.png",
    impactPhrase: "Liderança estratégica com visão de futuro e compromisso com a excelência operacional.",
    metaDescription: "Luís Martins é o Director Geral da LG TecServ, responsável pela liderança estratégica, gestão de contratos e coordenação de projetos em Moçambique.",
    bio: [
      "Luís Martins é o Director Geral da LG TecServ, responsável pela liderança estratégica, gestão de contratos e coordenação de projetos nas áreas de topografia e serviços técnicos especializados.",
      "Atua diretamente na captação de clientes, negociação de contratos e representação institucional da empresa, garantindo que cada projeto seja executado com os mais altos padrões de qualidade.",
      "Com uma carreira sólida em gestão empresarial, Luís traz uma abordagem orientada a resultados, combinando experiência técnica com visão estratégica para impulsionar o crescimento sustentável da organização."
    ],
    responsibilities: [
      "Liderança estratégica e tomada de decisão empresarial",
      "Gestão e negociação de contratos comerciais",
      "Coordenação de projetos de topografia e serviços técnicos",
      "Captação de novos clientes e desenvolvimento de negócios",
      "Representação institucional da empresa"
    ],
    strategicContribution: "Como Director Geral, Luís é o pilar central da gestão operacional e estratégica, assegurando que a empresa mantém padrões elevados de qualidade e eficiência em todos os projetos.",
    impact: "Sob a sua liderança, a empresa consolidou a sua posição no mercado de serviços técnicos em Moçambique, expandindo a carteira de clientes e fortalecendo parcerias estratégicas.",
    hardSkills: ["Gestão Empresarial", "Topografia", "Gestão de Contratos", "Planeamento Estratégico", "Gestão de Projetos"],
    softSkills: ["Liderança", "Negociação", "Comunicação Executiva", "Tomada de Decisão", "Visão Estratégica"],
    tools: ["AutoCAD", "GPS Topográfico", "Microsoft Office", "Ferramentas de Gestão de Projetos"],
    values: [
      { icon: "Shield", title: "Ética", description: "Conduta profissional íntegra e transparente em todas as relações comerciais." },
      { icon: "Target", title: "Compromisso", description: "Dedicação total ao cumprimento de prazos e à satisfação dos clientes." },
      { icon: "Lightbulb", title: "Inovação", description: "Busca constante por soluções inovadoras para desafios técnicos complexos." },
      { icon: "Users", title: "Liderança", description: "Gestão inspiradora que motiva equipas a alcançar resultados excepcionais." },
      { icon: "Award", title: "Foco em Resultados", description: "Orientação para metas concretas e resultados mensuráveis." }
    ],
    projects: [
      { title: "Coordenação de Projetos Topográficos", description: "Liderança na execução de projetos topográficos de grande escala em diversas províncias de Moçambique.", result: "Entrega dentro dos prazos com precisão técnica superior a 99%." },
      { title: "Expansão da Carteira de Clientes", description: "Desenvolvimento de estratégias comerciais para captação de novos clientes corporativos.", result: "Aumento de 40% na carteira de clientes em dois anos." },
      { title: "Parcerias Estratégicas", description: "Estabelecimento de parcerias com empresas de referência no sector de construção e infraestruturas.", result: "Consolidação de 5 parcerias estratégicas de longo prazo." }
    ],
    email: "contato@lgtecserv.com"
  },
  {
    slug: "inaciolanga",
    name: "Inácio Langa",
    role: "CEO & Fundador",
    image: "/lovable-uploads/66f9605c-90e0-4c1d-8691-d378145507c4.png",
    impactPhrase: "Visão empreendedora que transforma ideias em soluções digitais de impacto.",
    metaDescription: "Inácio Langa é o CEO e Fundador da LG TecServ, pioneiro em soluções digitais e marketing em Moçambique, com vasta experiência em gestão empresarial.",
    bio: [
      "Inácio Langa é o fundador da LG TecServ e responsável pela visão estratégica do negócio. Possui vasta experiência em marketing digital e gestão empresarial.",
      "Foi pioneiro na implementação de soluções digitais que impulsionaram o crescimento da organização, sempre com foco em inovação e expansão da marca.",
      "A sua visão empreendedora e capacidade de identificar oportunidades de mercado foram fundamentais para posicionar a LG TecServ como referência em soluções digitais em Moçambique."
    ],
    responsibilities: [
      "Definição da visão e estratégia empresarial",
      "Gestão executiva e tomada de decisão de alto nível",
      "Supervisão de marketing digital e estratégias de crescimento",
      "Desenvolvimento de novos serviços e oportunidades de negócio",
      "Gestão de relações com stakeholders e investidores"
    ],
    strategicContribution: "Como fundador e CEO, Inácio é a força motriz por trás da inovação e crescimento da empresa, definindo a direção estratégica que guia todas as operações.",
    impact: "Transformou uma pequena equipa num ecossistema empresarial completo, oferecendo soluções digitais integradas que atendem centenas de clientes em Moçambique.",
    hardSkills: ["Marketing Digital", "Gestão Empresarial", "Estratégia de Negócios", "Branding", "Análise de Mercado"],
    softSkills: ["Empreendedorismo", "Visão Estratégica", "Liderança Inspiradora", "Resiliência", "Criatividade"],
    tools: ["Google Analytics", "Meta Business Suite", "CRM", "Ferramentas de BI", "Plataformas de Marketing"],
    values: [
      { icon: "Shield", title: "Ética", description: "Negócios construídos sobre transparência e integridade." },
      { icon: "Target", title: "Compromisso", description: "Compromisso inabalável com o sucesso dos clientes e da equipa." },
      { icon: "Lightbulb", title: "Inovação", description: "Pioneirismo digital como motor de transformação empresarial." },
      { icon: "Users", title: "Liderança", description: "Liderança visionária que inspira e capacita equipas." },
      { icon: "Award", title: "Foco em Resultados", description: "Cada ação é orientada para gerar impacto real e mensurável." }
    ],
    projects: [
      { title: "Fundação da LG TecServ", description: "Criação da empresa desde o conceito até à operação plena, estabelecendo processos e cultura organizacional.", result: "Empresa consolidada com mais de 200 clientes satisfeitos." },
      { title: "Transformação Digital de PMEs", description: "Implementação de estratégias digitais para pequenas e médias empresas moçambicanas.", result: "Mais de 500 projetos digitais concluídos com sucesso." },
      { title: "Expansão de Serviços", description: "Diversificação do portfólio de serviços para incluir áreas técnicas como eletricidade e topografia.", result: "Aumento de 60% na receita através de novos serviços." }
    ],
    email: "contato@lgtecserv.com"
  },
  {
    slug: "felexlourindo",
    name: "Félix Florindo",
    role: "Técnico Sénior – Marketing Digital",
    image: "/lovable-uploads/felex-lourindo.jpeg",
    impactPhrase: "Criatividade e técnica ao serviço do marketing digital de excelência.",
    metaDescription: "Félix Florindo é o Técnico Sénior de Marketing Digital da LG TecServ, especialista em produção audiovisual e campanhas digitais em Moçambique.",
    bio: [
      "Félix Florindo é o responsável técnico pela produção e execução das estratégias de marketing digital da LG TecServ.",
      "Especialista em produção audiovisual, criação de vídeos publicitários e campanhas digitais, é considerado o coração do marketing digital da empresa.",
      "A sua capacidade criativa e domínio técnico permitem transformar conceitos em conteúdos visuais impactantes que geram resultados concretos para os clientes."
    ],
    responsibilities: [
      "Produção e execução de campanhas de marketing digital",
      "Criação de conteúdo audiovisual e vídeos publicitários",
      "Gestão de estratégias de conteúdo para redes sociais",
      "Desenvolvimento de materiais de branding e identidade visual",
      "Monitorização e optimização de performance de campanhas"
    ],
    strategicContribution: "Félix é o motor criativo da empresa, traduzindo estratégias de marketing em conteúdos visuais de alto impacto que diferenciam os clientes da LG TecServ no mercado.",
    impact: "As suas campanhas já geraram milhares de interações e conversões para clientes de diversos sectores, estabelecendo novos padrões de qualidade no marketing digital moçambicano.",
    hardSkills: ["Produção Audiovisual", "Marketing Digital", "Edição de Vídeo", "Design Gráfico", "Gestão de Redes Sociais"],
    softSkills: ["Criatividade", "Atenção ao Detalhe", "Proactividade", "Trabalho em Equipa", "Adaptabilidade"],
    tools: ["Adobe Premiere Pro", "Adobe Photoshop", "Canva", "Meta Ads Manager", "Google Ads", "CapCut"],
    values: [
      { icon: "Shield", title: "Ética", description: "Conteúdos autênticos e transparentes que refletem a verdade das marcas." },
      { icon: "Target", title: "Compromisso", description: "Entrega de qualidade superior em cada projeto, sem exceções." },
      { icon: "Lightbulb", title: "Inovação", description: "Exploração constante de novas tendências e formatos criativos." },
      { icon: "Users", title: "Liderança", description: "Referência técnica que eleva o padrão da equipa criativa." },
      { icon: "Award", title: "Foco em Resultados", description: "Conteúdos estrategicamente desenhados para maximizar conversões." }
    ],
    projects: [
      { title: "Campanhas Audiovisuais", description: "Produção de vídeos publicitários para campanhas de marketing digital de múltiplos clientes.", result: "Aumento médio de 150% no engagement dos clientes." },
      { title: "Estratégia de Conteúdo Digital", description: "Desenvolvimento de calendários editoriais e estratégias de conteúdo para redes sociais.", result: "Crescimento orgânico de 200% nos seguidores dos clientes." },
      { title: "Branding Visual Corporativo", description: "Criação de identidades visuais completas para empresas em diversos sectores.", result: "Mais de 50 marcas criadas e posicionadas no mercado." }
    ],
    email: "contato@lgtecserv.com"
  },
  {
    slug: "lemossabado",
    name: "Lemos Sábado",
    role: "Coordenador Geral & Técnico Operacional",
    image: "/lovable-uploads/lemos-sabado.png",
    impactPhrase: "Excelência operacional com compromisso inabalável com qualidade e segurança.",
    metaDescription: "Lemos Sábado é o Coordenador Geral e Técnico Operacional da LG TecServ, garantindo qualidade e eficiência em serviços de eletricidade e topografia.",
    bio: [
      "Lemos Sábado é responsável pela coordenação operacional e execução de serviços técnicos na LG TecServ, incluindo eletricidade e apoio em topografia.",
      "Garante qualidade, segurança e eficiência na execução dos serviços práticos da empresa, sendo uma peça fundamental na cadeia de entrega de valor aos clientes.",
      "A sua experiência prática e conhecimento técnico permitem-lhe supervisionar múltiplos projetos em simultâneo, assegurando que cada um cumpre os mais rigorosos padrões de qualidade."
    ],
    responsibilities: [
      "Coordenação operacional de todos os serviços técnicos",
      "Execução de instalações elétricas residenciais e industriais",
      "Apoio técnico em projetos de topografia",
      "Supervisão de equipas de campo e controlo de qualidade",
      "Gestão de materiais e logística operacional"
    ],
    strategicContribution: "Lemos é a ponte entre a estratégia e a execução, garantindo que cada projeto é entregue com os mais altos padrões de qualidade, segurança e dentro dos prazos estabelecidos.",
    impact: "A sua dedicação à excelência operacional resultou em zero acidentes de trabalho e uma taxa de satisfação de clientes de 98% nos serviços técnicos.",
    hardSkills: ["Instalações Elétricas", "Topografia", "Gestão Operacional", "Segurança no Trabalho", "Manutenção Técnica"],
    softSkills: ["Organização", "Responsabilidade", "Resolução de Problemas", "Pontualidade", "Trabalho em Equipa"],
    tools: ["Multímetro Digital", "GPS Topográfico", "Ferramentas Elétricas Profissionais", "AutoCAD Básico"],
    values: [
      { icon: "Shield", title: "Ética", description: "Trabalho executado com integridade e respeito pelas normas de segurança." },
      { icon: "Target", title: "Compromisso", description: "Cada serviço é realizado com máxima dedicação e profissionalismo." },
      { icon: "Lightbulb", title: "Inovação", description: "Adoção de novas técnicas e tecnologias para melhorar a eficiência." },
      { icon: "Users", title: "Liderança", description: "Coordenação eficaz de equipas de campo em ambiente desafiante." },
      { icon: "Award", title: "Foco em Resultados", description: "Entrega de serviços com qualidade superior e dentro dos prazos." }
    ],
    projects: [
      { title: "Instalações Elétricas de Grande Escala", description: "Coordenação de projetos de instalação elétrica em edifícios comerciais e residenciais.", result: "Mais de 100 instalações concluídas com zero incidentes de segurança." },
      { title: "Apoio a Projetos Topográficos", description: "Suporte operacional em levantamentos topográficos para projetos de construção.", result: "Participação em 30+ projetos topográficos com precisão exemplar." },
      { title: "Optimização de Processos Operacionais", description: "Implementação de melhorias nos processos de execução de serviços técnicos.", result: "Redução de 25% no tempo médio de execução de projetos." }
    ],
    email: "contato@lgtecserv.com"
  },
  {
    slug: "claudiaarmando",
    name: "Cláudia Muale",
    role: "Assistente Administrativa",
    image: "/lovable-uploads/fe69f3f8-90ce-42e0-bb62-d81679a9ba6c.png",
    impactPhrase: "Organização e eficiência administrativa como base para o sucesso empresarial.",
    metaDescription: "Cláudia Muale é a Assistente Administrativa da LG TecServ, responsável pela gestão administrativa, assuntos legais e conformidade documental.",
    bio: [
      "Cláudia Muale é responsável pela gestão administrativa e assuntos legais da LG TecServ. Atua na organização documental, suporte institucional e conformidade legal.",
      "Também possui experiência empresarial própria na área de cofretarismo através da empresa Corsa Boot, o que lhe confere uma perspectiva única sobre gestão de negócios.",
      "A sua capacidade de organização e atenção aos detalhes são essenciais para manter a eficiência administrativa da empresa, garantindo que todos os processos internos funcionam de forma fluida e em conformidade."
    ],
    responsibilities: [
      "Gestão administrativa e organização documental",
      "Suporte em assuntos legais e conformidade",
      "Coordenação de processos internos e comunicação institucional",
      "Gestão de correspondência e arquivo corporativo",
      "Apoio na gestão financeira e controlo orçamental"
    ],
    strategicContribution: "Cláudia é o alicerce administrativo da empresa, assegurando que todas as operações internas funcionam com eficiência e em total conformidade legal.",
    impact: "A sua gestão administrativa eficiente contribuiu para a redução de custos operacionais e para a manutenção de uma organização documental exemplar.",
    hardSkills: ["Gestão Administrativa", "Conformidade Legal", "Gestão Documental", "Contabilidade Básica", "Cofretarismo"],
    softSkills: ["Organização", "Atenção ao Detalhe", "Discrição", "Comunicação", "Multitarefa"],
    tools: ["Microsoft Office", "Ferramentas de Gestão Documental", "Software de Contabilidade", "Plataformas de Comunicação Empresarial"],
    values: [
      { icon: "Shield", title: "Ética", description: "Confidencialidade e integridade no tratamento de informações sensíveis." },
      { icon: "Target", title: "Compromisso", description: "Dedicação total à organização e eficiência dos processos internos." },
      { icon: "Lightbulb", title: "Inovação", description: "Implementação de melhorias contínuas nos processos administrativos." },
      { icon: "Users", title: "Liderança", description: "Gestão proativa que antecipa necessidades e resolve problemas." },
      { icon: "Award", title: "Foco em Resultados", description: "Processos administrativos optimizados para máxima eficiência." }
    ],
    projects: [
      { title: "Reestruturação Administrativa", description: "Implementação de novos processos de gestão documental e administrativa.", result: "Redução de 30% no tempo de processamento administrativo." },
      { title: "Conformidade Legal", description: "Revisão e actualização de toda a documentação legal da empresa.", result: "100% de conformidade com os requisitos legais vigentes." },
      { title: "Empresa Corsa Boot", description: "Gestão empresarial própria na área de cofretarismo, demonstrando capacidade empreendedora.", result: "Experiência empresarial diversificada que enriquece a gestão da LG TecServ." }
    ],
    email: "contato@lgtecserv.com"
  }
];

export function getTeamMemberBySlug(slug: string): TeamMember | undefined {
  return teamMembers.find(member => member.slug === slug);
}
