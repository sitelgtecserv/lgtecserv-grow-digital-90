
## 🔧 Plano de Correção do Erro do Meta Pixel

### **Problema Identificado**
O Vite está recusando compilar porque a tag `<noscript><img>` está dentro do `<head>`, violando a especificação HTML5.

### **Solução**
Mover a tag `<noscript>` do Meta Pixel para dentro do `<body>`, logo após a tag de abertura `<body>` na linha 68.

### **Mudança no Arquivo index.html**

**1. Remover do `<head>` (linhas 49-51):**
```html
<!-- REMOVER ESTAS LINHAS DO HEAD -->
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1182136163753052&ev=PageView&noscript=1"
/></noscript>
```

**2. Adicionar no `<body>` (logo após linha 68):**
```html
<body>
  <!-- Meta Pixel Code - noscript -->
  <noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1182136163753052&ev=PageView&noscript=1"
  /></noscript>
  <!-- End Meta Pixel Code - noscript -->
  
  <div id="root"></div>
  <!-- resto do conteúdo -->
```

### **Estrutura Final do Meta Pixel**
- ✅ **Script principal** permanece no `<head>` (linhas 36-48) - isso é correto
- ✅ **Tag noscript** vai para o `<body>` (logo após abertura) - isso resolve o erro
- ✅ **Funcionalidade mantida** - o tracking continuará funcionando perfeitamente

### **Por que isso funciona?**
1. O script do Meta Pixel no `<head>` carrega o pixel normalmente
2. A tag `<noscript>` no `<body>` serve como fallback para usuários sem JavaScript
3. Ambas as posições são válidas segundo a documentação oficial do Meta
4. O build do Vite será bem-sucedido pois seguirá a especificação HTML5

### **Benefícios da Correção**
✅ Build será compilado sem erros  
✅ Meta Pixel continuará funcionando 100%  
✅ Código estará em conformidade com HTML5  
✅ Sem impacto no tracking de eventos já implementado
