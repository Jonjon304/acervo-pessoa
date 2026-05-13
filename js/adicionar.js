const CHAVE_ITENS_DINAMICOS = 'acervo-itens-dinamicos';
const CHAVE_PROGRESSO = 'acervo-progresso';

function lerItensDinamicos() {
  const dados = localStorage.getItem(CHAVE_ITENS_DINAMICOS);
  return dados ? JSON.parse(dados) : {};
}

function salvarItemDinamico(slug, item) {
  const itens = lerItensDinamicos();
  itens[slug] = item;
  localStorage.setItem(CHAVE_ITENS_DINAMICOS, JSON.stringify(itens));
}

function removerItemDinamico(slug) {
  const itens = lerItensDinamicos();
  delete itens[slug];
  localStorage.setItem(CHAVE_ITENS_DINAMICOS, JSON.stringify(itens));

  const progresso = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || '{}');
  delete progresso[slug];
  localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));
}

function gerarSlug(titulo) {
  return titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function criarCardDinamico(slug, item) {
  const progresso = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || '{}');
  const dadosProgresso = progresso[slug] || {};

  const porcentagem = (typeof calcularPorcentagem === 'function')
    ? calcularPorcentagem(dadosProgresso.paginaAtual || 0, item.totalPaginas || 1)
    : 0;

  const classe = (typeof classeProgresso === 'function')
    ? classeProgresso(porcentagem)
    : 'progresso-0';

  const status = dadosProgresso.status || item.status || 'quero-ler';
  const paginaAtual = dadosProgresso.paginaAtual || 0;

  const statusClasse = status === 'lido' ? 'status-lido'
    : status === 'lendo' ? 'status-lendo'
    : 'status-quero-ler';

  const statusTexto = status === 'lido' ? 'Lido'
    : status === 'lendo' ? 'Lendo'
    : 'Quero Ler';

  const artigo = document.createElement('article');
  artigo.className = 'livro livro-dinamico';
  artigo.setAttribute('data-slug', slug);

  artigo.innerHTML =
    '<div class="livro-capa">' +
      (item.linkCapa
        ? '<img src="' + item.linkCapa + '" alt="' + item.titulo + '" loading="lazy">'
        : '<div class="capa-placeholder"><span class="capa-titulo">' + item.titulo + '</span><span class="capa-autor">' + (item.autor || '') + '</span></div>'
      ) +
      '<span class="status ' + statusClasse + '">' + statusTexto + '</span>' +
      '<span class="status status-externo">Externo</span>' +
    '</div>' +
    '<div class="livro-info">' +
      '<h3><a href="#dinamico-' + slug + '">' + item.titulo + '</a></h3>' +
      (item.autor ? '<p class="livro-autor">' + item.autor + '</p>' : '') +
      (paginaAtual > 0
        ? '<div class="progresso ' + classe + '" aria-label="' + porcentagem + '% lido"></div>' +
          '<span class="pagina-atual">pag. ' + paginaAtual + '</span>'
        : ''
      ) +
    '</div>' +
    '<button class="btn-remover-dinamico" data-slug="' + slug + '" aria-label="Remover ' + item.titulo + '" title="Remover">&times;</button>';

  return artigo;
}

function renderizarItensDinamicos(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const itens = lerItensDinamicos();
  const slugs = Object.keys(itens);

  if (slugs.length === 0) return;

  const secao = document.createElement('section');
  secao.className = 'estante';
  secao.setAttribute('aria-label', 'PDFs adicionados via link externo');

  secao.innerHTML = '<h2>Adicionados Recentemente</h2>';

  const prateleira = document.createElement('div');
  prateleira.className = 'prateleira';

  slugs.forEach(function(slug) {
    const card = criarCardDinamico(slug, itens[slug]);
    prateleira.appendChild(card);
  });

  secao.appendChild(prateleira);
  container.appendChild(secao);

  prateleira.querySelectorAll('.btn-remover-dinamico').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const s = btn.getAttribute('data-slug');
      if (confirm('Remover "' + itens[s].titulo + '" do acervo?')) {
        removerItemDinamico(s);
        location.reload();
      }
    });
  });
}

function configurarFormularioAdicionar() {
  const form = document.getElementById('form-adicionar-pdf');
  const btnAbrir = document.getElementById('btn-adicionar-pdf');
  const btnCancelar = document.getElementById('btn-cancelar-adicao');
  const formContainer = document.getElementById('container-form-adicionar');

  if (!form || !formContainer) return;

  if (btnAbrir) {
    btnAbrir.addEventListener('click', function() {
      formContainer.classList.toggle('form-ativo');
      if (formContainer.classList.contains('form-ativo')) {
        formContainer.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (btnCancelar) {
    btnCancelar.addEventListener('click', function() {
      formContainer.classList.remove('form-ativo');
      form.reset();
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const titulo = document.getElementById('input-titulo').value.trim();
    const autor = document.getElementById('input-autor').value.trim();
    const categoria = document.getElementById('input-categoria').value;
    const linkPdf = document.getElementById('input-link-pdf').value.trim();
    const totalPaginas = parseInt(document.getElementById('input-total-paginas').value, 10) || 0;
    const linkCapa = document.getElementById('input-link-capa').value.trim();

    if (!titulo || !linkPdf) return;

    const slug = gerarSlug(titulo);

    const item = {
      titulo: titulo,
      autor: autor,
      categoria: categoria,
      linkPdf: linkPdf,
      linkCapa: linkCapa,
      totalPaginas: totalPaginas,
      status: 'quero-ler',
      dataAdicao: new Date().toISOString().split('T')[0],
      tipo: 'dinamico'
    };

    salvarItemDinamico(slug, item);
    form.reset();
    formContainer.classList.remove('form-ativo');
    location.reload();
  });
}
