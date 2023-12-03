import { createReadStream } from 'fs';
import readline from 'readline';

class Box {
	lenght: number = 1;
	width: number = 1;
	height: number = 1;

	constructor(dimensions: string) {
		const dimensionsSplit = dimensions.split('x');

		this.lenght = Number(dimensionsSplit[0]);
		this.width = Number(dimensionsSplit[1]);
		this.height = Number(dimensionsSplit[2]);
	}

	getRequiredRibbon() {
		const smallestSizes = [this.lenght, this.width, this.height].sort((a, b) => a - b);
		console.log(smallestSizes);
		return 2 * smallestSizes[0] + 2 * smallestSizes[1] + this.lenght * this.width * this.height;
	}
}

async function main() {
	const lines = readline.createInterface({
		input: createReadStream('./input.txt'),
		crlfDelay: Infinity,
	});

	let output = 0;

	for await (const line of lines) {
		const box = new Box(line);
		output += box.getRequiredRibbon();
	}

	console.log(output);
}

main();
