# 04 - Wireframes (Rascunho Visual)

## Página 1: Home (index.html)

```
┌──────────────────────────────────────────────────────┐
│  🏠 ACERVO PESSOAL                    📂 Categorias  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  "Lendo Agora"                           ▸ ver  │  │
│  │  ╔════════╗ ╔════════╗ ╔════════╗              │  │
│  │  ║ CAPA 1 ║ ║ CAPA 2 ║ ║ CAPA 3 ║              │  │
│  │  ║        ║ ║        ║ ║        ║              │  │
│  │  ╚════════╝ ╚════════╝ ╚════════╝              │  │
│  │  Título 1    Título 2    Título 3              │  │
│  │  ████░░ 60%  ██░░░░ 25%  ██████ 100%          │  │
│  │  pág. 142    pág. 42     Concluído             │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  "Quero Ler"                              ▸ ver  │  │
│  │  ╔════════╗ ╔════════╗ ╔════════╗ ╔════════╗   │  │
│  │  ║ CAPA 4 ║ ║ CAPA 5 ║ ║ CAPA 6 ║ ║ CAPA 7 ║   │  │
│  │  ║        ║ ║        ║ ║        ║ ║        ║   │  │
│  │  ╚════════╝ ╚════════╝ ╚════════╝ ╚════════╝   │  │
│  │  Título 4    Título 5    Título 6    Título 7   │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
│  ┌────────────────────────────────────────────────┐  │
│  │  "Já Li"                                  ▸ ver  │  │
│  │  ╔════════╗ ╔════════╗ ╔════════╗              │  │
│  │  ║ CAPA 8 ║ ║ CAPA 9 ║ ║ CAPA10 ║              │  │
│  │  ╚════════╝ ╚════════╝ ╚════════╝              │  │
│  │  Título 8    Título 9    Título 10             │  │
│  │  ★★★★☆       ★★★★★       ★★★☆☆               │  │
│  └────────────────────────────────────────────────┘  │
│                                                      │
├──────────────────────────────────────────────────────┤
│  Acervo Pessoal © 2025 · Feito com HTML + CSS       │
└──────────────────────────────────────────────────────┘
```

### Elementos da Home
- **Header:** Nome do acervo + link para categorias
- **Seções por status:** "Lendo Agora", "Quero Ler", "Já Li"
- **Cards:** Capa + título + barra de progresso + página atual
- **Link "Continuar da pág. X":** Abre o PDF na página salva via `#page=N`
- **Footer:** Créditos

---

## Página 2: Categorias (categorias/index.html)

```
┌──────────────────────────────────────────────────────┐
│  🏠 ACERVO PESSOAL                    📂 Categorias  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Todas as Categorias                                 │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │ 💻       │  │ 🎨       │  │ ⚙️       │           │
│  │ Progra-  │  │ Design   │  │ Engenha- │           │
│  │ mação    │  │          │  │ ria      │           │
│  │ 5 itens  │  │ 3 itens  │  │ 2 itens  │           │
│  └──────────┘  └──────────┘  └──────────┘           │
│                                                      │
│  ┌──────────┐  ┌──────────┐                          │
│  │ 📚       │  │ 🧪       │                          │
│  │ Litera-  │  │ Ciência  │                          │
│  │ tura     │  │          │                          │
│  │ 4 itens  │  │ 1 item   │                          │
│  └──────────┘  └──────────┘                          │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Página 3: Lista por Categoria (categorias/programacao.html)

```
┌──────────────────────────────────────────────────────┐
│  🏠 ACERVO PESSOAL                    📂 Categorias  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ← Voltar    Programação                             │
│                                                      │
│  ╔════════╗ ╔════════╗ ╔════════╗ ╔════════╗        │
│  ║ CAPA 1 ║ ║ CAPA 2 ║ ║ CAPA 3 ║ ║ CAPA 4 ║        │
│  ║        ║ ║        ║ ║        ║ ║        ║        │
│  ╚════════╝ ╚════════╝ ╚════════╝ ╚════════╝        │
│  Clean Code  Pragmatic  Refactoring  Design Pat      │
│  LENDO 60%   QUERO LER  LIDO ★★★★  LENDO 30%       │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Página 4: Detalhes do Item (acervo/programacao/clean-code.html)

