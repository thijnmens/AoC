import { createReadStream } from 'fs';
import readline from 'readline';

interface winningCard {
	id: number;
	cards: Card[];
}

let winningCards: winningCard[] = [];
let losingCards: number[] = [];

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

		if (matchesFound == 0) return [];

		return Array.from(new Array(matchesFound), (_, i) => i + this.CardId + 1);
	}
}

function getCardAmount(cards: Card[], amountChecked: number) {
	let newCards: Card[] = [];
	for (var card of cards) {
		if (losingCards.includes(card.CardId)) continue;
		if (winningCards.find((winningCard) => winningCard.id == card.CardId)) {
			winningCards
				.filter((winningCard) => winningCard.id == card.CardId)
				.forEach((winningCard) => {
					newCards.push(...winningCard.cards);
				});
			continue;
		}

		const wonCards = card.getPoints();
		if (wonCards.length == 0) losingCards.push(card.CardId);
		else {
			let cardsToAdd: Card[] = [];
			wonCards.forEach((wonCard) => {
				const cardFound = cards.find((v) => v.CardId == wonCard);
				if (cardFound) {
					newCards.push(cardFound);
					cardsToAdd.push(cardFound);
				}
			});

			winningCards.push({
				id: card.CardId,
				cards: cardsToAdd,
			});
		}
	}

	if (newCards.length != 0) {
		return getCardAmount(newCards, newCards.length + amountChecked);
	}

	return amountChecked;
}

async function main() {
	const lines = readline.createInterface({
		input: createReadStream('./input.txt'),
		crlfDelay: Infinity,
	});

	let cards: Card[] = [];

	for await (const line of lines) {
		cards.push(new Card(line));
	}

	console.log(getCardAmount(cards, cards.length));
}

main();
