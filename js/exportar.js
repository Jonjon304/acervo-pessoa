function exportarProgresso() {
  const progresso = localStorage.getItem('acervo-progresso');
  const itensDinamicos = localStorage.getItem('acervo-itens-dinamicos');

  const dados = {};

  if (progresso) {
    dados['acervo-progresso'] = JSON.parse(progresso);
  }

  if (itensDinamicos) {
    dados['acervo-itens-dinamicos'] = JSON.parse(itensDinamicos);
  }

  if (Object.keys(dados).length === 0) {
    alert('Nenhum progresso ou item para exportar.');
    return;
  }

  const json = JSON.stringify(dados, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'acervo-progresso.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function configurarExportar() {
  const btn = document.getElementById('btn-exportar');
  if (btn) {
    btn.addEventListener('click', exportarProgresso);
  }
}
