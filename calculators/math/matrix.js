document.addEventListener('DOMContentLoaded', function() {
    // Matrix dimension inputs
    const matrix1Rows = document.getElementById('matrix1Rows');
    const matrix1Cols = document.getElementById('matrix1Cols');
    const matrix2Rows = document.getElementById('matrix2Rows');
    const matrix2Cols = document.getElementById('matrix2Cols');
    const detMatrixSize = document.getElementById('detMatrixSize');
    const numEquations = document.getElementById('numEquations');

    // Initialize matrices
    createMatrix('matrix1', 2, 2);
    createMatrix('matrix2', 2, 2);
    createMatrix('detMatrix', 2, 2);
    createEquationSystem(2);

    // Event listeners for dimension changes
    matrix1Rows.addEventListener('change', () => createMatrix('matrix1', matrix1Rows.value, matrix1Cols.value));
    matrix1Cols.addEventListener('change', () => createMatrix('matrix1', matrix1Rows.value, matrix1Cols.value));
    matrix2Rows.addEventListener('change', () => createMatrix('matrix2', matrix2Rows.value, matrix2Cols.value));
    matrix2Cols.addEventListener('change', () => createMatrix('matrix2', matrix2Rows.value, matrix2Cols.value));
    detMatrixSize.addEventListener('change', () => {
        const size = parseInt(detMatrixSize.value);
        createMatrix('detMatrix', size, size);
    });
    numEquations.addEventListener('change', () => createEquationSystem(parseInt(numEquations.value)));
});

// Create matrix HTML structure
function createMatrix(id, rows, cols) {
    const container = document.getElementById(id);
    container.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.className = 'matrix-row';
        
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            const input = document.createElement('input');
            input.type = 'number';
            input.step = 'any';
            input.value = '0';
            cell.appendChild(input);
            row.appendChild(cell);
        }
        
        container.appendChild(row);
    }
}

// Create equation system HTML structure
function createEquationSystem(num) {
    const container = document.getElementById('equationsSystem');
    container.innerHTML = '';

    for (let i = 0; i < num; i++) {
        const equation = document.createElement('div');
        equation.className = 'system-equation';

        for (let j = 0; j < num; j++) {
            const coefficient = document.createElement('div');
            coefficient.className = 'd-flex align-items-center';
            
            const input = document.createElement('input');
            input.type = 'number';
            input.step = 'any';
            input.className = 'form-control matrix-cell';
            input.value = '0';
            input.dataset.row = i;
            input.dataset.col = j;

            coefficient.appendChild(input);
            if (j < num - 1) {
                const variable = document.createElement('span');
                variable.textContent = ` x${j + 1} + `;
                coefficient.appendChild(variable);
            } else {
                const equals = document.createElement('span');
                equals.textContent = ' = ';
                coefficient.appendChild(equals);
            }
            equation.appendChild(coefficient);
        }

        const constant = document.createElement('input');
        constant.type = 'number';
        constant.step = 'any';
        constant.className = 'form-control matrix-cell';
        constant.value = '0';
        constant.dataset.row = i;
        constant.dataset.col = num;
        equation.appendChild(constant);

        container.appendChild(equation);
    }
}

// Get matrix values from inputs
function getMatrixValues(id) {
    const container = document.getElementById(id);
    const rows = container.children.length;
    const cols = container.children[0].children.length;
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = parseFloat(container.children[i].children[j].children[0].value) || 0;
        }
    }

    return matrix;
}

// Display result matrix
function displayMatrix(matrix, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement('div');
        row.className = 'matrix-row';
        
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.textContent = matrix[i][j].toFixed(4);
            row.appendChild(cell);
        }
        
        container.appendChild(row);
    }
}

// Perform matrix operations
function performOperation(operation) {
    const matrix1 = getMatrixValues('matrix1');
    const matrix2 = getMatrixValues('matrix2');
    let result;

    try {
        switch(operation) {
            case 'add':
                result = math.add(matrix1, matrix2);
                break;
            case 'subtract':
                result = math.subtract(matrix1, matrix2);
                break;
            case 'multiply':
                result = math.multiply(matrix1, matrix2);
                break;
        }

        document.getElementById('basicResult').style.display = 'block';
        displayMatrix(result, 'resultMatrix');
    } catch (error) {
        alert('خطأ: ' + error.message);
    }
}

// Calculate determinant
function calculateDeterminant() {
    const matrix = getMatrixValues('detMatrix');
    try {
        const det = math.det(matrix);
        document.getElementById('detResult').style.display = 'block';
        document.getElementById('detValue').innerHTML = `<strong>المحدد:</strong> ${det.toFixed(4)}`;
    } catch (error) {
        alert('خطأ: ' + error.message);
    }
}

// Calculate inverse
function calculateInverse() {
    const matrix = getMatrixValues('detMatrix');
    try {
        const inverse = math.inv(matrix);
        document.getElementById('detResult').style.display = 'block';
        displayMatrix(inverse, 'inverseMatrix');
    } catch (error) {
        alert('خطأ: ' + error.message);
    }
}

// Solve system of equations
function solveSystem() {
    const n = parseInt(numEquations.value);
    const coefficients = [];
    const constants = [];

    // Get coefficients and constants
    for (let i = 0; i < n; i++) {
        coefficients[i] = [];
        for (let j = 0; j < n; j++) {
            const input = document.querySelector(`input[data-row="${i}"][data-col="${j}"]`);
            coefficients[i][j] = parseFloat(input.value) || 0;
        }
        const constant = document.querySelector(`input[data-row="${i}"][data-col="${n}"]`);
        constants[i] = parseFloat(constant.value) || 0;
    }

    try {
        // Solve using math.js
        const solution = math.lusolve(coefficients, constants);
        
        // Display results
        document.getElementById('systemResult').style.display = 'block';
        let solutionHTML = '<div class="mb-3">';
        for (let i = 0; i < solution.length; i++) {
            solutionHTML += `<div>x<sub>${i + 1}</sub> = ${solution[i][0].toFixed(4)}</div>`;
        }
        solutionHTML += '</div>';
        document.getElementById('systemSolution').innerHTML = solutionHTML;
    } catch (error) {
        alert('خطأ: ' + error.message);
    }
}
