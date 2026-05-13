# 05 - Taxonomia e Metadados

## Categorias Padrão

| Slug | Nome | Ícone | Descrição |
|---|---|---|---|
| `programacao` | Programação | 💻 | Livros de código, linguagens, engenharia de software |
| `design` | Design | 🎨 | UI/UX, design gráfico, tipografia |
| `engenharia` | Engenharia | ⚙️ | Engenharia de software, sistemas, arquitetura |
| `literatura` | Literatura | 📚 | Ficção, não-ficção, ensaios |
| `ciencia` | Ciência | 🧪 | Ciência da computação, matemática, física |
| `negocios` | Negócios | 💼 | Gestão, empreendedorismo, marketing |
| `pessoal` | Desenvolvimento Pessoal | 🌱 | Produtividade, hábitos, carreira |

> O usuário pode adicionar novas categorias criando a pasta e o arquivo HTML correspondente.

## Tags Sugeridas

As tags são livres e definidas pelo usuário. Exemplos por categoria:

### Programação
`boas-praticas`, `java`, `python`, `javascript`, `refatoracao`, `patterns`, `algoritmos`, `api`, `testes`, `devops`

### Design
`ux`, `ui`, `acessibilidade`, `tipografia`, `cores`, `layout`, `mobile`, `prototipacao`

### Engenharia
`arquitetura`, `microservicos`, `cloud`, `escalabilidade`, `devops`, `ci-cd`

## Metadados Completos de Cada Item

Cada PDF no acervo possui os seguintes metadados, registrados como comentário HTML no topo da página e refletidos no conteúdo visível:

| Metadado | Tipo | Obrigatório | Exemplo |
|---|---|---|---|
| **Título** | texto | Sim | `Clean Code` |
| **Autor** | texto | Sim | `Robert C. Martin` |
| **Categoria** | enum | Sim | `programacao` |
| **Tags** | lista | Não | `boas-praticas, java, refatoracao` |
| **Data de Adição** | data | Sim | `2025-01-15` |
| **Notas Pessoais** | texto longo | Não | `Capítulo 3 traz ótimos exemplos...` |
| **Avaliação** | inteiro (1-5) | Não | `4` |
| **Status** | enum | Sim | `lendo`, `lido`, `quero-ler` |
| **Página Atual** | inteiro | Não | `42` |
| **Total de Páginas** | inteiro | Não | `464` |
| **Fonte do PDF** | enum | Sim | `local` ou `externo` |
| **URL do PDF** | texto | Sim | `./pdfs/programacao/clean-code.pdf` ou URL externa |
| **Imagem de Capa** | texto | Não | `./img/capas/clean-code.jpg` |

## Modelo de Comentário HTML (Template)

```html
<!--
  ACERVO ITEM METADATA
  titulo: Clean Code
  autor: Robert C. Martin
  categoria: programacao
  tags: boas-praticas, java, refatoracao
  data-adicao: 2025-01-15
  status: lendo
  avaliacao: 4
  pagina-atual: 42
  total-paginas: 464
  fonte-pdf: local
  url-pdf: ./pdfs/programacao/clean-code.pdf
  url-capa: ./img/capas/clean-code.jpg
  notas: Capítulo 3 traz ótimos exemplos sobre nomenclatura de funções.
-->
```

## Sistema de Progresso (JS + localStorage)

O progresso de leitura é calculado e exibido automaticamente pelo JavaScript:

```
porcentagem = (paginaAtual / totalPaginas) * 100
```

### Classes CSS dinâmicas (aplicadas via JS)

| Classe CSS | Porcentagem | Significado |
|---|---|---|
| `progresso-0` | 0% | Ainda não começou |
| `progresso-25` | 1% a 25% | Início da leitura |
| `progresso-50` | 26% a 50% | Um quarto a metade |
| `progresso-75` | 51% a 75% | Mais da metade |
| `progresso-100` | 76% a 100% | Quase terminando ou concluído |

### Fluxo automático (via JS)
1. Usuário abre a página de detalhes do PDF
2. O JS lê o `localStorage` e exibe a página salva + barra de progresso
3. Usuário lê o PDF no iframe
4. Ao sair do iframe ou clicar em "Marcar página", o modal aparece
5. Usuário digita a página → JS salva no `localStorage` → atualiza a interface

### Dados salvos no localStorage

Cada item salva: `paginaAtual`, `totalPaginas`, `status`, `dataAtualizacao`

### JSON de exportação

```json
{
  "acervo-progresso": {
    "clean-code": {
      "paginaAtual": 42,
      "totalPaginas": 464,
      "status": "lendo",
      "dataAtualizacao": "2025-01-20"
    }
  }
}
```

## Relação entre Status e Progresso

| Status | Progresso Esperado | Ação ao Mudar |
|---|---|---|
| `quero-ler` | `progresso-0` | Ao digitar a primeira página no modal, JS muda para `lendo` |
| `lendo` | `progresso-25` a `progresso-75` | Modal atualiza página e progresso automaticamente |
| `lido` | `progresso-100` | Quando `paginaAtual >= totalPaginas`, JS sugere mudar para `lido` |
