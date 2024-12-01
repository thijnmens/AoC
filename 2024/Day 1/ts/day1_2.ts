import { createReadStream } from 'node:fs';
import { Interface, createInterface } from "node:readline";

async function main() {
	let input = await readFile((input, line) => {

		let inputPair = line.split('   ')
		input.leftList.push(Number(inputPair[0]))
		input.rightList.push(Number(inputPair[1]))
		return input;

	})

	input.leftList.sort((a, b) => (a - b))
	input.rightList.sort((a, b) => (a - b))

	let countingList: { [locId: number]: number} = {}
	let addedList: number[] = []

	input.rightList.forEach((locID) => {
		countingList[locID] = countingList[locID] ? countingList[locID] + 1 : 1;
	})

	input.leftList.forEach((line, i) => {
		let rightCount = countingList[line] ?? 0
		addedList.push(line * rightCount)
	})

	console.log(addedList.reduce((a, b) => a + b, 0))
}

async function readFile(typeMapper: (input: InputType, line: string) => InputType): Promise<InputType> {
	const lines = createInterface({
		input: createReadStream('../input.txt'),
		crlfDelay: Infinity,
	});

	let input = new InputType()
	for await (let line of lines) {
		input = typeMapper(input, line);
	}

	return input
}

class InputType {
	leftList: number[] = []
	rightList: number[] = []
}

main();
