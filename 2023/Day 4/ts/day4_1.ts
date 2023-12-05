import { createReadStream } from 'fs';
import readline from 'readline';

class Card {
	CardId: number;
	WinningNumbers: number[] = [];
	Numbers: number[] = [];

	constructor(cardString: string) {
		this.CardId = Number(cardString.match(/\d+/g)?.[0]);

		const numberSplit = cardString.split(':')[1].split('|');
		numberSplit[0].match(/\d+/g)?.forEach((element) => {
			this.WinningNumbers.push(Number(element));
		});

		numberSplit[1].match(/\d+/g)?.forEach((element) => {
			this.Numbers.push(Number(element));
		});
	}

	getPoints() {
		let matchesFound = 0;

		this.WinningNumbers.forEach((winningNumber) => {
			if (this.Numbers.includes(winningNumber)) {
				matchesFound++;
			}
		});

		if (matchesFound == 0) return 0;

		return 2 ** matchesFound / 2;
	}
}

async function main() {
	const lines = readline.createInterface({
		input: createReadStream('./input.txt'),
		crlfDelay: Infinity,
	});

	let output = 0;

	for await (const line of lines) {
		const card = new Card(line);
		output += card.getPoints();
	}

	console.log(output);
}

main();
