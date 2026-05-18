const tarefas = JSON.parse(localStorage.getItem("tarefas")) || {
    listaPrincipal: [],
    lixeira: []
};
const estados = {
    modoAtual: "listaPrincipal",
    filtroAtual: "",
    editando: false
};
let quantTarefas = tarefas.listaPrincipal.length + 1;

if(tarefas.listaPrincipal.length > 0) {
    renderizarTarefasPrincipais();
}

atualizarContadorLixeira();

function renderizarTarefasPrincipais() {
    for(let i = 0; i < tarefas.listaPrincipal.length; i++) {
        adicionarTarefaPrincipal(tarefas.listaPrincipal[i].prioridade, tarefas.listaPrincipal[i].texto);
    }
}