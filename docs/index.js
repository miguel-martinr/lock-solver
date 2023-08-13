import { parseInput, solveLock } from './switches.js'


const NUM_SWITCHES = 8;

const switches = [];

for (let i = 0; i < NUM_SWITCHES; ++i) {
  const switchEl = document.getElementById(`switch-${i}`);
  switches.push(switchEl);
}


const solveBtn = document.getElementById('solve-btn');

solveBtn.addEventListener('click', onSolve);


function onSolve(ev) {
  ev.preventDefault();
  const inputEl = document.getElementById('solver-input');
  
  const inputStr = inputEl.value;

  if (!inputStr) {
    alert('No hay datos de entrada');
    return;
  }

  const { initialVoltages, expectedVoltages, switches } = parseInput(inputStr);

  updateElementInnerHtml('input-voltage', initialVoltages[0]);
  updateElementInnerHtml('output-voltage-red', expectedVoltages[0]);
  updateElementInnerHtml('output-voltage-blue', expectedVoltages[1]);

  const solution = solveLock(initialVoltages, expectedVoltages, switches);

  if (!solution) {
    alert('No se encontró solución');
    switches.forEach((switchEl, i) => updateSwitch(i, false));
    return;
  }

  solution.forEach((checked, i) => updateSwitch(i, checked));
}

function updateSwitch(index, checked) {
  const switchEl = switches[index];
  switchEl.checked = checked;
}

function updateElementInnerHtml(id, innerHtml) {
  const el = document.getElementById(id);
  el.innerHTML = innerHtml;
}