const $ = document.querySelector.bind(document);
const inputElement = $("#input");
inputElement.value = "";
const convertedElement = $("#converted");

const convert = () => {
    let str = inputElement.value;
    str = replaceNonDigitsWithSpace(str);
    str = str.trim();
    if (!str) {
        return;
    }
    const numbers = convertStringToNumbers(str);
    const rem = convertNumbersToRem(numbers);
    const remStr = rem.join(" ");
    convertedElement.innerText = remStr;
    navigator.clipboard.writeText(remStr);
}

const replaceNonDigitsWithSpace = (str) => {
    const re = /\D+/g
    return str.replace(re, " ");
}

const convertStringToNumbers = (str) => {
    const units = str.split(/\s+/);
    return units.map(v => +v);
}

const convertNumbersToRem = (numbers) => {
    return numbers.map(v =>
        (v / 16)
            .toFixed(4)
            .replace(/(-?\d*\.[1-9]*)(0*)/, "$1")
        + "rem");
}