import { createReadStream } from 'node:fs';
import { createInterface } from "node:readline";

async function main() {
	let input = await readFile((input, line) => {

		let inputList = line.split(' ').map(_ => Number(_))
		input.reports.push({levels: inputList})
		return input;

	})

	let safeCount: number = 0
	let reportLevelsBack: number[] = []

	input.reports.forEach(report => {
		reportLevelsBack = report.levels.slice()
		let removeOffset = 0
		let pointerA = 0
		let pointerB = 1
		let isIncreasing: boolean = report.levels[pointerA] - report.levels[pointerB] < 0

		let safe: boolean | undefined = undefined

		while (safe == undefined) {

			let isSafe = checkIfSafe(report.levels[pointerA], report.levels[pointerB], isIncreasing)

			if (isSafe) {
				pointerA += 1
				pointerB += 1

				if (pointerB >= report.levels.length) {
					safe = true
				}
			} else {
				report.levels = reportLevelsBack.slice()
				pointerA = 0
				pointerB = 1

				if (removeOffset > report.levels.length) {
					return
				}

				report.levels.splice(removeOffset, 1)
				removeOffset += 1
				isIncreasing = report.levels[pointerA] - report.levels[pointerB] < 0
			}
		}

		safeCount += 1
	})

	console.log(safeCount)
}

function checkIfSafe(numA: number, numB: number, isIncreasing: boolean): boolean {
	let difference = numA - numB

	// Unsafe if switch between inc and dec
	if ((difference < 0) != isIncreasing) {
		return false
	}

	// Safe when difference is 1, 2 or 3
	difference = Math.abs(difference)
	return difference >= 1 && difference <= 3
}

async function readFile(typeMapper: (input: InputType, line: string) => InputType): Promise<InputType> {
	const lines = createInterface({
		input: createReadStream('../input.txt'),
		crlfDelay: Infinity,
	});

	let input: InputType = new InputType()
	for await (let line of lines) {
		input = typeMapper(input, line);
	}

	return input
}

class InputType {
	reports: {
		levels: number[]
	}[] = []
}

main();
