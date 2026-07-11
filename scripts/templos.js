document.addEventListener("DOMContentLoaded", () => {

    const anoAtualSpan = document.getElementById("anoAtual");
    const ultimaModificacaoP = document.getElementById("ultimaModificacao");

    if (anoAtualSpan) {
        anoAtualSpan.textContent = new Date().getFullYear();
    }

    if (ultimaModificacaoP) {
        const dataModificacao = new Date(document.lastModified);

        const dia = String(dataModificacao.getDate()).padStart(2, '0');
        const mes = String(dataModificacao.getMonth() + 1).padStart(2, '0');
        const anoExibido = String(dataModificacao.getFullYear()).slice(-2);

        // Extrai as horas e minutos garantindo 2 dígitos
        const horas = String(dataModificacao.getHours()).padStart(2, '0');
        const minutos = String(dataModificacao.getMinutes()).padStart(2, '0');

        // Junta tudo no formato: DD/MM/AA HH:MM
        const dataFormatada = `${dia}/${mes}/${anoExibido} ${horas}:${minutos}`;

        ultimaModificacaoP.textContent = `Última Modificação: ${dataFormatada}`;
    }


    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("open");

            if (navMenu.classList.contains("open")) {
                menuToggle.textContent = "✕";
                menuToggle.setAttribute("aria-label", "Fechar menu");
            } else {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-label", "Abrir menu");
            }
        });
    }
});