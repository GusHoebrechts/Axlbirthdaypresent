import { calculateMolarMassDetails } from './mMassCalculator.JS';

const formulaInput = document.getElementById('ChemicalFormulaField');
const elementRows = document.getElementById('ElementRows');
const resultField = document.getElementById('MolarMassResult');

formulaInput.addEventListener('input', () => {
    elementRows.replaceChildren();
    resultField.value = '';

    if (formulaInput.value.trim() === '') {
        return;
    }

    try {
        const result = calculateMolarMassDetails(formulaInput.value);
        for (const element of result.elements) {
            const row = document.createElement('tr');
            const values = [
                element.count,
                element.atom,
                element.elementMolarMass.toFixed(2),
                element.subtotalMass.toFixed(2)
            ];

            for (const value of values) {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.append(cell);
            }
            elementRows.append(row);
        }

        resultField.value = result.totalMass.toFixed(2);
    } catch (error) {
        resultField.value = error instanceof Error ? error.message : 'Invalid formula.';
    }
});