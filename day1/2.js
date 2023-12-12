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

const replacements = {
    zero: "z0o",
    one: "o1e",
    two: "t2o",
    three: "t3e",
    four: "f4r",
    five: "f5e",
    six: "s6x",
    seven: "s7n",
    eight: "e8t",
    nine: "n9e",
};

async function findSumDigits() {
    try {
        const lines = await readFile(); // call function to get lines array
        // use lines array
        let totalSum = 0;
        lines.forEach((line) => {
            let replacedLine = line;

            Object.entries(replacements).forEach(([word, replacement]) => {
                replacedLine = replacedLine.replace(
                    new RegExp(word, "gi"),
                    replacement
                );
            });

            const wordsAndDigits = replacedLine.match(
                /([0-9])|(one|two|three|four|five|six|seven|eight|nine)/g
            );

            console.log(wordsAndDigits);
            if (wordsAndDigits.length === 1) {
                const word = wordsAndDigits[0];

                console.log(Number(`${word}${word}`));
                totalSum += Number(`${word}${word}`);
            }

            if (wordsAndDigits && wordsAndDigits.length >= 2) {
                const first = wordsAndDigits[0];
                const last = wordsAndDigits[wordsAndDigits.length - 1];

                const firstValue = isNaN(first)
                    ? replacements[first.toLowerCase()]
                    : first;
                const lastValue = isNaN(last)
                    ? replacements[last.toLowerCase()]
                    : last;

                const newVal = String(firstValue) + String(lastValue);
                console.log(Number(newVal));
                totalSum += Number(newVal);
            }
            console.log(totalSum);
        });

        return totalSum;
    } catch (error) {
        console.error(error);
        return 0;
    }
}
