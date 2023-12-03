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

	getRequiredPaper() {
		return (
			2 * (this.lenght * this.width) +
			2 * (this.width * this.height) +
			2 * (this.height * this.lenght) +
			Math.min(
				...[this.lenght * this.width, this.width * this.height, this.height * this.lenght]
			)
		);
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
		output += box.getRequiredPaper();
	}

	console.log(output);
}

main();
