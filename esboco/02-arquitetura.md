# 02 - Arquitetura de Pastas e Arquivos

## Hierarquia do Projeto

```
acervo-pessoal/
├── index.html                      # Home - Vitrine do acervo
├── css/
│   ├── reset.css                   # Reset/normalize CSS
│   ├── variaveis.css               # Variáveis CSS (Design System)
│   ├── global.css                  # Estilos globais (body, tipografia)
│   ├── estante.css                 # Estilos da estante de livros
│   ├── card.css                    # Estilos dos cards de PDF
│   ├── leitor.css                  # Estilos da página de leitura/detalhe
│   ├── modal.css                   # Estilos do modal de progresso
│   └── responsivo.css              # Media queries (mobile-first)
├── js/
│   ├── progresso.js                # Lógica de salvamento de progresso (localStorage)
│   ├── modal.js                    # Lógica do modal "Em qual página parou?"
│   ├── exportar.js                 # Lógica de exportar progresso para JSON
│   ├── importar.js                 # Lógica de importar progresso de JSON
│   └── adicionar.js                # Lógica do formulário "Adicionar PDF" (itens dinâmicos)
├── categorias/
│   ├── index.html                  # Lista de todas as categorias
│   ├── programacao.html            # Categoria: Programação
│   ├── design.html                 # Categoria: Design
│   ├── engenharia.html             # Categoria: Engenharia
│   └── ...                         # Outras categorias conforme necessidade
├── acervo/
│   ├── programacao/
│   │   ├── clean-code.html         # Página individual do PDF
│   │   └── ...
│   ├── design/
│   │   ├── don-t-make-me-think.html
│   │   └── ...
│   └── ...
├── pdfs/                           # PDFs armazenados no repositório
│   ├── programacao/
│   │   ├── clean-code.pdf
│   │   └── ...
│   ├── design/
│   │   └── ...
│   └── ...
├── img/
│   ├── capas/                      # Capas dos PDFs (thumbnails)
│   │   ├── clean-code.jpg
│   │   └── ...
│   ├── icones/                     # Ícones SVG inline
│   └── favicon.ico
├── esboco/                         # Rascunhos do planejamento (esta pasta)
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions para deploy
├── AGENTS.md                       # Definição do agente IA
├── .prompt-ia/                     # Prompts do agente
└── README.md                       # Documentação do projeto
```

## Convenção de Nomenclatura

| Tipo | Padrão | Exemplo |
|---|---|---|
| Arquivos HTML de item | `kebab-case.html` | `clean-code.html` |
| PDFs | `kebab-case.pdf` | `clean-code.pdf` |
| Imagens de capa | `kebab-case.jpg` | `clean-code.jpg` |
| Arquivos CSS | `kebab-case.css` | `estante.css` |
| Arquivos JS | `kebab-case.js` | `progresso.js` |
| Pastas de categoria | `kebab-case/` | `programacao/` |

## Padrão de Caminhos (GitHub Pages)

Todos os caminhos devem ser **relativos** para funcionar no GitHub Pages:

```
Correto: href="./css/global.css"
Correto: href="./categorias/programacao.html"
Correto: src="./pdfs/programacao/clean-code.pdf"
Correto: src="./js/progresso.js"

Errado: href="/css/global.css" (absoluto)
Errado: href="https://site.com/..." (externo, exceto para PDFs externos)
```

## Página Individual - Estrutura HTML do Item

Cada página de item (`acervo/{categoria}/{slug}.html`) segue este padrão:

```html
<!--
  METADADOS DO ITEM (referência para edição manual)
  Título: Clean Code
  Autor: Robert C. Martin
  Categoria: programacao
  Tags: boas-praticas, java, refatoracao
  Data: 2025-01-15
  Status: lendo
  Avaliacao: 4
  Pagina Atual: 42
  Total Paginas: 464
  Fonte PDF: local (./pdfs/programacao/clean-code.pdf)
-->
```

O comentário HTML no topo de cada arquivo serve como **referência rápida** para os metadados estáticos do item (título, autor, categoria, etc). Os metadados dinâmicos (página atual, status de leitura, progresso) são gerenciados pelo JavaScript via `localStorage`.

## Estrutura do localStorage

O `localStorage` usa a chave `acervo-progresso` com o seguinte formato:

```json
{
  "clean-code": {
    "paginaAtual": 42,
    "totalPaginas": 464,
    "status": "lendo",
    "dataAtualizacao": "2025-01-20"
  },
  "design-patterns": {
    "paginaAtual": 15,
    "totalPaginas": 395,
    "status": "quero-ler",
    "dataAtualizacao": "2025-01-18"
  }
}
```

A **chave de cada item** no localStorage é o slug do arquivo HTML (sem extensão), ex: `clean-code` para `acervo/programacao/clean-code.html`.

## Estrutura do localStorage - Itens Dinâmicos

O `localStorage` usa a chave `acervo-itens-dinamicos` para PDFs adicionados via formulário web:

```json
{
  "meu-livro-externo": {
    "titulo": "Meu Livro",
    "autor": "Autor Desconhecido",
    "categoria": "programacao",
    "linkPdf": "https://drive.google.com/file/d/FILE_ID/preview",
    "linkCapa": "",
    "totalPaginas": 200,
    "status": "quero-ler",
    "dataAdicao": "2025-01-20",
    "tipo": "dinamico"
  }
}
```

Itens dinâmicos são renderizados pelo JS na estante junto com os itens permanentes do HTML.
