// Definir tipos para eventos do Meta Pixel
export interface MetaPixelProduct {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
}

// Verificar se o fbq está disponível
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: any) => void;
  }
}

export const metaPixel = {
  // Pageview já é disparado automaticamente no index.html
  
  // ViewContent - Quando usuário visualiza um produto
  viewContent: (product: MetaPixelProduct) => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'ViewContent', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        value: product.price,
        currency: 'MZN',
      });
    }
  },

  // AddToCart - Quando adiciona ao carrinho
  addToCart: (product: MetaPixelProduct) => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'AddToCart', {
        content_ids: [product.id],
        content_name: product.name,
        content_type: 'product',
        value: product.price * (product.quantity || 1),
        currency: 'MZN',
      });
    }
  },

  // InitiateCheckout - Quando inicia o checkout
  initiateCheckout: (products: MetaPixelProduct[], totalValue: number) => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'InitiateCheckout', {
        content_ids: products.map(p => p.id),
        contents: products.map(p => ({
          id: p.id,
          quantity: p.quantity || 1,
        })),
        num_items: products.reduce((sum, p) => sum + (p.quantity || 1), 0),
        value: totalValue,
        currency: 'MZN',
      });
    }
  },

  // Purchase - Quando finaliza a compra (CONVERSÃO PRINCIPAL)
  purchase: (products: MetaPixelProduct[], totalValue: number, orderId: string) => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Purchase', {
        content_ids: products.map(p => p.id),
        contents: products.map(p => ({
          id: p.id,
          quantity: p.quantity || 1,
        })),
        value: totalValue,
        currency: 'MZN',
        order_id: orderId,
      });
    }
  },

  // Search - Quando usuário pesquisa produtos
  search: (searchString: string) => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Search', {
        search_string: searchString,
      });
    }
  },

  // Lead - Para formulários de contato
  lead: () => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Lead');
    }
  },
};
