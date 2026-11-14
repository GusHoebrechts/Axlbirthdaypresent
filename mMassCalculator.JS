import { molarMasses } from './molarmasses.JS';

export function calculateMolarMass(formula) {
    let totalMass = 0;
    const elementRegex = /([A-Z][a-z]*)(\d*)/g;
    let match;

        while ((match = elementRegex.exec(formula)) !== null) {
            const element = match[1];
            const count = parseInt(match[2]) || 1;
            if (Object.prototype.hasOwnProperty.call(molarMasses, element)) {
                totalMass += molarMasses[element] * count;
            }
        }

    return totalMass;
}

