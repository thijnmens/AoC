def main():
	coordinates = {}

	with open("./input.txt", 'r') as input:
		line = input.readline()

		currentLocation = [0, 0]
		coordinates[str(currentLocation)] = 1

		for move in [*line]:
			if move == "^":
				currentLocation[1] += 1
			elif move == ">":
				currentLocation[0] += 1
			elif move == "<":
				currentLocation[0] -= 1
			else:
				currentLocation[1] -= 1
			
			if str(currentLocation) in coordinates:
				coordinates[str(currentLocation)] += 1
			else:
				coordinates[str(currentLocation)] = 1

		input.close()
	
	print(len(coordinates.keys()))


if __name__ == "__main__":
	main()