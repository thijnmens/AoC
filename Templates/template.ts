import { createReadStream } from 'fs';
import readline from 'readline';

async function main() {
	const lines = readline.createInterface({
		input: createReadStream('./input.txt'),
		crlfDelay: Infinity,
	});

	for await (const line of lines) {
	}
}

main();
