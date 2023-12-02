import { createReadStream } from 'fs';
import readline from 'readline';

class game {
	gameId: number;
	redCubes: number = 1; // Default 1 becuase of multiplication later on, should not mess with the answer
	greenCubes: number = 1; // Only a problem when getting the amount of color dice when that color is not present
	blueCubes: number = 1;
	possible: boolean = false;

	constructor(gamestring: string) {
		const gameSplit = gamestring.split(':');

		this.gameId = Number(gameSplit[0].replace('Game ', '').trim());
		const games = gameSplit[1].split(';');

		games.map((game: string) => {
			const cubes = game.split(',');
			cubes.map((cube: string) => {
				const cubeSplit = cube.trim().split(' ');
				const number = Number(cubeSplit[0]);

				switch (cubeSplit[1].toLowerCase()) {
					case 'red':
						if (number > this.redCubes) this.redCubes = number;
						break;

					case 'green':
						if (number > this.greenCubes) this.greenCubes = number;
						break;

					case 'blue':
						if (number > this.blueCubes) this.blueCubes = number;
						break;

					default:
						console.error('uh oh');
						console.error(cubeSplit[1].toLowerCase());
				}
			});
		});

		if (this.redCubes <= 12 && this.greenCubes <= 13 && this.blueCubes <= 14) {
			this.possible = true;
		}
	}
}

async function main() {
	const lines = readline.createInterface({
		input: createReadStream('./input.txt'),
		crlfDelay: Infinity,
	});

	let dayOneOutput: number = 0;
	let dayTwoOutput: number = 0;

	for await (const line of lines) {
		const _game = new game(line);

		// Day 1
		if (_game.possible) {
			dayOneOutput += _game.gameId;
		}

		// Day 2
		dayTwoOutput += _game.redCubes * _game.greenCubes * _game.blueCubes;
	}

	console.log(`Day 1: ${dayOneOutput}`);
	console.log(`Day 2: ${dayTwoOutput}`);
}

main();
