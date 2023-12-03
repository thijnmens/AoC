def main():
	output = 0

	with open("./input.txt", 'r') as input:
		line = input.readline()

		floor = 0

		for bracket in [*line]:
			output += 1
			if bracket == "(":
				floor += 1
			else:
				floor -= 1

			if floor < 0:
				break;

		input.close()
	
	print(output)


if __name__ == "__main__":
	main()