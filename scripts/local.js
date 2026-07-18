document.addEventListener("DOMContentLoaded", () => {


    const creditosParagrafo = document.querySelector(".footer-credits p:not(.modified-date)");
    if (creditosParagrafo) {
        creditosParagrafo.innerHTML = `&copy; ${new Date().getFullYear()} - Miguel Enrique Fernandez Rodriguez - Venezuela`;
    }

    const modificacaoElemento = document.querySelector(".modified-date");
    if (modificacaoElemento) {
        const ultimaData = new Date(document.lastModified);
        const dia = String(ultimaData.getDate()).padStart(2, '0');
        const mes = String(ultimaData.getMonth() + 1).padStart(2, '0');
        const ano = String(ultimaData.getFullYear()).slice(-2);
        modificacaoElemento.textContent = `Última Modificação: ${dia}/${mes}/${ano}`;
    }



    const temperaturaEstatica = 26;
    const ventoEstatico = 12;


    const campoTemp = document.getElementById("html-temperatura");
    const campoVento = document.getElementById("html-vento");
    const campoSensacao = document.getElementById("html-sensacao");


    if (campoTemp) campoTemp.textContent = `${temperaturaEstatica} °C`;
    if (campoVento) campoVento.textContent = `${ventoEstatico} km/h`;


    if (campoSensacao) {
        if (temperaturaEstatica <= 10 && ventoEstatico > 4.8) {
            const resultado = calcularSensacaoTermica(temperaturaEstatica, ventoEstatico);
            campoSensacao.textContent = `${resultado.toFixed(1)} °C`;
        } else {

            campoSensacao.textContent = "N/A";
        }
    }
});


function calcularSensacaoTermica(t, v) {
    return 13.12 + (0.6215 * t) - (11.37 * Math.pow(v, 0.16)) + (0.3965 * t * Math.pow(v, 0.16));
}