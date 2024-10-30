const fs = require('fs');

// Function to read and parse the JSON input
function readInput(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading or parsing the file:", error);
        return null;
    }
}

// Function to convert a number in a given base to decimal
function decodeValue(base, value) {
    return value.split('').reverse().reduce((acc, digit, index) => {
        const decimalDigit = parseInt(digit, base);
        return acc + decimalDigit * Math.pow(base, index);
    }, 0);
}

// Lagrange Interpolation to find the polynomial constant term
function lagrangeInterpolation(points) {
    const k = points.length;
    let c = 0;

    for (let i = 0; i < k; i++) {
        const x_i = points[i][0];
        const y_i = points[i][1];

        let L = 1; // Lagrange basis polynomial L_i(0)

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                L *= (0 - points[j][0]) / (x_i - points[j][0]);
            }
        }

        c += y_i * L;
    }

    return Math.round(c); // Ensure c is rounded to an integer
}

// Main function to execute the logic
function main() {
    const input1 = readInput('input1.json'); // Path to the first test case
    const input2 = readInput('input2.json'); // Path to the second test case

    if (!input1 || !input2) {
        console.error("Failed to read input files.");
        return;
    }

    console.log("Inputs read successfully.");

    const testCases = [input1, input2];

    testCases.forEach((testCase, index) => {
        console.log(`Processing test case ${index + 1}...`);
        const n = testCase.keys.n;
        const k = testCase.keys.k;
        const points = [];

        for (let i = 1; i <= n; i++) {
            if (testCase[i]) {
                const base = parseInt(testCase[i].base, 10);
                const value = testCase[i].value;

                const x = i; // Key represents x-coordinate
                const y = decodeValue(base, value); // Decode y value

                points.push([x, y]);
                console.log(`Point: (${x}, ${y})`);
            } else {
                console.log(`No data for key ${i}`);
            }
        }

        if (points.length < k) {
            console.log(`Not enough points to calculate c for test case ${index + 1}`);
            return;
        }

        const c = lagrangeInterpolation(points.slice(0, k));
        console.log(`Constant term (c) for test case ${index + 1}: ${c}`);
    });
}

// Execute the main function
main();
