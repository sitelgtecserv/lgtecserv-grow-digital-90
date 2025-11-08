-- Criar tipo enum para tipo de desconto
CREATE TYPE discount_type AS ENUM ('percentage', 'fixed');

-- Criar tabela de cupons
CREATE TABLE public.coupons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount_type discount_type NOT NULL,
  discount_value NUMERIC NOT NULL CHECK (discount_value > 0),
  min_purchase NUMERIC DEFAULT 0,
  max_uses INTEGER,
  uses_count INTEGER NOT NULL DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Criar índice para busca rápida por código
CREATE INDEX idx_coupons_code ON public.coupons(code);

-- Criar tabela para rastrear uso de cupons por usuário
CREATE TABLE public.coupon_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_id UUID NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id UUID,
  order_id UUID REFERENCES public.orders(id),
  used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar índice para consultas
CREATE INDEX idx_coupon_usage_coupon_id ON public.coupon_usage(coupon_id);
CREATE INDEX idx_coupon_usage_user_id ON public.coupon_usage(user_id);

-- Enable Row Level Security
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies para coupons
CREATE POLICY "Cupons ativos são visíveis para todos"
ON public.coupons
FOR SELECT
USING (is_active = true AND valid_until > now());

CREATE POLICY "Apenas admins podem criar cupons"
ON public.coupons
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Apenas admins podem atualizar cupons"
ON public.coupons
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Apenas admins podem deletar cupons"
ON public.coupons
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies para coupon_usage
CREATE POLICY "Usuários podem ver seus próprios usos de cupons"
ON public.coupon_usage
FOR SELECT
USING (auth.uid() = user_id OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Sistema pode criar registros de uso"
ON public.coupon_usage
FOR INSERT
WITH CHECK (true);

-- Função para validar e aplicar cupom
CREATE OR REPLACE FUNCTION public.validate_coupon(
  p_code TEXT,
  p_cart_total NUMERIC
)
RETURNS TABLE (
  valid BOOLEAN,
  discount_type discount_type,
  discount_value NUMERIC,
  message TEXT
) AS $$
DECLARE
  v_coupon RECORD;
BEGIN
  -- Buscar cupom
  SELECT * INTO v_coupon
  FROM public.coupons
  WHERE code = p_code
    AND is_active = true
    AND valid_from <= now()
    AND valid_until > now();

  -- Verificar se cupom existe
  IF v_coupon IS NULL THEN
    RETURN QUERY SELECT false, NULL::discount_type, NULL::NUMERIC, 'Cupom inválido ou expirado';
    RETURN;
  END IF;

  -- Verificar valor mínimo de compra
  IF v_coupon.min_purchase > 0 AND p_cart_total < v_coupon.min_purchase THEN
    RETURN QUERY SELECT false, NULL::discount_type, NULL::NUMERIC, 
      'Valor mínimo de compra não atingido: ' || v_coupon.min_purchase::TEXT || ' MTn';
    RETURN;
  END IF;

  -- Verificar limite de usos
  IF v_coupon.max_uses IS NOT NULL AND v_coupon.uses_count >= v_coupon.max_uses THEN
    RETURN QUERY SELECT false, NULL::discount_type, NULL::NUMERIC, 'Cupom já atingiu o limite de usos';
    RETURN;
  END IF;

  -- Cupom válido
  RETURN QUERY SELECT true, v_coupon.discount_type, v_coupon.discount_value, 'Cupom aplicado com sucesso!';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;