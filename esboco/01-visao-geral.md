# 01 - Visão Geral do Projeto

## Nome do Projeto
**Acervo Pessoal** - Biblioteca Digital Estática

## Descrição
Sistema web estático que funciona como uma biblioteca pessoal de PDFs, hospedado no GitHub Pages. O usuário pode visualizar seus PDFs organizados em estantes virtuais, acompanhar o progresso de leitura e acessar os documentos diretamente no navegador.

## Decisões de Projeto (Registro do Usuário)

| Decisão | Escolha |
|---|---|
| Persistência de dados | JS + localStorage + Exportar/Importar JSON |
| Armazenamento dos PDFs | Híbrido: repo (PDFs pequenos) + links externos (PDFs grandes) |
| Visual da biblioteca | Estante de livros (prateleiras com capas) |
| Nível de metadados | Completo (Título, Autor, Categoria, Tags, Data, Notas, Avaliação, Status) |

## Problema que Resolve
- Centralizar PDFs espalhados em um só lugar organizado
- Visualizar o acervo de forma agradável (estante virtual)
- Saber o status de leitura de cada item (lido / lendo / quero ler)
- Acessar os PDFs diretamente pelo navegador

## Stack Técnica
- **HTML5 semântico + CSS3 puro** (sem frameworks CSS)
- **JavaScript vanilla** (apenas para funcionalidades de progresso de leitura)
- **Hospedagem:** GitHub Pages (caminhos relativos)
- **Performance:** Carregamento instantâneo
- **Acessibilidade:** Tags ARIA e contraste adequado

## Funcionalidade "Lembrar Onde Parei" (JS + localStorage + JSON)

O progresso de leitura é salvo automaticamente no navegador via `localStorage`. Quando o usuário sai do leitor de PDF, um modal pergunta em qual página parou. O número digitado é salvo e o site passa a exibir "Continuar da pág. X".

### Como funciona:
1. **Leitura:** Usuário lê o PDF embutido na página de detalhes
2. **Ao sair:** Modal aparece: "Em qual página você parou?" → usuário digita o número
3. **Salvamento:** A página é salva no `localStorage` do navegador
4. **Exibição:** Nos cards e na página de detalhes, aparece "Continuar da pág. X" com link `#page=X`
5. **Barra de progresso:** Calculada automaticamente via JS (`paginaAtual / totalPaginas * 100`)

### Sincronização entre dispositivos (Exportar/Importar JSON):
6. **Exportar progresso:** Botão que gera e baixa um arquivo `.json` com todo o progresso salvo no `localStorage`
7. **Importar progresso:** Botão que carrega um arquivo `.json` e atualiza o `localStorage`
8. **Fluxo de sincronização:** No PC → Exportar JSON → commitar no repo → no celular → Importar JSON

### Formato do JSON exportado:
```json
{
  "acervo-progresso": {
    "clean-code": { "paginaAtual": 42, "totalPaginas": 464, "status": "lendo", "dataAtualizacao": "2025-01-20" },
    "design-patterns": { "paginaAtual": 15, "totalPaginas": 395, "status": "lendo", "dataAtualizacao": "2025-01-18" }
  },
  "acervo-itens-dinamicos": {
    "meu-livro-externo": { "titulo": "Meu Livro", "autor": "Autor", "categoria": "programacao", "linkPdf": "https://...", "totalPaginas": 200, "status": "quero-ler", "dataAdicao": "2025-01-20", "tipo": "dinamico" }
  }
}
```

### Vantagens dessa abordagem:
- Sem necessidade de login ou autenticação
- Sem servidor backend
- Funciona offline (localStorage)
- Sincronização manual via JSON (simples, o usuário controla)
- Dados ficam no navegador do usuário (privacidade)

## Escopo do MVP
1. Página Home com estantes virtuais
2. Página de listagem por categorias
3. Página individual de cada PDF (detalhes + leitura inline)
4. Design System básico (variáveis CSS)
5. Sistema de progresso de leitura (JS + localStorage)
6. Exportar/Importar progresso via JSON
7. Adicionar PDFs via link externo (formulário web, salva no localStorage)
8. Deploy no GitHub Pages
