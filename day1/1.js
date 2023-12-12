const { readFile } = require("./helper"); // import readfile function
const { isDigit } = require("./helper"); // import isDigit function

(async () => {
    try {
        const sum = await findSumDigits();
        console.log(sum);
    } catch (error) {
        console.error(error);
    }
})();

async function findSumDigits() {
    try {
        const lines = await readFile(); // call function to get lines array

        // use lines array
        let sum = 0;
        lines.forEach((line) => {
            const digits = line.split("").filter(isDigit).map(Number);
            const numbers = Number(`${digits[0]}${digits[digits.length - 1]}`);
            sum = sum + numbers;
        });
        return sum;
    } catch (error) {
        console.error(error);
    }
}
