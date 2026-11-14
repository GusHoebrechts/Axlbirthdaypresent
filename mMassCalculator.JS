import { molarMasses } from './molarMasses.js';

export function calculateMolarMassDetails(formula) {
    if (typeof formula !== 'string' || formula.trim() === '') {
        throw new Error('Enter a chemical formula.');
    }

    formula = formula.trim();
    let index = 0;

    function readCount() {
        const start = index;
        while (index < formula.length && formula[index] >= '0' && formula[index] <= '9') {
            index++;
        }

        if (start === index) {
            return 1;
        }

        const count = Number(formula.slice(start, index));
        if (!Number.isSafeInteger(count) || count < 1) {
            throw new Error('Counts must be positive integers.');
        }
        return count;
    }

    function parseGroup() {
        const atomCounts = new Map();
        let hasComponent = false;

        while (index < formula.length && formula[index] !== ')') {
            if (formula[index] === '(') {
                index++;
                const groupCounts = parseGroup();
                if (formula[index] !== ')') {
                    throw new Error('Missing closing parenthesis.');
                }
                index++;
                const multiplier = readCount();
                for (const [element, count] of groupCounts) {
                    atomCounts.set(element, (atomCounts.get(element) || 0) + count * multiplier);
                }
                hasComponent = true;
                continue;
            }

            const elementMatch = formula.slice(index).match(/^[A-Z][a-z]?/);
            if (!elementMatch) {
                throw new Error(`Unexpected character "${formula[index]}" in formula.`);
            }

            const element = elementMatch[0];
            if (!Object.prototype.hasOwnProperty.call(molarMasses, element)) {
                throw new Error(`Unknown element: ${element}.`);
            }

            index += element.length;
            const count = readCount();
            atomCounts.set(element, (atomCounts.get(element) || 0) + count);
            hasComponent = true;
        }

        if (!hasComponent) {
            throw new Error('Empty groups are not valid.');
        }
        return atomCounts;
    }

    const atomCounts = parseGroup();
    if (index < formula.length) {
        throw new Error('Unexpected closing parenthesis.');
    }

    const elements = [];
    let totalMass = 0;
    for (const [atom, count] of atomCounts) {
        const elementMolarMass = molarMasses[atom];
        const subtotalMass = elementMolarMass * count;
        elements.push({ atom, count, elementMolarMass, subtotalMass });
        totalMass += subtotalMass;
    }

    return { elements, totalMass };
}

export function calculateMolarMass(formula) {
    return calculateMolarMassDetails(formula).totalMass;
}