```
┌──────────────────────────────────────────────────────┐
│  🏠 ACERVO PESSOAL                    📂 Categorias  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ← Programação                                      │
│                                                      │
│  ╔══════════╗  Clean Code                           │
│  ║          ║  Robert C. Martin                     │
│  ║   CAPA   ║                                       │
│  ║          ║  [LEND0]  ★★★★☆                       │
│  ╚══════════╝  Adicionado em: 15/01/2025            │
│                                                      │
│  Progresso: ████████░░░░░░░░ 42%                    │
│  Página atual: 42 de 464                            │
│                                                      │
│ ┌──────────────────────────────────────────────┐ │
│ │ ▶ Continuar da página 42 │ │
│ └──────────────────────────────────────────────┘ │
│ ┌──────────────────────────────────────────────┐ │
│ │ 📖 Ler do início │ │
│ └──────────────────────────────────────────────┘ │
│ │
│ Tags: boas-praticas · java · refatoracao │
│ │
│ ┌──────────────────────────────────────────────┐ │
│ │ 📝 Notas Pessoais │ │
│ │ Capítulo 3 traz ótimos exemplos sobre │ │
│ │ nomenclatura de funções. Revisar página 38. │ │
│ └──────────────────────────────────────────────┘ │
│ │
│ ─── Leitor Embutido ─── │
│ ┌──────────────────────────────────────────────┐ │
│ │ │ │
│ │ [ PDF EMBED - iframe ] │ │
│ │ │ │
│ │ src="./pdfs/programacao/clean-code.pdf │ │
│ │ #page=42" │ │
│ │ │ │
│ └──────────────────────────────────────────────┘ │
│ │
│ ┌──────────────────────────────────────────────┐ │
│ │ 📥 Exportar progresso │ 📤 Importar progresso │ │
│ └──────────────────────────────────────────────┘ │
│ │
└──────────────────────────────────────────────────────┘
```

---

## Página 5: Modal "Em qual página parou?" (acima da página de detalhes)

```
┌──────────────────────────────────────────────────────┐
│ 🏠 ACERVO PESSOAL 📂 Categorias ➕ │
├──────────────────────────────────────────────────────┤
│ │
│ ┌──────────────────────────────────────────────┐ │
│ │ ┌────────────────────────────────────────┐ │ │
│ │ │ │ │ │
│ │ │ 📖 Em qual página você parou? │ │ │
│ │ │ │ │ │
│ │ │ Clean Code │ │ │
│ │ │ ┌─────────────────┐ │ │ │
│ │ │ │ 42 │ │ │ │
│ │ │ └─────────────────┘ │ │ │
│ │ │ │ │ │
│ │ │ [Cancelar] [Salvar página] │ │ │
│ │ │ │ │ │
│ │ └────────────────────────────────────────┘ │ │
│ └──────────────────────────────────────────────┘ │
│ │
└──────────────────────────────────────────────────────┘
```

### Sobre o Leitor Embutido
- O PDF é exibido via `<iframe>` ou `<embed>` com o parâmetro `#page=N`
- Isso abre o PDF nativamente na página indicada
- Funciona em todos os navegadores modernos
- Para PDFs externos (Google Drive, etc), usa-se `<iframe>` com a URL de embed

### Sobre o Modal de Progresso
- O modal aparece automaticamente quando o usuário sai do iframe do PDF (evento `blur` ou `focusout`)
- Também pode ser acionado por um botão "Marcar página" fixo no canto da tela
- O usuário digita o número da página e clica em "Salvar página"
- O JS salva no `localStorage` e atualiza a barra de progresso e o link "Continuar da pág. X"
- O botão "Cancelar" fecha o modal sem salvar

### Sobre Exportar/Importar JSON
- O botão "Exportar progresso" gera um arquivo `.json` com todos os dados do `localStorage` e inicia o download
- O botão "Importar progresso" abre um seletor de arquivo, lê o JSON e atualiza o `localStorage`
- Esses botões ficam na página de detalhes e também podem ser adicionados ao header/footer global
