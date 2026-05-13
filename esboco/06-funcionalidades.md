# 06 - Funcionalidades Detalhadas

## F01 - Estante Virtual (Home)

**Descrição:** A página principal exibe os PDFs organizados em "prateleiras" virtuais, agrupados por status de leitura.

**Comportamento:**
- 3 seções horizontais: "Lendo Agora", "Quero Ler", "Já Li"
- Cada seção é uma prateleira com efeito visual de madeira/estante (CSS gradient)
- Os PDFs aparecem como livros em pé com a capa visível
- Scroll horizontal na prateleira em telas pequenas
- Link "ver todos" no canto direito de cada seção

**Elementos HTML:**
```
<section class="estante" aria-label="Livros que estou lendo">
  <h2>Lendo Agora <a href="#" class="ver-todos">ver todos ›</a></h2>
  <div class="prateleira">
    <article class="livro">...</article>
    <article class="livro">...</article>
  </div>
</section>
```

**Estilo CSS:**
- Prateleira com gradiente simulando madeira escura
- Livros com sombra e hover (levanta ligeiramente)
- Capa do livro com `object-fit: cover`

---

## F02 - Card de Livro

**Descrição:** Cada PDF é representado por um card visual que mostra a capa e informações essenciais.

**Conteúdo do Card:**
1. Imagem de capa (ou placeholder com título)
2. Título do livro
3. Autor
4. Badge de status (lido/lendo/quero ler)
5. Barra de progresso (se estiver lendo)
6. Texto "pág. X" (se estiver lendo)
7. Avaliação em estrelas (se já lido)

**Link do Card:**
- Clique na capa → vai para a página de detalhes
- Link "Continuar da pág. X" → abre o PDF direto na página

---

## F03 - Navegação por Categorias

**Descrição:** Página que lista todas as categorias disponíveis com contagem de itens.

**Comportamento:**
- Grid de cards de categoria (ícone + nome + quantidade)
- Clique no card → lista de PDFs daquela categoria
- Migalhas de pão (breadcrumb) para navegação

**Breadcrumb:**
```
Home › Programação › Clean Code
```

---

## F04 - Página de Detalhes do Item

**Descrição:** Página individual com todas as informações do PDF e o leitor embutido.

**Seções:**
1. **Cabeçalho:** Capa grande + metadados completos
2. **Ações:** Botões "Continuar da pág. X" e "Ler do início"
3. **Tags:** Lista de tags clicáveis
4. **Notas Pessoais:** Bloco com anotações do usuário
5. **Leitor Embutido:** iframe/embed com o PDF

**Links de Ação:**
```html
<a href="./pdfs/programacao/clean-code.pdf#page=42" class="botao-primario">
  ▶ Continuar da página 42
</a>
<a href="./pdfs/programacao/clean-code.pdf" class="botao-secundario">
  📖 Ler do início
</a>
```

---

## F05 - Leitor de PDF Embutido

**Descrição:** Exibição do PDF diretamente na página de detalhes usando `<iframe>`.

**Implementação:**
```html
<iframe
  src="./pdfs/programacao/clean-code.pdf#page=42"
  class="leitor-pdf"
  title="Leitor de PDF - Clean Code"
  aria-label="Documento PDF embutido"
  loading="lazy"
></iframe>
```

**Para PDFs externos (Google Drive):**
```html
<iframe
  src="https://drive.google.com/file/d/FILE_ID/preview"
  class="leitor-pdf"
  title="Leitor de PDF - [Título]"
  loading="lazy"
></iframe>
```

**Estilo:**
```css
.leitor-pdf {
  width: 100%;
  height: 80vh;
  border: 1px solid var(--cor-fundo-card);
  border-radius: var(--raio-md);
}
```

---

## F06 - Sistema de Progresso de Leitura (JS + localStorage)

**Descrição:** Indicador visual de quanto do PDF já foi lido, com salvamento automático no navegador.

**Implementação:**
- Barra de progresso renderizada pelo JS com base nos dados do `localStorage`
- Cálculo: `Math.round((paginaAtual / totalPaginas) * 100)`
- Classes CSS aplicadas dinamicamente: `progresso-0`, `progresso-25`, `progresso-50`, `progresso-75`, `progresso-100`
- Texto indicando a página atual
- Link que abre o PDF na página onde parou (`#page=N`)

**Atualização:** Via modal interativo (ver F11).

**Fluxo:**
1. Usuário lê o PDF no navegador
2. Ao sair do leitor, o modal aparece perguntando a página
3. Usuário digita o número → JS salva no `localStorage`
4. A interface é atualizada automaticamente (barra, link, texto)

---

## F07 - Adicionar PDF ao Acervo (Modo Híbrido)

**Descrição:** Existem duas formas de adicionar PDFs ao acervo:

