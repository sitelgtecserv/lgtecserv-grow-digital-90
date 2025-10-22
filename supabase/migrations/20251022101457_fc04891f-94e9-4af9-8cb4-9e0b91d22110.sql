-- Corrigir categoria 'Leptop' para 'Laptop'
UPDATE products 
SET category = 'Laptop' 
WHERE category = 'Leptop';