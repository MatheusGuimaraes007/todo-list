import getDOM from './getDOM.js';

//Pegando as informações
const nameUser = getDOM('nameUser');
const nameTarefa = getDOM('nameTarefa');
const date = getDOM('date');
const hours = getDOM('hours');
const important = getDOM('important');
const btnEnviarTarefa = getDOM('enviarTarefa');

//Passando as Informações
const tarefas = getDOM('tarefas');
const containerTarefas = getDOM('container-tarefas');

let valuesList = [];

function inserirItem(event) {
  event.preventDefault();
  if (
    nameUser.value === '' ||
    nameTarefa.value === '' ||
    date.value === '' ||
    hours.value === ''
  ) {
    alert('Preencha todos os campos');
  } else {
    valuesList.push({
      nameUserValue: nameUser.value,
      nameTarefaValue: nameTarefa.value,
      dateValue: date.value,
      hoursValue: hours.value,
      importantValue: important.value,
    });
    atualizar();
  }
}

const newItem = (nameUser, nameTarefa, date, hours, important, indice) => {
  const item = document.createElement('div');
  item.classList.add('container-lista');
  item.id = +indice;
  item.innerHTML = `
  <span class="classificacao">Nome:</span>
  <span id="nomeRealizar">${nameUser}</span>
  <span class="classificacao">Tarefa:</span>
  <span id="nomeTarefa">${nameTarefa}</span>
  <span class="classificacao">Data:</span>
  <span id="dataTarefa">${date.split('-').reverse().join('/')}</span>
  <span class="classificacao">Horário:</span>
  <span id="horarioTarefa">${hours}</span>
  <span id="importante">${
    important === 'importante' ? 'Importante' : 'Muito Importante'
  }</span>
  <div id="containet-button">
  <button id="btnExcluir" data-indice="${indice}">Excluir</button>
  <button id="btnFeito" data-indice="${indice}">Feito</button>
  </div>
  `;
  tarefas.appendChild(item);
};

const limpar = () => {
  while (tarefas.firstChild) {
    tarefas.removeChild(tarefas.lastChild);
  }
};

const atualizar = () => {
  limpar();
  valuesList.forEach((item, index) =>
    newItem(
      item.nameUserValue,
      item.nameTarefaValue,
      item.dateValue,
      item.hoursValue,
      item.importantValue,
      index,
    ),
  );

  nameUser.value = '';
  nameTarefa.value = '';
  date.value = '';
  hours.value = '';
  important.value = '';
};

function excluirTarefa(indice) {
  if (confirm('Tem certeza que deseja excluir essa tarefa?')) {
    valuesList.splice(indice, 1);
    atualizar();
  }
}

function tarefaFeita(indice) {
  const idTarefa = document.getElementById(indice);
  const btnFeito = document.getElementById('btnFeito');
  const importante = document.getElementById('importante');
  idTarefa.style.backgroundColor = '#008000';
  idTarefa.style.border = '3px double green';
  idTarefa.style.color = 'white';
  btnFeito.style.display = 'none';
  importante.innerText = 'Tarefa Concluida!';
  setTimeout(() => {
    idTarefa.style.display = 'none';
  }, 1000);
}

function targetClick(event) {
  const elemento = event.target;
  const valueDataIndice = elemento.dataset.indice;
  if (elemento.innerText === 'Excluir') {
    excluirTarefa(valueDataIndice);
  } else if (elemento.innerText === 'Feito') {
    tarefaFeita(valueDataIndice);
  }
}

btnEnviarTarefa.addEventListener('click', inserirItem);
containerTarefas.addEventListener('click', targetClick);
