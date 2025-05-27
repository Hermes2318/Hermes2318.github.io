function appendValue(value) {
  const display = document.getElementById('display');
  display.value += value;
}

function clearDisplay() {
  document.getElementById('display').value = '';
}

function deleteLast() {
  const display = document.getElementById('display');
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  const display = document.getElementById('display');
  let expression = display.value;

  try {
    // Reemplazar '^' por ** para potencia en JS
    expression = expression.replace(/(\d+)\^(\d+)/g, 'Math.pow($1,$2)');
    
    // Para casos múltiples o anidados, reemplazamos todos los ^:
    expression = expression.replace(/\^/g, '**');

    // Evaluar la expresión
    const result = eval(expression);
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}
