const divFather = document.querySelector('#color-palette');
const btn = document.querySelector('#clear-board');
const titulo = document.getElementById('title');
const botao = document.querySelector('#generate-board');
const input = document.querySelector('#board-size');
const quadro = document.querySelector('#pixel-board');

function createPalete() {
  for (let index = 1; index <= 10; index += 1) {
    const div = document.createElement('div');
    div.className = 'color';
    divFather.appendChild(div);
  }
}
createPalete();

function randomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function colors() {
  const divs = document.querySelectorAll('.color');
  divs.forEach((div, ind) => {
    if (ind === 0) {
      divs[ind].style.backgroundColor = 'black';
    } else {
      divs[ind].style.backgroundColor = randomColor();
    }
  });
}
colors();

function selectFirstColor() {
  const div1 = document.querySelectorAll('.color')[0];
  div1.classList.add('selected');
}
selectFirstColor();

const cores = document.querySelectorAll('.color');
let selecta = '';

function selectColor(event) {
  selecta = event.target;
  for (let cor = 0; cor < cores.length; cor += 1) {
    cores[cor].classList.remove('selected');
  }
  selecta.classList.add('selected');
}

divFather.addEventListener('click', selectColor);

function fillPixels(event) {
  const quadrado = event.target;
  const primeira = document.querySelector('.selected');
  if (quadrado.style.backgroundColor === 'white') {
    quadrado.style.backgroundColor = primeira.style.backgroundColor;
  } else {
    quadrado.style.backgroundColor = selecta.style.backgroundColor;
  }
}

quadro.addEventListener('click', fillPixels);

function clear() {
  const quadrados = document.querySelectorAll('.pixel');
  for (let square = 0; square < quadrados.length; square += 1) {
    quadrados[square].style.backgroundColor = 'white';
  }
}

btn.addEventListener('click', clear);

function clearBox() {
  const board = document.querySelectorAll('.pixel');
  for (let pix = 0; pix < board.length; pix += 1) {
    board[pix].remove();
  }
}

function createLines(number, line) {
  for (let index2 = 0; index2 < number; index2 += 1) {
    const colorBox = document.createElement('div');
    colorBox.className = 'pixel';
    if (number <= 25) {
      colorBox.style.width = '40px';
      colorBox.style.height = '40px';
    } else {
      colorBox.style.width = '25px';
      colorBox.style.height = '25px';
    }
    line.appendChild(colorBox);
  }
}

function verifyInput(num) {
  let resultado;
  if (num < 1) {
    resultado = alert('Board inválido!');
  } else if (num < 5) {
    resultado = 5;
    clearBox();
  } else if (num > 50) {
    resultado = 50;
    clearBox();
  } else {
    resultado = num;
    clearBox();
  }
  return resultado;
}

function createNewBoard(number) {
  let numero;
  if (number === undefined) {
    numero = 5;
  } else {
    numero = verifyInput(number.value);
  }
  for (let index = 0; index < numero; index += 1) {
    const linhas = document.createElement('div');
    createLines(numero, linhas);
    quadro.appendChild(linhas);
  }
  quadro.style.width = `${numero * 42}px`;
}

botao.addEventListener('click', () => createNewBoard(input));

createNewBoard();

function titleColor() {
  titulo.style.color = randomColor();
}

titulo.addEventListener('mouseover', titleColor);
titulo.addEventListener('mouseout', titleColor);
