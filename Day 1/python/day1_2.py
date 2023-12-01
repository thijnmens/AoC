
def main():
	validNumbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
	output = 0

	with open("./input.txt", 'r') as input:
		lines = input.read().splitlines() # Don't use input.readlines() because it keeps the \n
		for line in lines:

			firstNumber = get_first_number(line, validNumbers)
			lastNumber = get_last_number(line, validNumbers)
	
			output += int(firstNumber + lastNumber)
		input.close()

	
	print(output)

def get_first_number(line: str, validNumbers: list[str]):
	lowestIndex = len(line)
	number = None
	for validNumber in validNumbers:
		foundIndex = line.find(validNumber)
		if foundIndex < lowestIndex and foundIndex != -1:
			lowestIndex = foundIndex
			number = validNumber

	return convert_to_number(number, validNumbers)

def get_last_number(line: str, validNumbers: list[str]):
	validNumbersReversed = [x[::-1] for x in validNumbers]
	lineReversed = line[::-1]

	return convert_to_number(
		get_first_number(lineReversed, validNumbersReversed),
		validNumbersReversed
	)

def convert_to_number(number: str, validNumbers: list[str]):
	if validNumbers.index(number) > 9: return number
	return str(validNumbers.index(number))

if __name__ == "__main__":
	main()