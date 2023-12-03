def main():
	coordinates = {}

	with open("./input.txt", 'r') as input:
		line = input.readline()

		currentLocationSanta = [0, 0]
		currentLocationRobot = [0, 0]
		coordinates[str(currentLocationSanta)] = 2

		for index, move in enumerate([*line]):

			robotTurn = False
			if index % 2 == 0:
				robotTurn = True
			else:
				robotTurn = False

			if move == "^":
				if robotTurn: currentLocationRobot[1] += 1
				else: currentLocationSanta[1] += 1
				
			elif move == ">":
				if robotTurn: currentLocationRobot[0] += 1
				else: currentLocationSanta[0] += 1
				
			elif move == "<":
				if robotTurn: currentLocationRobot[0] -= 1
				else: currentLocationSanta[0] -= 1
				
			else:
				if robotTurn: currentLocationRobot[1] -= 1
				else: currentLocationSanta[1] -= 1
				
			if robotTurn:
				if str(currentLocationRobot) in coordinates:
					coordinates[str(currentLocationRobot)] += 1
				else:
					coordinates[str(currentLocationRobot)] = 1
			else:
				if str(currentLocationSanta) in coordinates:
					coordinates[str(currentLocationSanta)] += 1
				else:
					coordinates[str(currentLocationSanta)] = 1

		input.close()
	
	print(len(coordinates.keys()))


if __name__ == "__main__":
	main()