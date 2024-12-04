import {createReadStream} from 'node:fs';
import {createInterface} from "node:readline";

async function main() {
	const input = await readFile((input, line) => {
		input.grid.push(line.trim().split(''))
		return input
	})

	let xLocations: number[][] = []

	input.grid.forEach((row, x) => {
		row.forEach((col, y) => {
			if (col == 'X') xLocations.push([y, x])
		})
	})

	let output = 0;
	xLocations.forEach(location => {

		let directions = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
			[1, 1],
			[-1, -1],
			[1, -1],
			[-1, 1]
		]

		output += directions.map(direction =>
			checkForXmas(location, direction, input)
		).filter(Boolean).length
	})
	console.log(output)
}

function checkForXmas(location: number[], direction: number[], input: InputType): boolean {
	const xmas = "MAS" // X can be removed since we already know x, y is an X
	let x = location[0]
	let y = location[1]
	let xMod = direction[0]
	let yMod = direction[1]
	let offset = 0

	while (offset <= 2) {
		x = x + xMod
		y = y + yMod


		if (input.grid?.[y]?.[x] == undefined) return false // Out of bounds
		if (input.grid[y][x] == xmas.charAt(offset)) {
			if (offset == 2) return true
			offset += 1
		} else {
			return false
		}
	}

	return false
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
	grid: string[][] = []
}

main();
