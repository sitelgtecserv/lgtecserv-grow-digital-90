-- Remover a política antiga que restringe acesso apenas para usuários autenticados
DROP POLICY IF EXISTS "Produtos são visíveis para usuários autenticados" ON products;

-- Criar nova política que permite acesso público (tanto usuários autenticados quanto anônimos)
CREATE POLICY "Produtos são visíveis para todos"
ON products
FOR SELECT
TO public
USING (true);