# 07 - Roadmap de Implementação (Passo a Passo)

Este documento define a ordem exata de implementação que a equipe deve seguir.

---

## Fase 1: Fundação (Setup)

### Passo 1.1 - Criar estrutura de pastas
- [ ] Criar diretórios: `css/`, `js/`, `categorias/`, `acervo/`, `pdfs/`, `img/capas/`, `img/icones/`
- [ ] Criar subpastas de categoria dentro de `acervo/` e `pdfs/`
- [ ] Adicionar arquivo `.gitkeep` em pastas vazias para que o Git as rastreie

### Passo 1.2 - Criar arquivos CSS base
- [ ] `css/reset.css` - Reset CSS (box-sizing, margin, padding)
- [ ] `css/variaveis.css` - Todas as variáveis do Design System
- [ ] `css/global.css` - Estilos do body, tipografia, links

### Passo 1.3 - Criar arquivos JS base
- [ ] `js/progresso.js` - Funções de leitura/escrita do localStorage
- [ ] `js/modal.js` - Lógica de abertura/fechamento do modal de página
- [ ] `js/exportar.js` - Lógica de exportar progresso para JSON
- [ ] `js/importar.js` - Lógica de importar progresso de JSON
- [ ] `js/adicionar.js` - Lógica do formulário "Adicionar PDF" (itens dinâmicos)

### Passo 1.4 - Inicializar repositório Git
- [ ] `git init` (se ainda não for repo)
- [ ] Criar `.gitignore` (ignorar `.DS_Store`, `Thumbs.db`, etc)
- [ ] Primeiro commit: "chore: setup inicial do projeto"

---

## Fase 2: Página Home

### Passo 2.1 - HTML da Home
- [ ] Criar `index.html` com estrutura semântica
- [ ] Implementar `<header>` com nome e navegação
- [ ] Implementar 3 seções de estante: Lendo, Quero Ler, Já Li
- [ ] Criar 2-3 cards de exemplo em cada seção (dados fictícios)
- [ ] Implementar `<footer>`

### Passo 2.2 - CSS da Estante
- [ ] `css/estante.css` - Estilo da prateleira, efeito visual
- [ ] `css/card.css` - Estilo do card de livro (capa, título, status, progresso)
- [ ] `css/modal.css` - Estilo do modal de progresso (overlay, conteúdo, animação)
- [ ] Implementar hover nos livros (sombra + elevação)
- [ ] Implementar barra de progresso CSS (base estática, JS aplica a classe dinâmica)

### Passo 2.3 - Responsividade da Home
- [ ] `css/responsivo.css` - Breakpoints mobile-first
- [ ] Testar em 3 tamanhos: 375px, 768px, 1024px

### Passo 2.4 - Validação
- [ ] Validar HTML no W3C Validator
- [ ] Validar contraste de cores (WebAIM)
- [ ] Testar navegação por teclado
- [ ] Commit: "feat: página home com estantes virtuais"

---

## Fase 3: Páginas de Categoria

### Passo 3.1 - Página índice de categorias
- [ ] Criar `categorias/index.html`
- [ ] Grid de cards de categoria (ícone + nome + contagem)
- [ ] Breadcrumb: `Home › Categorias`

### Passo 3.2 - Página de listagem por categoria
- [ ] Criar `categorias/programacao.html` (exemplo)
- [ ] Reutilizar componente de estante/prateleira
- [ ] Breadcrumb: `Home › Programação`
- [ ] Commit: "feat: páginas de categorias"

---

## Fase 4: Página de Detalhes do Item

### Passo 4.1 - HTML da página de detalhes
- [ ] Criar `acervo/programacao/clean-code.html` (exemplo)
- [ ] Seção de cabeçalho: capa + metadados
- [ ] Seção de ações: "Continuar da pág. X" e "Ler do início"
- [ ] Seção de tags
- [ ] Seção de notas pessoais
- [ ] Seção do leitor embutido (iframe)

### Passo 4.2 - CSS da página de detalhes
- [ ] `css/leitor.css` - Estilo da página de detalhe e iframe
- [ ] Layout de duas colunas (capa + info) no desktop
- [ ] Layout de coluna única no mobile
- [ ] Estilizar bloco de notas pessoais
- [ ] Commit: "feat: página de detalhes com leitor embutido"

### Passo 4.3 - Placeholder de capa
- [ ] Implementar `.capa-placeholder` via CSS
- [ ] Testar com e sem imagem de capa
- [ ] Commit: "feat: placeholder de capa para PDFs sem imagem"

---

## Fase 5: Sistema de Progresso (JavaScript)

### Passo 5.1 - Lógica de progresso (localStorage)
- [ ] `js/progresso.js` - Funções: `salvarProgresso(slug, pagina)`, `lerProgresso(slug)`, `calcularPorcentagem(pagina, total)`
- [ ] Ao carregar a página de detalhes, ler o localStorage e exibir "Continuar da pág. X"
- [ ] Atualizar a barra de progresso dinamicamente (aplicar classe CSS correta)
- [ ] Atualizar os links do iframe e dos botões de ação com `#page=N`
- [ ] Commit: "feat: lógica de progresso de leitura com localStorage"

