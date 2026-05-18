const notificacaoLixeira = document.getElementById("notificacaoLixeira");
const inputNovaTarefa = document.getElementById("novaTarefaUsuario");
const botaoLimparInputNovaTarefa = document.getElementById("divInputNovaTarefa").querySelector("button");
const botaoAdicionarTarefa = document.getElementById("botaoAdicionarTarefa");
const botaoLimparTarefas = document.getElementById("botaoLimparTarefas");
const spanMensagemExitoErro = document.getElementById("containerMensagensExitoErro").querySelector("span");
const containerItensTarefa = document.getElementById("containerItensTarefa");
const textoListaVazia = containerItensTarefa.querySelector("span");

botaoAdicionarTarefa.addEventListener("click", () => {
    const IDtarefaNova = crypto.randomUUID();
    const dadosTarefa = adicionarTarefaPrincipal(IDtarefaNova, prioridadeProximaTarefa, inputNovaTarefa.value);

    if(dadosTarefa) {
        prioridadeProximaTarefa++;

        spanMensagemExitoErro.classList.remove("mensagemErro");
        spanMensagemExitoErro.classList.add("mensagemExito");
        spanMensagemExitoErro.textContent = "Tarefa adicionada com sucesso!!!";
        setTimeout(() => {
            spanMensagemExitoErro.textContent = "";
        }, 3000);

        adicionarDadosListaPrincipal(dadosTarefa[0], dadosTarefa[1], dadosTarefa[2]);
    }
});

inputNovaTarefa.addEventListener("keydown", (event) => {
    if(event.key === 'Enter') {
        const IDtarefaNova = crypto.randomUUID();
        const dadosTarefa = adicionarTarefaPrincipal(IDtarefaNova, prioridadeProximaTarefa, inputNovaTarefa.value);

        if(dadosTarefa) {
            prioridadeProximaTarefa++;

            spanMensagemExitoErro.classList.remove("mensagemErro");
            spanMensagemExitoErro.classList.add("mensagemExito");
            spanMensagemExitoErro.textContent = "Tarefa adicionada com sucesso!!!";
            setTimeout(() => {
                spanMensagemExitoErro.textContent = "";
            }, 3000);

            adicionarDadosListaPrincipal(dadosTarefa[0], dadosTarefa[1], dadosTarefa[2]);
        }
    }
});

botaoLimparInputNovaTarefa.addEventListener("click", () => {
    limparInput(inputNovaTarefa);
});

botaoLimparTarefas.addEventListener("click", () => {
    limparTarefas();
    atualizarContadorLixeira();
});

function adicionarTarefaPrincipal(IDtarefa, prioridadeTarefa, textoTarefa) {
    if(textoTarefa.trim().length === 0) {
        spanMensagemExitoErro.classList.add("mensagemErro");
        spanMensagemExitoErro.textContent = "Não envie um texto vazio!!!";
        setTimeout(() => {
            spanMensagemExitoErro.textContent = "";
        }, 3000);
    } else {
        spanMensagemExitoErro.classList.remove("mensagemErro");
        spanMensagemExitoErro.textContent = "";

        const itemTarefa = document.createElement("article");
        const spanPosicaoTarefa = document.createElement("span");
        const spanTextoTarefa = document.createElement("span");
        const divTextosTarefa = document.createElement("div");
        const divBotoesItemTarefa = document.createElement("div");
        const botaoHierarquizarTarefa = document.createElement("button");
        const iconeBotaoHierarquizarTarefa = document.createElement("i");
        const botaoEditarTarefa = document.createElement("button");
        const iconeBotaoEditarTarefa = document.createElement("i");
        const botaoLimparTarefa = document.createElement("button");
        const iconeBotaoLimparTarefa = document.createElement("i");
        const caixaCheckboxImpressao = document.createElement("div");

        if(tarefas.listaPrincipal.length >= 0) {
            textoListaVazia.style.display = "none";
            containerItensTarefa.style.justifyContent = "flex-start";
        }

        spanPosicaoTarefa.dataset.js = "posicaoTarefa";
        spanTextoTarefa.dataset.js = "textoTarefa";
        spanPosicaoTarefa.textContent = prioridadeTarefa + ".";
        spanTextoTarefa.textContent = textoTarefa;

        itemTarefa.classList.add("itemTarefa");
        itemTarefa.dataset.id = IDtarefa; 
        divTextosTarefa.classList.add("textosTarefa");
        divBotoesItemTarefa.classList.add("botoesItemTarefa");

        botaoHierarquizarTarefa.classList.add("botaoOpcaoItemTarefa", "botaoHierarquiaTarefa");
        botaoHierarquizarTarefa.setAttribute("data-tooltip", "Hierarquizar");
        botaoHierarquizarTarefa.addEventListener("click", () => {
            editarHierarquiaTarefa();

            spanMensagemExitoErro.classList.add("mensagemExito");
            spanMensagemExitoErro.textContent = "Tarefa hierarquizada com sucesso!!!";
            setTimeout(() => {
                spanMensagemExitoErro.textContent = "";
            }, 3000);
        });
        iconeBotaoHierarquizarTarefa.classList.add("fa-solid", "fa-list-ol", "fa-lg");

        botaoEditarTarefa.classList.add("botaoOpcaoItemTarefa", "botaoEditarTarefa");
        botaoEditarTarefa.setAttribute("data-tooltip", "Editar");
        iconeBotaoEditarTarefa.classList.add("fa-solid", "fa-pen-to-square", "fa-lg");

        botaoLimparTarefa.classList.add("botaoOpcaoItemTarefa", "botaoLimparTarefa");
        botaoLimparTarefa.setAttribute("data-tooltip", "Limpar");
        botaoLimparTarefa.addEventListener("click", () => {
            limparTarefa(itemTarefa);
            atualizarContadorLixeira();

            spanMensagemExitoErro.classList.add("mensagemExito");
            spanMensagemExitoErro.textContent = "Tarefa limpada com sucesso!!!";
            setTimeout(() => {
                spanMensagemExitoErro.textContent = "";
            }, 3000);
        });
        iconeBotaoLimparTarefa.classList.add("fa-solid", "fa-trash", "fa-lg");

        caixaCheckboxImpressao.classList.add("caixaCheckImpressao");

        botaoHierarquizarTarefa.append(iconeBotaoHierarquizarTarefa);
        botaoEditarTarefa.append(iconeBotaoEditarTarefa);
        botaoLimparTarefa.append(iconeBotaoLimparTarefa);

        divTextosTarefa.append(spanPosicaoTarefa, spanTextoTarefa);
        divBotoesItemTarefa.append(botaoHierarquizarTarefa, botaoEditarTarefa, botaoLimparTarefa);
        itemTarefa.append(divTextosTarefa, divBotoesItemTarefa, caixaCheckboxImpressao);

        containerItensTarefa.append(itemTarefa);

        inputNovaTarefa.value = "";
        inputNovaTarefa.focus();

        return [itemTarefa.dataset.id, prioridadeTarefa, textoTarefa];
    }
}

