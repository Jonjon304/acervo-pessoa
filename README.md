# Acervo Pessoal

Biblioteca digital estatica para catalogar e acompanhar a leitura de PDFs, hospedada no GitHub Pages.

## Funcionalidades

- **Estantes virtuais** (Lendo / Quero Ler / Ja Li) na pagina inicial
- **Progresso de leitura** salvo no localStorage do navegador
- **Modal de progresso** ao clicar em qualquer card de livro
- **Visualizador PDF** embutido nas paginas de detalhe
- **Adicionar PDFs** rapidamente via formulario (salva no localStorage)
- **Exportar/Importar** progresso em JSON para sincronizar entre dispositivos
- **Paginas por categoria** com estantes de livros

## Estrutura

```
/
├── index.html                  # Pagina inicial (estantes + modal + formulario)
├── TEMPLATE-item.html          # Template para novos itens permanentes
├── css/
│   ├── reset.css               # Reset CSS
│   ├── variaveis.css           # Design system (cores, espacamento, fontes)
│   ├── global.css              # Estilos globais
│   ├── estante.css             # Header, footer, layout principal
│   ├── card.css                # Cards de livros + barra de progresso
│   ├── modal.css               # Modal overlay + botao flutuante
│   ├── leitor.css              # Pagina de detalhe (iframe, notas)
│   ├── categorias.css          # Grid de categorias
│   ├── form-adicionar.css      # Formulario de adicionar PDF
│   └── responsivo.css          # Breakpoints mobile-first
├── js/
│   ├── progresso.js            # localStorage: ler/salvar progresso
│   ├── modal.js                # Abrir/fechar modal
│   ├── exportar.js             # Exportar progresso como JSON
│   ├── importar.js             # Importar progresso de JSON
│   └── adicionar.js            # Formulario + itens dinamicos
├── categorias/
│   ├── index.html              # Grid de categorias
│   ├── programacao.html        # Livros de programacao
│   ├── design.html             # Livros de design
│   └── pessoal.html            # Livros de desenvolvimento pessoal
├── acervo/
│   ├── programacao/            # Paginas de detalhe + PDFs
│   ├── design/                 # Paginas de detalhe + PDFs
│   └── pessoal/                # Paginas de detalhe + PDFs
├── pdfs/                       # PDFs do acervo (git-tracked se <10MB)
├── img/                        # Imagens e capas
├── esboco/                     # Documentacao de planejamento
└── .github/workflows/deploy.yml # GitHub Pages deploy
```

## Como Adicionar um Novo Item

### Metodo 1: Permanente (via git)

1. Copie `TEMPLATE-item.html` para `acervo/<categoria>/<slug>.html`
2. Substitua os placeholders: `TITULO`, `AUTOR`, `CATEGORIA`, `SLUG`, `TOTAL_PAGINAS`
3. Coloque o PDF em `pdfs/<categoria>/<slug>.pdf` (se for <10MB)
4. Adicione um card na pagina da categoria correspondente (`categorias/<categoria>.html`)
5. Adicione um card na estante desejada no `index.html`
6. Commit e push

### Metodo 2: Rapido (via navegador)

1. Clique em "Adicionar PDF" na pagina inicial
2. Preencha titulo, autor, categoria e link do PDF
3. O item aparece na estante com badge "Externo"
4. Salvo no localStorage (use Exportar/Importar para backup)

## Deploy

O deploy e automatico via GitHub Actions a cada push na branch `main`.

Para ativar o GitHub Pages:
1. Vá em Settings > Pages no repositorio
2. Em "Source", selecione **GitHub Actions**
3. Faca um push na branch `main`

## Tecnologias

- HTML5 semantico
- CSS3 (Flexbox/Grid, variaveis CSS)
- JavaScript vanilla (localStorage + export/import JSON)
- GitHub Pages (hospedagem estatica)
