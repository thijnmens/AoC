import { createReadStream } from 'fs';
import readline from 'readline';

class Schematic {
	SchematicArray: string[][] = [];
	CheckedNumberCoordinates: string[] = [];
	Output: number = 0;

	constructor(schematicArray: string[][]) {
		this.SchematicArray = schematicArray;

		this.SchematicArray.forEach((row: string[], y) => {
			row.forEach((symbol: string, x) => {
				// Need an explicit check for 0 because js sees it as 'false' :|
				if (symbol != '.' && !(Number(symbol) || symbol == '0')) {
					this.checkSurroundings(x, y);
				}
			});
		});
	}

	checkSurroundings(x: number, y: number) {
		for (let _y = y - 1; _y <= y + 1; _y++) {
			for (let _x = x - 1; _x <= x + 1; _x++) {
				if (_x == x && _y == y) continue;
				if (this.CheckedNumberCoordinates.includes(`${_x},${_y}`)) continue;

				const fullNumber = this.getFullNumber(_x, _y);
				if (fullNumber) {
					this.Output += Number(fullNumber);
				}
			}
		}
	}

	getFullNumber(x: number, y: number) {
		let finishedLeft = false;
		let finishedRight = false;

		if (!Number(this.SchematicArray[y][x]) && this.SchematicArray[y][x] != '0') return;

		let number = this.SchematicArray[y][x];

		let _x = x;
		while (!finishedLeft) {
			_x -= 1;

			if (_x < 0) {
				finishedLeft = true;
				continue;
			}

			const symbol = this.SchematicArray[y][_x];

			// Why is 0 interpreted as false
			if (Number(symbol) || symbol == '0') {
				number = symbol + number;
			} else {
				finishedLeft = true;
			}

			this.CheckedNumberCoordinates.push(`${_x},${y}`);
		}

		_x = x;
		while (!finishedRight) {
			_x += 1;

			if (_x < 0) break;

			const symbol = this.SchematicArray[y][_x];

			if (Number(symbol) || symbol == '0') {
				number += symbol;
			} else {
				finishedRight = true;
			}

			this.CheckedNumberCoordinates.push(`${_x},${y}`);
		}

		return number;
	}
}

async function main() {
	const lines = readline.createInterface({
		input: createReadStream('./input.txt'),
		crlfDelay: Infinity,
	});

	let schematicArray: string[][] = [];

	for await (const line of lines) {
		schematicArray.push(line.split(''));
	}

	var schematic = new Schematic(schematicArray);
	console.log(schematic.Output);
}

main();
