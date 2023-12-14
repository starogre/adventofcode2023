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

        // use lines array
        let sumID = 0;

        function getGameID(line) {
            let id = "";
            let isNumberStarted = false;

            for (const char of line) {
                if (!isNaN(char) && char !== " ") {
                    id += char;
                    isNumberStarted = true;
                } else if (isNumberStarted) {
                    break;
                }
            }

            return id;
        }

        const maxCounts = {
            red: 12,
            blue: 14,
            green: 13,
        };

        function validColors(line) {
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
                    return false;
                }
            }

            return true;
        }

        lines.forEach((line) => {
            const curID = getGameID(line);
            const validGame = validColors(line);

            if (validGame) {
                sumID = sumID + Number(curID);
                console.log(curID + " Successful game");
                console.log("total: " + sumID);
            } else {
                console.log(curID + " Doesn't meet condition");
            }
        });

        return sumID;
    } catch (error) {
        console.error(error);
    }
}

// 1. Scan through each line
// 2. On a line, log the ID number after "Game" text, or rather first number found in line
// 3. Create a log for "blue", "red", "green" cubes
// 4. Keep going through line if total blue, total red, or total green do not surpass the 12 red 13 green 14 blue requirement
// 5. Reset the current counts to 0 if semicolon is encountered
// 6. Move to next line if any sum surpasses the requirement
// 7. If no sum surpasses, Add current line ID to running sum total
// 8. Move to next line
// 9. Repeat
// 10. Return total sum
