function importarProgresso(event) {
  const arquivo = event.target.files[0];
  if (!arquivo) return;

  const leitor = new FileReader();

  leitor.onload = function(e) {
    try {
      const dados = JSON.parse(e.target.result);

      if (dados['acervo-progresso']) {
        localStorage.setItem('acervo-progresso', JSON.stringify(dados['acervo-progresso']));
      }

      if (dados['acervo-itens-dinamicos']) {
        localStorage.setItem('acervo-itens-dinamicos', JSON.stringify(dados['acervo-itens-dinamicos']));
      }

      if (!dados['acervo-progresso'] && !dados['acervo-itens-dinamicos']) {
        alert('Arquivo JSON nao contem dados do acervo.');
        return;
      }

      location.reload();
    } catch (erro) {
      alert('Arquivo JSON invalido. Verifique o formato.');
    }
  };

  leitor.readAsText(arquivo);
  event.target.value = '';
}

function configurarImportar() {
  const input = document.getElementById('input-importar');
  if (input) {
    input.addEventListener('change', importarProgresso);
  }
}
