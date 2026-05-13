# 08 - Estratégia de Deploy no GitHub Pages

## Visão Geral

O deploy é feito diretamente no **GitHub Pages**, sem necessidade de servidor backend. O repositório serve como hospedagem estática.

---

## Opção A: Deploy via Branch (Recomendado para iniciantes)

### Configuração
1. Criar repositório no GitHub: `acervo-pessoal`
2. Push do código para a branch `main`
3. No GitHub: Settings → Pages → Source: `Deploy from a branch`
4. Selecionar branch `main`, pasta `/ (root)`
5. Salvar

### URL resultante
```
https://[usuario].github.io/acervo-pessoal/
```

### Vantagens
- Simples, sem arquivos extras
- Atualização automática a cada push na main
- Funciona imediatamente

---

## Opção B: Deploy via GitHub Actions (Recomendado para QA)

### Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy Acervo Pessoal

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Validar HTML
        uses: validator/html-validator-action@v1
        with:
          root: ./
          match: '**/*.html'

      - name: Configurar Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Vantagens
- Validação de HTML antes do deploy
- Rollback automático em caso de erro
- Histórico de deploys

---

## Regras de Caminho para GitHub Pages

### Caminhos relativos obrigatórios
```html
<!-- CSS -->
<link rel="stylesheet" href="./css/variaveis.css">
<link rel="stylesheet" href="./css/global.css">

<!-- JS -->
<script src="./js/progresso.js" defer></script>
<script src="./js/modal.js" defer></script>
<script src="./js/exportar.js" defer></script>
<script src="./js/importar.js" defer></script>

<!-- Imagens -->
<img src="./img/capas/clean-code.jpg" alt="Clean Code">

<!-- Links entre páginas -->
<a href="./categorias/programacao.html">Programação</a>
<a href="./acervo/programacao/clean-code.html">Clean Code</a>

<!-- PDFs -->
<a href="./pdfs/programacao/clean-code.pdf#page=42">Continuar</a>
<iframe src="./pdfs/programacao/clean-code.pdf#page=42"></iframe>
```

### Navegação de volta (relativa)
```
De: /acervo/programacao/clean-code.html
Para: /categorias/programacao.html → href="../../categorias/programacao.html"
Para: /index.html → href="../../index.html"
```

---

## Limitações do GitHub Pages

| Aspecto | Limite |
|---|---|
| Tamanho do repositório | Recomendado até 1 GB |
| Tamanho de arquivo individual | Máximo 100 MB |
| Largura de banda | 100 GB/mês |
| Builds por hora | 10 (Actions) |
| Sites por conta | Ilimitado |

### Estratégia para PDFs grandes
- **Até 10 MB:** Commitar no repo
- **10-100 MB:** Testar, pode funcionar mas lento
- **Acima de 100 MB:** Usar link externo (Google Drive, Internet Archive, etc)

---

## Checklist Pré-Deploy

Antes de publicar, verificar:

- [ ] Todos os `href` e `src` são caminhos relativos (começam com `./` ou `../`)
- [ ] Scripts JS carregam com `defer` e caminhos relativos
- [ ] Nenhum link quebrado
- [ ] Imagens com `alt` descritivo
- [ ] PDFs abrem corretamente no navegador
- [ ] Site funciona no Chrome, Firefox e Safari
- [ ] Responsivo no mobile
- [ ] Favicon presente
- [ ] `<title>` em todas as páginas
- [ ] Meta tags básicas (viewport, charset, description)

---

## Atualização do Acervo (Fluxo de Trabalho)

Para adicionar um novo PDF ao acervo:

```bash
# 1. Adicionar o PDF
cp documento.pdf pdfs/programacao/
cp capa.jpg img/capas/

# 2. Criar a página do item (copiar do template)
cp TEMPLATE-item.html acervo/programacao/novo-livro.html

# 3. Editar o HTML com os metadados do novo item

# 4. Atualizar a Home e a página de categoria

# 5. Commit e push
git add .
git commit -m "feat: adiciona [título do livro] ao acervo"
git push origin main

# 6. Aguardar deploy automático (~2 min)
```

---

## Funcionalidade Progresso de Leitura no Deploy

O sistema de progresso usa **JavaScript client-side** e **localStorage**, que funciona normalmente no GitHub Pages sem nenhuma configuração especial.

### Comportamento em diferentes navegadores
- O `localStorage` é isolado por domínio e por protocolo (http vs https)
- No GitHub Pages, o domínio é `https://[usuario].github.io`, então o localStorage funciona normalmente
- Se o usuário acessar via URL customizada, o localStorage será separado

### Sincronização entre dispositivos
Como o `localStorage` é local ao navegador, para sincronizar entre dispositivos:
1. No dispositivo A: clicar em "Exportar progresso" → baixar `acervo-progresso.json`
2. Commitar o JSON no repositório (opcional, para versionamento)
3. No dispositivo B: acessar o site → clicar em "Importar progresso" → selecionar o JSON
