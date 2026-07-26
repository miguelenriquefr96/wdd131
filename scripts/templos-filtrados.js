const templos = [
    {
        nomeDoTemplo: "Aba Nigeria",
        localizacao: "Aba, Nigéria",
        consagracao: "2005, 7 de agosto",
        area: 11500,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        nomeDoTemplo: "Manti Utah",
        localizacao: "Manti, Utah, Estados Unidos",
        consagracao: "1888, 21 de maio",
        area: 74792,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        nomeDoTemplo: "Payson Utah",
        localizacao: "Payson, Utah, Estados Unidos",
        consagracao: "2015, 7 de junho",
        area: 96630,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        nomeDoTemplo: "Yigo Guam",
        localizacao: "Yigo, Guam",
        consagracao: "2020, 2 de maio",
        area: 6861,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        nomeDoTemplo: "Washington D.C.",
        localizacao: "Kensington, Maryland, Estados Unidos",
        consagracao: "1974, 19 de novembro",
        area: 156558,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        nomeDoTemplo: "Lima Peru",
        localizacao: "Lima, Peru",
        consagracao: "1986, 10 de janeiro",
        area: 9600,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        nomeDoTemplo: "Cidade do México, México",
        localizacao: "Cidade do México, México",
        consagracao: "1983, 2 de dezembro",
        area: 116642,
        urlDaImagem:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        nomeDoTemplo: "Curitiba Brasil",
        localizacao: "Curitiba, Paraná, Brasil",
        consagracao: "2008, 1 de junho",
        area: 27850,
        urlDaImagem:
            "https://www.churchofjesuschrist.org/imgs/ea7e0f39c8e26d163a4dfedfcb1ce5c41d650b5b/full/640%2C/0/default"
    },
    {
        nomeDoTemplo: "Roma Itália",
        localizacao: "Roma, Itália",
        consagracao: "2019, 10 de março",
        area: 41010,
        urlDaImagem:
            "https://www.churchofjesuschrist.org/imgs/17e2c70d687fffedfe115197e57fa8f5d1d369bb/full/640%2C/0/default"
    },
    {
        nomeDoTemplo: "Tóquio Japão",
        localizacao: "Tóquio, Japão",
        consagracao: "1980, 27 de outubro",
        area: 53779,
        urlDaImagem:
            "https://www.churchofjesuschrist.org/imgs/df6b96801c9f11ec99eeeeeeac1ea2207e7c517b/full/800%2C/0/default"
    }
];

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
        const horas = String(dataModificacao.getHours()).padStart(2, '0');
        const minutos = String(dataModificacao.getMinutes()).padStart(2, '0');

        ultimaModificacaoP.textContent = `Última Modificação: ${dia}/${mes}/${anoExibido} ${horas}:${minutos}`;
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

    criarCartoesTemplos(templos);

    const linksNav = document.querySelectorAll("#nav-menu a");
    const tituloPagina = document.querySelector("main h1");

    linksNav.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const opcao = link.textContent.trim();
            if (tituloPagina) tituloPagina.textContent = opcao;

            switch (opcao) {
                case "Antigo":
                    const antigos = templos.filter(templo => extrairAno(templo.consagracao) < 1900);
                    criarCartoesTemplos(antigos);
                    break;

                case "Novo":
                    const novos = templos.filter(templo => extrairAno(templo.consagracao) > 2000);
                    criarCartoesTemplos(novos);
                    break;

                case "Grande":
                    const grandes = templos.filter(templo => templo.area > 90000);
                    criarCartoesTemplos(grandes);
                    break;

                case "Pequeno":
                    const pequenos = templos.filter(templo => templo.area < 10000);
                    criarCartoesTemplos(pequenos);
                    break;

                default:
                    criarCartoesTemplos(templos);
                    break;
            }

            if (navMenu && navMenu.classList.contains("open")) {
                navMenu.classList.remove("open");
                if (menuToggle) menuToggle.textContent = "☰";
            }
        });
    });
});


function extrairAno(stringData) {
    return parseInt(stringData.split(",")[0].trim());
}

function criarCartoesTemplos(listaDeTemplos) {
    const container = document.querySelector(".galeria-grid");

    if (!container) return;

    container.innerHTML = "";

    listaDeTemplos.forEach(templo => {
        const card = document.createElement("figure");
        card.classList.add("templo-card");

        card.innerHTML = `
            <h2>${templo.nomeDoTemplo}</h2>
            <p><span class="label">LOCALIZAÇÃO:</span> ${templo.localizacao}</p>
            <p><span class="label">DEDICADO:</span> ${templo.consagracao}</p>
            <p><span class="label">TAMANHO:</span> ${templo.area.toLocaleString()} sq ft</p>
            <img 
                src="${templo.urlDaImagem}" 
                alt="Templo de ${templo.nomeDoTemplo}" 
                loading="lazy" 
                width="400" 
                height="250"
            >
        `;

        container.appendChild(card);
    });
}