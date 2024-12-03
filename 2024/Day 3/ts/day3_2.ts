import { createReadStream } from 'node:fs';
import { createInterface } from "node:readline";

async function main() {
	const input = await readFile((input, line) => {
		input.memory += line.trim()
		return input
	})

	const matches = Array.from(input.memory.matchAll(/((mul\(\d{1,3},\d{1,3}\))|(don't\(\))|(do\(\)))/g), x=>x[1])

	let output = 0
	let active = true
	matches.forEach((match) => {
		if (match == "don't()") {
			active = false
			return
		}
		else if (match == "do()") {
			active = true
			return
		}

		if (!active) return

		const numbers = Array.from(match.matchAll(/(\d{1,3})/g), x=>Number(x[1]))
		output += numbers[0] * numbers[1]
	})

	console.log(output)
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
	memory: string = "";
}

main();