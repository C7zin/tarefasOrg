const button = document.querySelector(".button-add-task");
const input = document.querySelector(".input-task");
const listaCompleta = document.querySelector(".list-tasks");

let minhaListaDeItens = [];

// Função para adicionar uma nova tarefa
function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
    favoritada: false, // Propriedade de favoritada
  });

  input.value = "";

  mostrarTarefas();
}

// Função para mostrar todas as tarefas na lista
function mostrarTarefas() {
  // Ordena os itens, colocando os favoritados no topo
  minhaListaDeItens.sort((a, b) => b.favoritada - a.favoritada);

  let novaLi = "";

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi += `
      <li class="task ${item.concluida && "done"} ${
      item.favoritada && "favorite"
    }">
        <!-- Ícone de favorito -->
        <img 
          src="${(item.favoritada, "./img/favicon.png")}" 
          alt="fav-na-tarefa" 
          onclick="favoritarTarefa(${posicao})"
        >
        <p>${item.tarefa}</p>
        <img 
          src="./img/checked.png" 
          alt="check-na-tarefa" 
          onclick="concluirTarefa(${posicao})"
        >
        <img 
          src="./img/trash.png" 
          alt="tarefa-para-o-lixo" 
          onclick="deletarItem(${posicao})"
        >
      </li>
    `;
  });

  listaCompleta.innerHTML = novaLi;

  localStorage.setItem("lista", JSON.stringify(minhaListaDeItens));
}

// Função para concluir uma tarefa
function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
  mostrarTarefas();
}

// Função para excluir uma tarefa
function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1);
  mostrarTarefas();
}

// Função para favoritar ou desfavoritar uma tarefa
function favoritarTarefa(posicao) {
  minhaListaDeItens[posicao].favoritada =
    !minhaListaDeItens[posicao].favoritada;
  mostrarTarefas();
}

// Função para recarregar as tarefas do localStorage
function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem("lista");

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
  }

  mostrarTarefas();
}

recarregarTarefas();
button.addEventListener("click", adicionarNovaTarefa);
