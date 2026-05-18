function adicionarDadosListaPrincipal(IdTarefa, prioridadeTarefa, textoTarefa) {
    tarefas.listaPrincipal.push({
        ID: IdTarefa,
        texto: textoTarefa.trim(),
        prioridade: prioridadeTarefa
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarDadosLixeira(IdTarefa, textoTarefa) {
    tarefas.lixeira.push({
        ID: IdTarefa,
        texto: textoTarefa.trim()
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function limparInput(input) {
    input.value = "";
    input.focus();
}

function atualizarContadorLixeira() {
    if(tarefas.lixeira.length > 0) {
        notificacaoLixeira.style.display = "flex";
        notificacaoLixeira.textContent = (tarefas.lixeira.length <= 99) ? tarefas.lixeira.length : "99+";
    } else {
        notificacaoLixeira.style.display = "none";
    }
}
