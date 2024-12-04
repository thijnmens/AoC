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
			if (col == 'A') xLocations.push([x, y])
		})
	})

	let output = 0;
	xLocations.forEach(location => {

		let directions = [
			[1, 1],
			[1, -1],
		]

		if (checkForXmas(location, directions, input))
			output += 1
	})
	console.log(output)
}

function checkForXmas(location: number[], directions: number[][], input: InputType): boolean {


	for (const direction of directions) {
		let x = location[0] + direction[0]
		let y = location[1] + direction[1]
		let xInv = location[0] + (direction[0] * -1)
		let yInv = location[1] + (direction[1] * -1)

		if (input.grid?.[x]?.[y] == undefined || input.grid?.[xInv]?.[yInv] == undefined) return false // Out of bounds
		// Empty code blocks because inverting these if statements throws a TS2367
		// Why the typescript compiler gets to decide that it was "unintentional" is above me
		if (input.grid[x][y] == 'M' && input.grid[xInv][yInv] == 'S') {
		} else if (input.grid[x][y] == 'S' && input.grid[xInv][yInv] == 'M') {
		} else {
			return false
		}
	}


	console.log([
		location,
		[input.grid?.[location[0] - 1]?.[location[1] - 1], "", input.grid?.[location[0] + 1]?.[location[1] - 1]],
		["", input.grid?.[location[0]]?.[location[1]], ""],
		[input.grid?.[location[0] - 1]?.[location[1] + 1], "", input.grid?.[location[0] + 1]?.[location[1] + 1]]
	])
	return true
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
