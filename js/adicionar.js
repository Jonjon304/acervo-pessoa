const CHAVE_ITENS_DINAMICOS = 'acervo-itens-dinamicos';
const CHAVE_PROGRESSO = 'acervo-progresso';

function localStorageDisponivel() {
	try {
		var teste = '__acervo_teste__';
		localStorage.setItem(teste, '1');
		localStorage.removeItem(teste);
		return true;
	} catch (e) {
		return false;
	}
}

function lerItensDinamicos() {
	if (!localStorageDisponivel()) return {};
	var dados = localStorage.getItem(CHAVE_ITENS_DINAMICOS);
	return dados ? JSON.parse(dados) : {};
}

function salvarItemDinamico(slug, item) {
	if (!localStorageDisponivel()) {
		alert('localStorage nao esta disponivel neste navegador. Tente desativar o modo privado ou permitir cookies.');
		return false;
	}
	var itens = lerItensDinamicos();
	itens[slug] = item;
	localStorage.setItem(CHAVE_ITENS_DINAMICOS, JSON.stringify(itens));
	return true;
}

function removerItemDinamico(slug) {
	var itens = lerItensDinamicos();
	delete itens[slug];
	localStorage.setItem(CHAVE_ITENS_DINAMICOS, JSON.stringify(itens));

	var progresso = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || '{}');
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
	var progresso = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || '{}');
	var dadosProgresso = progresso[slug] || {};

	var porcentagem = (typeof calcularPorcentagem === 'function')
		? calcularPorcentagem(dadosProgresso.paginaAtual || 0, item.totalPaginas || 1)
		: 0;

	var classe = (typeof classeProgresso === 'function')
		? classeProgresso(porcentagem)
		: 'progresso-0';

	var status = dadosProgresso.status || item.status || 'quero-ler';
	var paginaAtual = dadosProgresso.paginaAtual || 0;

	var statusClasse = status === 'lido' ? 'status-lido'
		: status === 'lendo' ? 'status-lendo'
		: 'status-quero-ler';

	var statusTexto = status === 'lido' ? 'Lido'
		: status === 'lendo' ? 'Lendo'
		: 'Quero Ler';

	var artigo = document.createElement('article');
	artigo.className = 'livro livro-dinamico';
	artigo.setAttribute('data-slug', slug);
	if (item.totalPaginas) {
		artigo.setAttribute('data-total-paginas', item.totalPaginas);
	}

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
		'<h3><a href="' + item.linkPdf + '" target="_blank" rel="noopener">' + item.titulo + '</a></h3>' +
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
	var container = document.querySelector(containerSelector);
	if (!container) return;

	var itens = lerItensDinamicos();
	var slugs = Object.keys(itens);

	if (slugs.length === 0) return;

	var secao = document.createElement('section');
	secao.className = 'estante';
	secao.setAttribute('aria-label', 'PDFs adicionados via link externo');

	secao.innerHTML = '<h2>Adicionados Recentemente</h2>';

	var prateleira = document.createElement('div');
	prateleira.className = 'prateleira';

	slugs.forEach(function(slug) {
		var card = criarCardDinamico(slug, itens[slug]);
		prateleira.appendChild(card);
	});

	secao.appendChild(prateleira);
	container.appendChild(secao);

	prateleira.querySelectorAll('.btn-remover-dinamico').forEach(function(btn) {
		btn.addEventListener('click', function(e) {
			e.stopPropagation();
			var s = btn.getAttribute('data-slug');
			if (confirm('Remover "' + itens[s].titulo + '" do acervo?')) {
				removerItemDinamico(s);
				location.reload();
			}
		});
	});
}

function configurarFormularioAdicionar() {
	var form = document.getElementById('form-adicionar-pdf');
	var btnAbrir = document.getElementById('btn-adicionar-pdf');
	var btnCancelar = document.getElementById('btn-cancelar-adicao');
	var formContainer = document.getElementById('container-form-adicionar');

	if (!form || !formContainer) return;

	if (btnAbrir) {
		btnAbrir.addEventListener('click', function() {
			formContainer.classList.toggle('form-ativo');
			var estaAtivo = formContainer.classList.contains('form-ativo');
			formContainer.setAttribute('aria-hidden', !estaAtivo);
			if (estaAtivo) {
				formContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
				var primeiroInput = formContainer.querySelector('input');
				if (primeiroInput) setTimeout(function() { primeiroInput.focus(); }, 350);
			}
		});
	}

	if (btnCancelar) {
		btnCancelar.addEventListener('click', function() {
			formContainer.classList.remove('form-ativo');
			formContainer.setAttribute('aria-hidden', 'true');
			form.reset();
		});
	}

	form.addEventListener('submit', function(e) {
		e.preventDefault();

		var titulo = document.getElementById('input-titulo').value.trim();
		var autor = document.getElementById('input-autor').value.trim();
		var categoria = document.getElementById('input-categoria').value;
		var linkPdf = document.getElementById('input-link-pdf').value.trim();
		var totalPaginas = parseInt(document.getElementById('input-total-paginas').value, 10) || 0;
		var linkCapa = document.getElementById('input-link-capa').value.trim();

		if (!titulo || !linkPdf) return;

		var slug = gerarSlug(titulo);

		var item = {
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

		var salvo = salvarItemDinamico(slug, item);
		if (!salvo) return;

		form.reset();
		formContainer.classList.remove('form-ativo');
		formContainer.setAttribute('aria-hidden', 'true');
		location.reload();
	});
}
