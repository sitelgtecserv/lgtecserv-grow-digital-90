import SEOHead from "@/components/seo/SEOHead";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const jobPostingSchema = {
  "@context": "https://schema.org/",
  "@type": "JobPosting",
  "title": "Afiliado de Marketing Digital",
  "description": "Junte-se à LG TecServ como Afiliado de Marketing Digital. Promova serviços tecnológicos como criação de sites e gestão de redes sociais, e ganhe comissões entre 15% a 30% por venda. Trabalho 100% remoto com horários flexíveis.",
  "identifier": {
    "@type": "PropertyValue",
    "name": "LG TecServ",
    "value": "AFIL-MKT-01"
  },
  "datePosted": new Date().toISOString().split('T')[0],
  "validThrough": new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
  "employmentType": "OTHER",
  "hiringOrganization": {
    "@type": "Organization",
    "name": "LG TecServ",
    "sameAs": "https://www.lgtecserv.com",
    "logo": "https://www.lgtecserv.com/lovable-uploads/cf635400-84f4-488e-9657-e75e01a40cb9.webp"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Maputo",
      "addressRegion": "Maputo",
      "addressCountry": "MZ"
    }
  },
  "jobLocationType": "TELECOMMUTE",
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "MZN",
    "value": {
      "@type": "QuantitativeValue",
      "minValue": 0,
      "maxValue": 50000,
      "unitText": "MONTH"
    }
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "O que faz um Afiliado de Marketing Digital na LG TecServ?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "O afiliado indica clientes para os nossos serviços de tecnologia, como criação de websites, tráfego pago ou instalações elétricas, e recebe uma comissão generosa por cada negócio fechado."
    }
  }, {
    "@type": "Question",
    "name": "Qual é a percentagem de comissão?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "As comissões variam entre 15% e 30% sobre o valor total do serviço contratado pelo cliente indicado."
    }
  }, {
    "@type": "Question",
    "name": "Preciso morar em Maputo, Moçambique?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Não necessariamente. Sendo um trabalho remoto de marketing, pode divulgar os nossos serviços a partir de qualquer província de Moçambique ou de qualquer parte do mundo."
    }
  }]
};

const VagasDeEmprego = () => {
  return (
    <>
      <SEOHead
        title="Vagas de Emprego em Moçambique | LG TecServ - Afiliados"
        description="Estamos a contratar Afiliados de Marketing Digital em Moçambique. Trabalho remoto, horário flexível e comissões entre 15% a 30%. Envie a sua candidatura online!"
        keywords="vagas de emprego moçambique, trabalho remoto, afiliado de marketing digital, trabalhar online maputo, vagas lg tecserv, recrutamento"
        image="https://www.lgtecserv.com/lovable-uploads/banner-vagas.webp"
        url="https://www.lgtecserv.com/vagas-de-emprego"
        type="website"
        structuredData={[jobPostingSchema, faqSchema]}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 bg-gray-50 pb-16">
          {/* Hero Banner Section */}
          <section className="w-full bg-white pb-8">
            <div className="w-full">
              {/* O H1 oculto visualmente mas legível para o Google (SEO) */}
              <h1 className="sr-only">Estamos a Contratar - Afiliados de Marketing Digital em Moçambique</h1>
              <img 
                src="/lovable-uploads/banner-vagas.webp" 
                alt="Banner de Recrutamento LG TecServ - Estamos a Contratar Afiliados de Marketing Digital com Comissões de 15% a 30%" 
                className="w-full max-w-6xl mx-auto h-auto object-cover rounded-b-3xl shadow-lg"
              />
            </div>
          </section>

          {/* Details Section for SEO */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Sobre a Vaga</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Como Afiliado de Marketing Digital da LG TecServ, será responsável por promover os nossos serviços tecnológicos, desde a criação de sites até instalações elétricas, ajudando empresas e particulares a encontrar as soluções certas.
                  </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Vantagens</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Oferecemos total flexibilidade de horário, trabalho remoto, e as melhores comissões do mercado (15% a 30% por cada negócio fechado). Terá todo o suporte necessário e materiais de divulgação profissionais para o seu sucesso.
                  </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Requisitos</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Procuramos pessoas proativas, com forte poder de comunicação e conhecimentos básicos de redes sociais e vendas. Não exigimos formação específica, mas sim vontade de aprender e ambição para crescer connosco.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-gray-50 border-t border-gray-100">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h3>
                <p className="text-gray-600 text-lg">Tudo o que precisa saber sobre a vaga de Afiliado de Marketing Digital na LG TecServ Moçambique.</p>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">O que faz um Afiliado de Marketing Digital na LG TecServ?</h4>
                  <p className="text-gray-600">O afiliado indica clientes para os nossos serviços de tecnologia, como criação de websites profissionais, tráfego pago ou instalações elétricas, e recebe uma comissão generosa por cada negócio fechado connosco.</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Qual é a percentagem de comissão?</h4>
                  <p className="text-gray-600">As comissões variam entre 15% e 30% sobre o valor total do serviço contratado pelo cliente indicado. Quanto mais clientes fechar, maior será o seu rendimento.</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Preciso morar em Maputo, Moçambique?</h4>
                  <p className="text-gray-600">Não necessariamente. Sendo um trabalho 100% remoto de marketing e angariação, pode divulgar os nossos serviços a partir de qualquer província de Moçambique ou de qualquer parte do mundo utilizando a internet.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Form Section */}
          <section className="container mx-auto px-4 py-8 relative z-10">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 max-w-4xl mx-auto border border-gray-100">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Candidatar-se à Vaga</h3>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  A seleção será realizada através do nosso formulário de avaliação. Preencha cuidadosamente os seus dados para que a nossa equipa de recrutamento possa analisar o seu perfil.
                </p>
              </div>
              
              <div className="w-full bg-gray-50 rounded-xl overflow-hidden flex justify-center border border-gray-200 shadow-inner" style={{ minHeight: '800px' }}>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSf78eC9DDUWqJxTPfoXDKdgnq45JibyOicgqlCjwrEZp-dPEw/viewform?embedded=true"
                  width="100%"
                  height="100%"
                  className="w-full min-h-[800px] border-0"
                  title="Formulário de Candidatura a Afiliado de Marketing Digital - LG TecServ"
                >
                  A carregar formulário...
                </iframe>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default VagasDeEmprego;
