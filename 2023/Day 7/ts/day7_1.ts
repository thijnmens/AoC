import { createReadStream } from 'fs';
import readline from 'readline';

class Game {
	ValidCards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
	Hands: { [name: string]: number } = {};

	constructor(hands: string[][]) {
		hands.forEach((hand) => {
			this.Hands[hand[0]] = Number(hand[1]);
		});
	}

	sortHands(hands: string[][]) {
		hands.sort((a, b) => {
			const value = this.ValidCards.indexOf(a[0]) - this.ValidCards.indexOf(b[0]);
			if (value === 0) {
				for (let index = 0; index < a[0].length; index++) {
					const charA = a[0].charAt(index);
					const charB = b[0].charAt(index);
					const charValue =
						this.ValidCards.indexOf(charA) - this.ValidCards.indexOf(charB);

					if (charValue == 0) continue;
					return charValue;
				}
			}
			return value;
		});

		return hands;
	}

	getHandsType(hands: { [name: string]: number }) {
		let handsDict: { [name: string]: { [name: string]: number } } = {};

		handsDict['fiveofakind'] = {};
		handsDict['fourofakind'] = {};
		handsDict['threeofakind'] = {};
		handsDict['fullhouse'] = {};
		handsDict['twopair'] = {};
		handsDict['onepair'] = {};
		handsDict['highcard'] = {};

		for (const [hand, bet] of Object.entries(hands)) {
			if (this.isFiveOfAKind(hand)) {
				handsDict.fiveofakind[hand] = bet;
				continue;
			}
			if (this.isFourOfAKind(hand)) {
				handsDict.fourofakind[hand] = bet;
				continue;
			}
			if (this.isFullHouse(hand)) {
				handsDict.fullhouse[hand] = bet;
				continue;
			}
			if (this.isThreeOfAKind(hand)) {
				handsDict.threeofakind[hand] = bet;
				continue;
			}
			if (this.isTwoPair(hand)) {
				handsDict.twopair[hand] = bet;
				continue;
			}
			if (this.isOnePair(hand)) {
				handsDict.onepair[hand] = bet;
				continue;
			}
			handsDict.highcard[hand] = bet;
		}

		return handsDict;
	}

	isFiveOfAKind(hand: string) {
		return hand.split('').every((char) => char === hand[0]);
	}

	isFourOfAKind(hand: string) {
		const cards = this.getHandCards(hand);
		return cards[0][1] === 4;
	}

	isThreeOfAKind(hand: string) {
		const cards = this.getHandCards(hand);
		return cards[0][1] === 3;
	}

	isTwoPair(hand: string) {
		const cards = this.getHandCards(hand);
		return cards[0][1] === 2 && cards[1][1] === 2;
	}

	isOnePair(hand: string) {
		const cards = this.getHandCards(hand);
		return cards[0][1] === 2;
	}

	isFullHouse(hand: string) {
		const cards = this.getHandCards(hand);
		return cards[0][1] === 3 && cards[1][1] === 2;
	}

	getHandCards(hand: string) {
		let charDict: { [name: string]: number } = {};
		hand.split('').forEach((char) => {
			if (charDict[char]) {
				charDict[char]++;
			} else {
				charDict[char] = 1;
			}
		});

		var hands = Object.keys(charDict).map((key: string) => {
			return [key, charDict[key]];
		});

		hands.sort((first, second) => {
			return Number(second[1]) - Number(first[1]);
		});

		return hands;
	}

	getOutput() {
		const hands: { [name: string]: { [name: string]: number } } = this.getHandsType(this.Hands);

		let sortedFiveOfAKind: string[][] = [];
		let sortedFourOfAKind: string[][] = [];
		let sortedThreeOfAKind: string[][] = [];
		let sortedFullHouse: string[][] = [];
		let sortedTwoPair: string[][] = [];
		let sortedOnePair: string[][] = [];
		let sortedHighCard: string[][] = [];

		for (const hand in hands['fiveofakind']) {
			sortedFiveOfAKind.push([hand, hands['fiveofakind'][hand].toString()]);
		}
		for (const hand in hands['fourofakind']) {
			sortedFourOfAKind.push([hand, hands['fourofakind'][hand].toString()]);
		}
		for (const hand in hands['threeofakind']) {
			sortedThreeOfAKind.push([hand, hands['threeofakind'][hand].toString()]);
		}
		for (const hand in hands['fullhouse']) {
			sortedFullHouse.push([hand, hands['fullhouse'][hand].toString()]);
		}
		for (const hand in hands['twopair']) {
			sortedTwoPair.push([hand, hands['twopair'][hand].toString()]);
		}
		for (const hand in hands['onepair']) {
			sortedOnePair.push([hand, hands['onepair'][hand].toString()]);
		}
		for (const hand in hands['highcard']) {
			sortedHighCard.push([hand, hands['highcard'][hand].toString()]);
		}

		let sortedHands: string[][] = [];
		sortedHands.push(...this.sortHands(sortedHighCard).reverse());
		sortedHands.push(...this.sortHands(sortedOnePair).reverse());
		sortedHands.push(...this.sortHands(sortedTwoPair).reverse());
		sortedHands.push(...this.sortHands(sortedThreeOfAKind).reverse());
		sortedHands.push(...this.sortHands(sortedFullHouse).reverse());
		sortedHands.push(...this.sortHands(sortedFourOfAKind).reverse());
		sortedHands.push(...this.sortHands(sortedFiveOfAKind).reverse());

		let output = 0;

		sortedHands.forEach((hand, i) => {
			console.log(hand);
			output += Number(hand[1]) * (i + 1);
		});

		return output;
	}
}

async function main() {
	const lines = readline.createInterface({
		input: createReadStream('./input.txt'),
		crlfDelay: Infinity,
	});

	let hands: string[][] = [];
	for await (const line of lines) {
		hands.push(line.split(' '));
	}

	var game = new Game(hands);
	console.log(game.getOutput());
}

main();
