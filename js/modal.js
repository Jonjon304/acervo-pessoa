const CHAVE_PROGRESSO = 'acervo-progresso';

function abrirModal(slug, titulo, totalPaginas) {
  const overlay = document.getElementById('modal-progresso');
  if (!overlay) return;

  const tituloEl = overlay.querySelector('.modal-livro');
  const inputEl = overlay.querySelector('#input-pagina');
  const totalEl = overlay.querySelector('.modal-total');

  if (tituloEl) tituloEl.textContent = titulo;
  if (inputEl) {
    inputEl.max = totalPaginas || 9999;
    inputEl.value = '';

    const progresso = JSON.parse(localStorage.getItem(CHAVE_PROGRESSO) || '{}');
    if (progresso[slug]) {
      inputEl.value = progresso[slug].paginaAtual || '';
    }
  }
  if (totalEl) totalEl.textContent = totalPaginas ? ('de ' + totalPaginas) : '';

  overlay.classList.add('modal-ativo');
  overlay.setAttribute('aria-hidden', 'false');

  if (inputEl) inputEl.focus();
}

function fecharModal() {
  const overlay = document.getElementById('modal-progresso');
  if (!overlay) return;

  overlay.classList.remove('modal-ativo');
  overlay.setAttribute('aria-hidden', 'true');
}

function configurarModal(slug, titulo, totalPaginas, urlBase) {
  const overlay = document.getElementById('modal-progresso');
  if (!overlay) return;

  const btnSalvar = overlay.querySelector('#modal-salvar');
  const btnCancelar = overlay.querySelector('#modal-cancelar');
  const inputEl = overlay.querySelector('#input-pagina');

  if (btnSalvar) {
    btnSalvar.onclick = function() {
      const pagina = parseInt(inputEl.value, 10);

      if (isNaN(pagina) || pagina < 0) {
        inputEl.style.borderColor = '#e94560';
        return;
      }

      if (typeof salvarProgresso === 'function') {
        const resultado = salvarProgresso(slug, pagina, totalPaginas);

        if (typeof renderizarBarraProgresso === 'function') {
          renderizarBarraProgresso(
            document.querySelector('.progresso'),
            pagina,
            totalPaginas
          );
        }

        if (typeof atualizarLinkContinuar === 'function') {
          atualizarLinkContinuar(
            document.querySelector('.link-continuar'),
            urlBase,
            pagina
          );
        }

        if (typeof atualizarStatusBadge === 'function') {
          atualizarStatusBadge(
            document.querySelector('.status-item'),
            resultado.status
          );
        }
      }

      fecharModal();
    };
  }

  if (btnCancelar) {
    btnCancelar.onclick = fecharModal;
  }

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) fecharModal();
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fecharModal();
  });

  if (inputEl) {
    inputEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (btnSalvar) btnSalvar.click();
      }
    });
  }
}
