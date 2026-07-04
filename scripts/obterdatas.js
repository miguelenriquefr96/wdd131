const anoAtualElement = document.getElementById('anoAtual');
if (anoAtualElement) {
    anoAtualElement.textContent = new Date().getFullYear();
}

const ultimaModificacaoElement = document.getElementById('ultimaModificacao');
if (ultimaModificacaoElement) {

    const dataModificacao = new Date(document.lastModified);


    const dataFormatada = dataModificacao.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    ultimaModificacaoElement.textContent = `Última modificação: ${dataFormatada}`;
}