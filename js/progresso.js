const CHAVE_PROGRESSO = 'acervo-progresso';

function lerProgresso() {
  const dados = localStorage.getItem(CHAVE_PROGRESSO);
  return dados ? JSON.parse(dados) : {};
}

function lerProgressoItem(slug) {
  const progresso = lerProgresso();
  return progresso[slug] || null;
}

function salvarProgresso(slug, paginaAtual, totalPaginas, status) {
  const progresso = lerProgresso();

  if (!status) {
    if (paginaAtual <= 0) {
      status = 'quero-ler';
    } else if (paginaAtual >= totalPaginas) {
      status = 'lido';
    } else {
      status = 'lendo';
    }
  }

  progresso[slug] = {
    paginaAtual: paginaAtual,
    totalPaginas: totalPaginas,
    status: status,
    dataAtualizacao: new Date().toISOString().split('T')[0]
  };

  localStorage.setItem(CHAVE_PROGRESSO, JSON.stringify(progresso));
  return progresso[slug];
}

function calcularPorcentagem(paginaAtual, totalPaginas) {
  if (!totalPaginas || totalPaginas <= 0) return 0;
  return Math.round((paginaAtual / totalPaginas) * 100);
}

function classeProgresso(porcentagem) {
  if (porcentagem >= 76) return 'progresso-100';
  if (porcentagem >= 51) return 'progresso-75';
  if (porcentagem >= 26) return 'progresso-50';
  if (porcentagem >= 1) return 'progresso-25';
  return 'progresso-0';
}

function renderizarBarraProgresso(elemento, paginaAtual, totalPaginas) {
  if (!elemento) return;

  const porcentagem = calcularPorcentagem(paginaAtual, totalPaginas);
  const classe = classeProgresso(porcentagem);

  elemento.className = 'progresso ' + classe;
  elemento.setAttribute('aria-valuenow', porcentagem);
  elemento.setAttribute('aria-label', porcentagem + '% lido');

  const label = elemento.parentElement.querySelector('.progresso-texto');
  if (label) {
    label.textContent = porcentagem + '%';
  }

  const paginaLabel = elemento.parentElement.querySelector('.pagina-atual');
  if (paginaLabel && totalPaginas) {
    paginaLabel.textContent = 'pag. ' + paginaAtual + ' de ' + totalPaginas;
  }
}

function atualizarLinkContinuar(linkElement, urlBase, paginaAtual) {
  if (!linkElement) return;

  if (paginaAtual && paginaAtual > 0) {
    linkElement.href = urlBase + '#page=' + paginaAtual;
    linkElement.textContent = 'Continuar da pagina ' + paginaAtual;
    linkElement.style.display = '';
  } else {
    linkElement.href = urlBase;
    linkElement.textContent = 'Ler do inicio';
    linkElement.style.display = '';
  }
}

function atualizarStatusBadge(elemento, status) {
  if (!elemento) return;

  elemento.className = 'status';

  if (status === 'lido') {
    elemento.classList.add('status-lido');
    elemento.textContent = 'Lido';
  } else if (status === 'lendo') {
    elemento.classList.add('status-lendo');
    elemento.textContent = 'Lendo';
  } else {
    elemento.classList.add('status-quero-ler');
    elemento.textContent = 'Quero Ler';
  }
}

function inicializarProgressoPagina(slug, urlBase, totalPaginas) {
  const dados = lerProgressoItem(slug);

  if (dados) {
    renderizarBarraProgresso(
      document.querySelector('.progresso'),
      dados.paginaAtual,
      dados.totalPaginas
    );
    atualizarLinkContinuar(
      document.querySelector('.link-continuar'),
      urlBase,
      dados.paginaAtual
    );
    atualizarStatusBadge(
      document.querySelector('.status-item'),
      dados.status
    );
  }
}
