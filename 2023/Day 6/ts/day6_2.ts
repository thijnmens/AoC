import { createReadStream } from 'fs';
import readline from 'readline';

class Race {
	Time: number = 0;
	Distance: number = 0;

	constructor(time: string, distance: string) {
		this.Time = Number(time.match(/\d+/g)?.join(''));
		this.Distance = Number(distance.match(/\d+/g)?.join(''));
	}

	findCrossPoints(time: number, record: number) {
		const formulaMinus = (_y: number, _r: number) => (_y - Math.sqrt(_y ** 2 - 4 * _r)) / 2;
		const formulaPlus = (_y: number, _r: number) => (_y + Math.sqrt(_y ** 2 - 4 * _r)) / 2;

		return [formulaMinus(time, record), formulaPlus(time, record)];
	}

	getOptimalTimeAmount(time: number, record: number): number {
		const crosspoints = this.findCrossPoints(time, record);
		return Math.floor(crosspoints[1]) - Math.ceil(crosspoints[0]) + 1;
	}

	getOutput() {
		return this.getOptimalTimeAmount(this.Time, this.Distance);
	}
}

async function main() {
	const lines = readline.createInterface({
		input: createReadStream('./input.txt'),
		crlfDelay: Infinity,
	});

	let time = '';
	let distance = '';
	for await (const line of lines) {
		if (line.toLowerCase().startsWith('time')) time = line;
		else distance = line.trim();
	}

	var race = new Race(time, distance);
	console.log(race.getOutput());
}

main();