### Passo 5.2 - Modal de página
- [ ] `js/modal.js` - Lógica de abrir/fechar o modal
- [ ] Gatilho: blur do iframe + botão "Marcar página" flutuante
- [ ] Ao salvar: chamar `salvarProgresso()`, atualizar interface, fechar modal
- [ ] Validação: número da página entre 1 e total de páginas
- [ ] Transição de status automática (quero-ler → lendo → lido)
- [ ] Commit: "feat: modal interativo para marcar página de leitura"

### Passo 5.3 - Exportar progresso
- [ ] `js/exportar.js` - Função `exportarProgresso()` que gera e baixa o JSON
- [ ] Adicionar botão "Exportar progresso" na página de detalhes e no footer
- [ ] Commit: "feat: exportar progresso de leitura como JSON"

### Passo 5.4 - Importar progresso
- [ ] `js/importar.js` - Função `importarProgresso()` que lê o JSON e atualiza localStorage
- [ ] Adicionar botão "Importar progresso" junto com o de exportar
- [ ] Validação do formato JSON + feedback de sucesso/erro
- [ ] Commit: "feat: importar progresso de leitura via JSON"

### Passo 5.5 - Integrar JS nas páginas
- [ ] Adicionar `<script>` tags em todas as páginas que precisam de progresso
- [ ] Garantir que o site funciona sem JS (fallback: links estáticos para a pág. 1)
- [ ] Testar o fluxo completo: ler → marcar → exportar → importar
- [ ] Commit: "feat: integração completa do sistema de progresso"

### Passo 5.6 - Formulário "Adicionar PDF"
- [ ] `js/adicionar.js` - Lógica do formulário de adição de PDF via link externo
- [ ] `css/form-adicionar.css` - Estilo do formulário de adição
- [ ] Botão "+" no header que abre o formulário
- [ ] Campos: Título, Autor, Categoria, Link do PDF, Total de Páginas, Link da Capa
- [ ] Ao salvar: item é registrado no `localStorage` (`acervo-itens-dinamicos`)
- [ ] O JS renderiza os itens dinâmicos na estante junto com os permanentes
- [ ] Badge visual "Externo" nos itens dinâmicos para diferenciar
- [ ] Opção de remover item dinâmico (botão no card)
- [ ] Ao exportar JSON: incluir `acervo-itens-dinamicos` junto com o progresso
- [ ] Ao importar JSON: restaurar itens dinâmicos + progresso
- [ ] Commit: "feat: formulário para adicionar PDFs via link externo"

---

## Fase 6: Conteúdo Real

### Passo 6.1 - Adicionar primeiro PDF real
- [ ] Copiar PDF para `pdfs/programacao/` (se até 10 MB)
- [ ] Gerar/imagem de capa (ou usar placeholder)
- [ ] Criar página HTML do item com metadados reais
- [ ] Atualizar a Home com o item real
- [ ] Atualizar a página da categoria
- [ ] Commit: "feat: adiciona primeiro PDF ao acervo"

### Passo 6.2 - Template para novos itens
- [ ] Criar arquivo `TEMPLATE-item.html` na raiz como referência
- [ ] Documentar no README como adicionar novos itens
- [ ] Commit: "docs: adiciona template e guia de adição de itens"

---

## Fase 7: Deploy

### Passo 7.1 - Configurar GitHub Pages
- [ ] Garantir que todos os caminhos são relativos
- [ ] Configurar GitHub Pages no repo (Source: branch main, pasta root)
- [ ] Testar o site publicado

### Passo 7.2 - GitHub Actions (opcional)
- [ ] Criar `.github/workflows/deploy.yml`
- [ ] Workflow: validar HTML + publicar no Pages
- [ ] Commit: "ci: adiciona workflow de deploy"

### Passo 7.3 - Validação final
- [ ] Testar todos os links
- [ ] Testar abertura de PDFs
- [ ] Testar no mobile
- [ ] Testar no Chrome, Firefox, Safari
- [ ] Commit: "chore: validação final antes do lançamento"

---

## Checklist de Qualidade por Fase

Cada fase só é considerada concluída quando:

- [ ] HTML válido (W3C)
- [ ] CSS sem erros
- [ ] Responsivo (375px, 768px, 1024px)
- [ ] Acessível (contraste, alt, aria-label)
- [ ] Commit feito com mensagem semântica
- [ ] Testado no GitHub Pages (se deploy ativo)

---

## Convenção de Commits

| Tipo | Uso |
|---|---|
| `feat:` | Nova funcionalidade |
| `style:` | Mudança visual (CSS) |
| `docs:` | Documentação |
| `chore:` | Setup, configuração |
| `fix:` | Correção de bug |
| `refactor:` | Refatoração sem mudança de comportamento |
