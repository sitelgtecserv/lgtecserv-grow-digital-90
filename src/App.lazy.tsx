import { lazy } from 'react';

// Lazy load service pages for better performance
export const ConsultoriaMarketing = lazy(() => import('./pages/services/ConsultoriaMarketing'));
export const CriacaoSites = lazy(() => import('./pages/services/CriacaoSites'));
export const DesignGrafico = lazy(() => import('./pages/services/DesignGrafico'));
export const EletricidadeIndustrial = lazy(() => import('./pages/services/EletricidadeIndustrial'));
export const EletricidadeResidencial = lazy(() => import('./pages/services/EletricidadeResidencial'));
export const InstalacoesEletricas = lazy(() => import('./pages/services/InstalacoesEletricas'));
export const RedesSociais = lazy(() => import('./pages/services/RedesSociais'));
export const TrafegoPago = lazy(() => import('./pages/services/TrafegoPago'));
export const Topografia = lazy(() => import('./pages/services/Topografia'));
export const EnsaiosFotograficos = lazy(() => import('./pages/services/EnsaiosFotograficos'));

// Lazy load other pages
export const About = lazy(() => import('./pages/About'));
export const Documentacao = lazy(() => import('./pages/Documentacao'));
export const Services = lazy(() => import('./pages/Services'));
export const Contact = lazy(() => import('./pages/Contact'));
export const TermosCondicoes = lazy(() => import('./pages/TermosCondicoes'));
export const PoliticaPrivacidade = lazy(() => import('./pages/PoliticaPrivacidade'));
export const FAQ = lazy(() => import('./pages/FAQ'));

// Lazy load shop pages
export const Auth = lazy(() => import('./pages/Auth'));
export const Loja = lazy(() => import('./pages/Loja'));
export const ProductDetail = lazy(() => import('./pages/ProductDetail'));
export const Carrinho = lazy(() => import('./pages/Carrinho'));
export const Checkout = lazy(() => import('./pages/Checkout'));
export const Admin = lazy(() => import('./pages/Admin'));