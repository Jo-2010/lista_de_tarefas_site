const botaoTema = document.getElementById("botaoTema");
const iconeBotaoTema = botaoTema.querySelector("i");

if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.style.transition = "none";
    document.body.classList.add("temaEscuro");
    void document.body.offsetWidth;
    iconeBotaoTema.classList.remove("fa-moon");
    iconeBotaoTema.classList.add("fa-sun");
}

botaoTema.addEventListener("click", () => {
    if(document.body.classList.contains("temaEscuro")) {
        document.body.style.transition = "0.3s";
        document.body.classList.remove("temaEscuro");
        document.body.classList.add("temaClaro");
        iconeBotaoTema.classList.remove("fa-sun");
        iconeBotaoTema.classList.add("fa-moon");
    } else {
        document.body.style.transition = "0.3s";
        document.body.classList.remove("temaClaro");
        document.body.classList.add("temaEscuro");
        iconeBotaoTema.classList.remove("fa-moon");
        iconeBotaoTema.classList.add("fa-sun");
    }
});