### 7A - Modo Permanente (via commit no repositório)
Para PDFs que o usuário quer ter sempre disponíveis no site, fixos no HTML.

**Fluxo:**
1. Copiar o PDF para `pdfs/{categoria}/` (se até 10 MB)
2. Copiar a capa para `img/capas/`
3. Criar a página HTML do item em `acervo/{categoria}/{slug}.html`
4. Atualizar a Home e a página de categoria
5. Commitar e fazer push

**Vantagens:** Item fica permanente no site, funciona em qualquer dispositivo, aparece no código-fonte.

### 7B - Modo Rápido (via formulário web, link externo)
Para adicionar PDFs sem precisar commitar — basta colar um link. O item é salvo no `localStorage` e aparece dinamicamente na estante.

**Fluxo:**
1. Usuário clica no botão "+" (adicionar PDF) no header
2. Um formulário aparece com os campos: Título, Autor, Categoria, Link do PDF, Total de Páginas
3. O JS salva os dados no `localStorage` (chave: `acervo-itens-dinamicos`)
4. O item aparece na estante junto com os itens permanentes
5. Ao clicar no card, o PDF externo abre no iframe embutido

**Formulário HTML:**
```html
<form id="form-adicionar-pdf" class="form-adicionar">
  <h2>Adicionar PDF</h2>

  <label for="input-titulo">Título *</label>
  <input type="text" id="input-titulo" required>

  <label for="input-autor">Autor</label>
  <input type="text" id="input-autor">

  <label for="input-categoria">Categoria *</label>
  <select id="input-categoria" required>
    <option value="programacao">Programação</option>
    <option value="design">Design</option>
    <option value="engenharia">Engenharia</option>
    <option value="literatura">Literatura</option>
    <option value="ciencia">Ciência</option>
    <option value="negocios">Negócios</option>
    <option value="pessoal">Desenvolvimento Pessoal</option>
  </select>

  <label for="input-link-pdf">Link do PDF * (Google Drive, Dropbox, etc)</label>
  <input type="url" id="input-link-pdf" required placeholder="https://drive.google.com/file/d/...">

  <label for="input-total-paginas">Total de Páginas</label>
  <input type="number" id="input-total-paginas" min="1">

  <label for="input-link-capa">Link da Capa (opcional)</label>
  <input type="url" id="input-link-capa" placeholder="https://...">

  <button type="submit" class="botao-primario">Adicionar ao Acervo</button>
  <button type="button" class="botao-secundario" id="btn-cancelar-adicao">Cancelar</button>
</form>
```

**Formato no localStorage (`acervo-itens-dinamicos`):**
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

**Renderização:** O JS lê `acervo-itens-dinamicos` e insere os cards na estante junto com os itens permanentes do HTML. Itens dinâmicos têm um badge visual "Externo" para diferenciar.

**Remoção:** Itens dinâmicos podem ser removidos pelo próprio site (botão no card), pois ficam no localStorage. Itens permanentes só saem removendo o HTML e commitando.

**Exportação:** Ao exportar o JSON de progresso, os itens dinâmicos também são incluídos, permitindo sincronizar entre dispositivos.

---

## F08 - PDFs no Repositório (Limite e Organização)

**Descrição:** Regras para PDFs commitados diretamente no repositório.

**Regra de decisão:**
- **Até 10 MB:** Commitar no repo (pasta `/pdfs/`)
- **Acima de 10 MB:** Usar link externo via formulário web (F07-7B)

**Estrutura no HTML (itens permanentes):**
```html
<a href="./pdfs/programacao/clean-code.pdf#page=42">Continuar</a>
```

**Atenção GitHub:**
- Limite recomendado de repo: ~1 GB total
- GitHub Pages: arquivos até 100 MB
- Git LFS disponível se necessário (mas evitamos para manter simplicidade)

---

## F09 - Placeholder de Capa

**Descrição:** Quando o usuário não tem imagem de capa, o sistema gera um placeholder visual via CSS.

**Implementação:**
```html
<div class="capa-placeholder" aria-label="Capa do livro: Clean Code">
  <span class="capa-titulo">Clean Code</span>
  <span class="capa-autor">Robert C. Martin</span>
</div>
```

**Estilo:**
```css
.capa-placeholder {
  width: 140px;
  height: 200px;
  background: linear-gradient(135deg, var(--cor-fundo-card), var(--cor-fundo-estante));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: var(--raio-sm);
  border-left: 4px solid var(--cor-destaque);
  text-align: center;
  padding: var(--espaco-sm);
}
```

---

## F10 - Responsividade

**Breakpoints:**
| Nome | Min-width | Layout |
|---|---|---|
| Mobile | 0 | 2 livros por prateleira, scroll horizontal |
| Tablet | 768px | 3 livros por prateleira |
| Desktop | 1024px | 5 livros por prateleira |
| Wide | 1440px | 6 livros por prateleira |

