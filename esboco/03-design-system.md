# 03 - Design System (Rascunho)

## Paleta de Cores

### Cores Primárias (Tom: aconchegante, biblioteca)
```css
:root {
  --cor-fundo:         #1a1a2e;    /* Azul-escuro noturno */
  --cor-fundo-card:    #16213e;    /* Azul-marinho profundo */
  --cor-fundo-estante: #0f3460;    /* Azul-prateleira */
  --cor-destaque:      #e94560;    /* Vermelho-accio (destaque) */
  --cor-texto:         #eaeaea;    /* Branco-suave para leitura */
  --cor-texto-sec:     #a0a0b0;   /* Cinza-claro secundário */
}
```

### Cores de Status de Leitura
```css
:root {
  --cor-lido:          #4ecca3;    /* Verde - já li */
  --cor-lendo:         #e94560;    /* Vermelho-accio - estou lendo */
  --cor-quero-ler:     #f5c542;    /* Amarelo-dourado - quero ler */
}
```

### Cores de Avaliação (Estrelas)
```css
:root {
  --cor-estrela-on:    #f5c542;    /* Dourado - preenchida */
  --cor-estrela-off:   #3a3a5c;    /* Cinza-escuro - vazia */
}
```

## Tipografia

```css
:root {
  --font-titulo:       'Georgia', serif;          /* Títulos: clássico, literário */
  --font-corpo:        'Segoe UI', sans-serif;    /* Corpo: legível e moderno */
  --font-mono:         'Fira Code', monospace;    /* Código/notas técnicas */
}
```

### Escala Tipográfica
| Elemento | Tamanho | Peso |
|---|---|---|
| H1 (Título da página) | 2rem | 700 |
| H2 (Título da seção/estante) | 1.5rem | 600 |
| H3 (Título do card) | 1.1rem | 600 |
| Corpo de texto | 1rem (16px) | 400 |
| Texto secundário | 0.875rem | 400 |
| Labels/tags | 0.75rem | 500 |

## Espaçamento

```css
:root {
  --espaco-xs:   0.25rem;   /* 4px */
  --espaco-sm:   0.5rem;    /* 8px */
  --espaco-md:   1rem;      /* 16px */
  --espaco-lg:   1.5rem;    /* 24px */
  --espaco-xl:   2rem;      /* 32px */
  --espaco-xxl:  3rem;      /* 48px */
}
```

## Raios de Borda

```css
:root {
  --raio-sm:   4px;        /* Tags, badges */
  --raio-md:   8px;        /* Cards */
  --raio-lg:   12px;       /* Modais, áreas grandes */
}
```

## Sombras

```css
:root {
  --sombra-card:      0 2px 8px rgba(0, 0, 0, 0.3);
  --sombra-card-hover: 0 4px 16px rgba(233, 69, 96, 0.2);
  --sombra-estante:   0 -2px 10px rgba(0, 0, 0, 0.5);
}
```

## Componentes CSS

### Barra de Progresso de Leitura (CSS puro)
```css
.progresso {
  width: 100%;
  height: 4px;
  background: var(--cor-estrela-off);
  border-radius: 2px;
}

.progresso-25::after { width: 25%; }
.progresso-50::after { width: 50%; }
.progresso-75::after { width: 75%; }
.progresso-100::after { width: 100%; }

.progresso::after {
  content: '';
  display: block;
  height: 100%;
  background: var(--cor-lendo);
  border-radius: 2px;
}
```

### Badge de Status
```css
.status {
  display: inline-block;
  padding: var(--espaco-xs) var(--espaco-sm);
  border-radius: var(--raio-sm);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-lido      { background: var(--cor-lido); color: #1a1a2e; }
.status-lendo     { background: var(--cor-lendo); color: #fff; }
.status-quero-ler { background: var(--cor-quero-ler); color: #1a1a2e; }
```

### Estrelas de Avaliação (CSS puro com entidades HTML)
```html
<!-- No HTML, usar entidades de caractere -->
<span class="avaliacao">
  &#9733;&#9733;&#9733;&#9733;<span class="vazia">&#9733;</span>
</span>
```

```css
.avaliacao { color: var(--cor-estrela-on); }
.avaliacao .vazia { color: var(--cor-estrela-off); }
```

## Princípios
1. **Mobile First:** Todos os estilos começam para mobile e escalam para desktop via `@media (min-width: ...)`
2. **Variáveis CSS:** Toda cor, espaçamento e tipografia em `:root`
3. **Semântica:** Usar `<article>`, `<section>`, `<nav>`, `<main>`, `<aside>`
4. **Acessibilidade:** Contraste mínimo 4.5:1, `aria-label` nos links, `alt` nas imagens
