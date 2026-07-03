const anoAtualElement = document.getElementById('anoAtual');
if (anoAtualElement) {
    anoAtualElement.textContent = new Date().getFullYear();
}

const ultimaModificacaoElement = document.getElementById('ultimaModificacao');
if (ultimaModificacaoElement) {
    ultimaModificacaoElement.textContent = `Última modificação: ${document.lastModified}`;
}