**Mobile:**
- Header colapsado (nome + ícone de menu CSS-only)
- Cards em scroll horizontal
- Leitor PDF em tela cheia
- Notas pessoais colapsáveis (details/summary)

---

## F11 - Acessibilidade

- Todas as imagens com `alt` descritivo
- Links com `aria-label` quando o texto não é suficiente
- Contraste mínimo 4.5:1 (fundo escuro + texto claro)
- Navegação por teclado (foco visível)
- Uso de `<details>` e `<summary>` para seções colapsáveis
- Semântica HTML5 completa

---

## F12 - Modal "Em Qual Página Parou?"

**Descrição:** Modal interativo que aparece quando o usuário sai do leitor de PDF, perguntando em qual página parou.

**Gatilhos de abertura:**
1. Quando o iframe do PDF perde o foco (`blur` / `focusout`)
2. Botão fixo "Marcar página" flutuante no canto da tela (durante a leitura)
3. Botão "Atualizar progresso" na seção de ações da página de detalhes

**Conteúdo do Modal:**
```html
<div class="modal-overlay" id="modal-progresso">
  <div class="modal-conteudo" role="dialog" aria-labelledby="modal-titulo">
    <h2 id="modal-titulo">Em qual página você parou?</h2>
    <p class="modal-livro">Clean Code</p>
    <label for="input-pagina">Página:</label>
    <input type="number" id="input-pagina" min="1" placeholder="42">
    <div class="modal-acoes">
      <button class="botao-secundario" id="modal-cancelar">Cancelar</button>
      <button class="botao-primario" id="modal-salvar">Salvar página</button>
    </div>
  </div>
</div>
```

**Comportamento:**
- Ao clicar "Salvar página": JS salva no `localStorage`, atualiza a barra de progresso, atualiza o link "Continuar da pág. X", fecha o modal
- Ao clicar "Cancelar": fecha o modal sem salvar
- Se `paginaAtual >= totalPaginas`: JS sugere alterar o status para `lido`
- Se o item estava como `quero-ler` e o usuário salva uma página: JS muda o status para `lendo`

**Estilo (modal.css):**
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-conteudo {
  background: var(--cor-fundo-card);
  padding: var(--espaco-lg);
  border-radius: var(--raio-lg);
  max-width: 400px;
  width: 90%;
}
```

---

## F13 - Exportar Progresso (JSON)

**Descrição:** Botão que gera um arquivo JSON com todo o progresso de leitura salvo no `localStorage` e inicia o download.

**Localização:** Página de detalhes (abaixo do leitor) + Header/Footer (acessível de qualquer página)

**Implementação (exportar.js):**
```js
function exportarProgresso() {
  const dados = localStorage.getItem('acervo-progresso');
  if (!dados) return;

  const blob = new Blob([dados], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'acervo-progresso.json';
  a.click();
  URL.revokeObjectURL(url);
}
```

**Arquivo gerado:** `acervo-progresso.json`
```json
{
  "acervo-progresso": {
    "clean-code": {
      "paginaAtual": 42,
      "totalPaginas": 464,
      "status": "lendo",
      "dataAtualizacao": "2025-01-20"
    },
    "design-patterns": {
      "paginaAtual": 15,
      "totalPaginas": 395,
      "status": "lendo",
      "dataAtualizacao": "2025-01-18"
    }
  }
}
```

**Uso típico:** Exportar no PC → commitar o JSON no repo → importar no celular

---

## F14 - Importar Progresso (JSON)

**Descrição:** Botão que permite carregar um arquivo JSON de progresso e atualizar o `localStorage` do navegador.

**Localização:** Junto com o botão de exportar (página de detalhes + header/footer)

**Implementação (importar.js):**
```js
function importarProgresso(event) {
  const arquivo = event.target.files[0];
  if (!arquivo) return;

  const leitor = new FileReader();
  leitor.onload = function(e) {
    try {
      const dados = JSON.parse(e.target.result);
      if (dados['acervo-progresso']) {
        localStorage.setItem('acervo-progresso', JSON.stringify(dados['acervo-progresso']));
        location.reload();
      }
    } catch (erro) {
      alert('Arquivo JSON inválido.');
    }
  };
  leitor.readAsText(arquivo);
}
```

**Comportamento:**
- Abre seletor de arquivo filtrado para `.json`
- Valida o formato do JSON
- Se válido: salva no `localStorage` e recarrega a página para refletir as mudanças
- Se inválido: exibe mensagem de erro

**Elemento HTML:**
```html
<label for="input-importar" class="botao-secundario">
  📤 Importar progresso
</label>
<input type="file" id="input-importar" accept=".json" style="display:none">
```