function editarHierarquiaTarefa() {

}

function ordenarPorPrioridade() {
    let contPrioridade = 1;
    const itensTarefaListaPrincipal = Array.from(containerItensTarefa.querySelectorAll("article"));

    itensTarefaListaPrincipal.forEach(tarefa => {
        tarefa.remove();
    });
    tarefas.listaPrincipal.sort((a, b) => a.prioridade - b.prioridade);
    tarefas.listaPrincipal.forEach(tarefa => {
        tarefa.prioridade = contPrioridade;
        contPrioridade++;
    });
    prioridadeProximaTarefa = tarefas.listaPrincipal.length + 1;

    renderizarTarefasPrincipais();
}

function editarTextoTarefa() {
    
}

function limparTarefas() {
    const itensTarefaListaPrincipal = Array.from(containerItensTarefa.querySelectorAll("article"));
    const tarefasVisiveis = [];

    itensTarefaListaPrincipal.forEach(itemTarefa => {
        if(itemTarefa.style.display !== "none") {
            tarefasVisiveis.push(itemTarefa);
        }
    });

    if(tarefasVisiveis.length !== 0) {
        tarefasVisiveis.forEach(itemTarefa => {
            limparTarefa(itemTarefa);
        });

        spanMensagemExitoErro.classList.remove("mensagemErro");
        spanMensagemExitoErro.classList.add("mensagemExito");
        spanMensagemExitoErro.textContent = "Tarefas limpadas com sucesso!!!";
        setTimeout(() => {
            spanMensagemExitoErro.textContent = "";
        }, 3000);
    } else {
        spanMensagemExitoErro.classList.remove("mensagemExito");
        spanMensagemExitoErro.classList.add("mensagemErro");
        spanMensagemExitoErro.textContent = "Não há tarefas para limpar!!!";
        setTimeout(() => {
            spanMensagemExitoErro.textContent = "";
        }, 3000);
    }
}

function limparTarefa(itemTarefa) {
    const indiceTarefaLimpada = tarefas.listaPrincipal.findIndex(tarefa => tarefa.ID === itemTarefa.dataset.id);

    itemTarefa.remove();
    tarefas.listaPrincipal.splice(indiceTarefaLimpada, 1);

    if(tarefas.listaPrincipal.length === 0) {
        textoListaVazia.style.display = "flex";
        containerItensTarefa.style.justifyContent = "center";
    }

    adicionarDadosLixeira(itemTarefa.dataset.id, itemTarefa.querySelector('div > [data-js="textoTarefa"]').textContent);

    ordenarPorPrioridade();
}
