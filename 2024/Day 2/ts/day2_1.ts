import { createReadStream } from 'node:fs';
import { createInterface } from "node:readline";

async function main() {
	let input = await readFile((input, line) => {

		let inputList = line.split(' ').map(_ => Number(_))
		input.reports.push({levels: inputList})
		return input;

	})

	let safeCount: number = 0

	input.reports.forEach(report => {
		let pointerA = 0
		let pointerB = 1
		const isIncreasing: boolean = report.levels[pointerA] - report.levels[pointerB] < 0

		let safe: boolean | undefined = undefined

		while (safe == undefined) {
			let difference = report.levels[pointerA] - report.levels[pointerB]

			// Unsafe if switch between inc and dec
			if ((difference < 0) != isIncreasing) {
				safe = false
				return
			}

			// Safe when difference is 1, 2 or 3
			difference = Math.abs(difference)
			if (difference >= 1 && difference <= 3) {
				pointerA += 1
				pointerB += 1

				if (pointerB >= report.levels.length) {
					safe = true
				}
			} else {
				safe = false
				return
			}
		}

		safeCount += safe ? 1 : 0
	})

	console.log(safeCount)
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
