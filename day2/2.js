const { readFile } = require("./helper"); // import readfile function

(async () => {
    try {
        const sum = await findGames();
        console.log(sum);
    } catch (error) {
        console.error(error);
    }
})();

async function findGames() {
    try {
        const lines = await readFile(); // call function to get lines array

        let sum = 0;

        function countColors(line) {
            const maxCounts = {
                red: 1,
                blue: 1,
                green: 1,
            };

            const colonSplit = line.split(":");
            let data = "";
            if (colonSplit.length > 1) {
                data = colonSplit[1].split(/[;,]/);
            }
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const [countStr, color] = data[i].trim().split(/\s+/); // split count and color based on spaces
                const count = parseInt(countStr, 10);

                if (count > maxCounts[color]) {
                    maxCounts[color] = count;
                }
            }

            return maxCounts;
        }

        lines.forEach((line) => {
            const colors = countColors(line);

            console.log(
                "B: " +
                    colors["blue"] +
                    ", R: " +
                    colors["red"] +
                    ", G: " +
                    colors["green"]
            );

            console.log(
                "powers " + colors["blue"] * colors["red"] * colors["green"]
            );
            sum = sum + colors["blue"] * colors["red"] * colors["green"];

            console.log(sum);
        });

        return sum;
    } catch (error) {
        console.error(error);
    }
}
