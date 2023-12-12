const fs = require("fs");

async function readFile() {
    try {
        const data = await fs.promises.readFile("input.txt", "utf8");
        const lines = data.trim().split("\n");
        return lines; // return array
    } catch (err) {
        console.error(err);
        return [];
    }
}

function isDigit(char) {
    return /^\d$/.test(char);
}

module.exports = { readFile, isDigit }; // export function
