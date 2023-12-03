def main():
	output = 0

	with open("./input.txt", 'r') as input:
		for line in input.readlines():
			firstNumber = None
			lastNumber = None

			for char in line:
				if char.isdigit():
					lastNumber = char
					if not firstNumber: firstNumber = char
			
			output += int(firstNumber + lastNumber)
		input.close()

	
	print(output)


if __name__ == "__main__":
	main()