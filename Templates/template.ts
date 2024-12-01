import { createReadStream } from 'node:fs';
import { createInterface } from "node:readline";

async function main() {
	// Your code here
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
	// Type definition here
}

main();
