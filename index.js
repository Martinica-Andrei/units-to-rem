const $ = document.querySelector.bind(document);
const inputElement = $("#input");
inputElement.value = "";
const conversionElement = $("#conversion");

const convert = () => {
    const str = inputElement.value;
    const units = [...matchAllUnits(str)];
    if (units.length === 0) {
        conversionElement.innerText = "";
        return;
    }

    const numbers = convertUnitsToNumbers(units);
    const rem = convertNumbersToRem(numbers);

    let result = replaceUnitsInString(str, units, rem);
    conversionElement.innerText = result;
}

const matchAllUnits = (str) => {
    const re = /(\d+(\.\d+)?)(\p{L}*)/gu;
    return str.matchAll(re);    
}

const convertUnitsToNumbers = (units) => {
    return units.map(v => +v[1].replace(/(\d*)(.\d*)?/, "$1$2"));
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
        return v + "rem";
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
        i += units[unitIndex][0].length - 1;
        unitIndex++;
    }

    return result.join("");
}