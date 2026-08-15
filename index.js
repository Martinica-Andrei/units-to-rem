const $ = document.querySelector.bind(document);
const inputElement = $("#input");
inputElement.value = "";
const displayConversion = $("#display-conversion");
const unitSelector = $("#unit-selector");

const convert = () => {
    const str = inputElement.value;
    const units = [...matchAllUnits(str)];
    if (units.length === 0) {
        displayConversion.innerText = str;
        return;
    }

    const numbers = convertUnitsToNumbers(units);
    const rem = convertNumbersToRem(numbers);

    let parsedString = replaceUnitsInString(str, units, rem);
    displayConversion.innerText = parsedString;
    navigator.clipboard.writeText(parsedString);
}

const matchAllUnits = (str) => {
    const re = /((\d+(\.\d+)?)(px)?)([\s,.;\/]|$)/gu;
    return str.matchAll(re);
}

const convertUnitsToNumbers = (units) => {
    return units.map(v => +v[2]);
}

const convertNumbersToRem = (numbers) => {
    return numbers.map(v => {
        if (v === 0) {
            return "0";
        }
        v = v / 16;
        v = v.toFixed(4)
            .replace(/(-?\d*\.[1-9]*)(0*)/, "$1") // ends with zeroes   
            .replace(/(-?\d*)(\.)$/, "$1") // ends in dot
        return v + unitSelector.value;
    });
}

const replaceUnitsInString = (str, units, newValues) => {
    const result = [];

    let unitIndex = 0;
    for (let i = 0; i < str.length; i++) {
        if (unitIndex >= units.length || units[unitIndex].index > i) {
            result.push(str[i]);
            continue;
        }

        result.push(...newValues[unitIndex]);
        i += units[unitIndex][1].length - 1;
        unitIndex++;
    }

    return result.join("");
}