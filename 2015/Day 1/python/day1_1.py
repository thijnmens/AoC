def main():
	output = 0

	with open("./input.txt", 'r') as input:
		line = input.readline()

		for bracket in [*line]:
			if bracket == "(":
				output += 1
			else:
				output -= 1

		input.close()
	
	print(output)


if __name__ == "__main__":
	main()