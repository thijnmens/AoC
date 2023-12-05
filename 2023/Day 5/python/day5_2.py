import re, multiprocessing

class Almanac():
	seeds: list[int]
	seedToSoil: list[int]
	soilToFertilizer: list[int]
	fertilizerToWater: list[int]
	waterToLight: list[int]
	lightToTemperature: list[int]
	temperatureToHumidity: list[int]
	humidityToLocation: list[int]

	def __init__(self, input) -> None:
		almanac = self.loadAlmanac(input)
		self.seeds = almanac["seeds"]
		self.seedToSoil = almanac["seed-to-soil"]
		self.soilToFertilizer = almanac["soil-to-fertilizer"]
		self.fertilizerToWater = almanac["fertilizer-to-water"]
		self.waterToLight = almanac["water-to-light"]
		self.lightToTemperature = almanac["light-to-temperature"]
		self.temperatureToHumidity = almanac["temperature-to-humidity"]
		self.humidityToLocation = almanac["humidity-to-location"]

	def loadAlmanac(self, input) -> dict:
		almanac = {}
		matches: list[str] = re.findall("(?:(?!\n\n)[\s\S])+", input)
		for match in matches:
			matchSplit = match.replace("\n", " ").split(":")
			almanac[matchSplit[0].replace(" map", "").strip()] = [int(number.strip()) for number in matchSplit[1].strip().split(" ")]
		return almanac
	
	
	def getDestination(self, map: list[int], input: int) -> int:
		# dsr = destination, source, range
		dsrMap = [map[i:i + 3] for i in range(0, len(map), 3)]
		for dsr in dsrMap:

			if type(input) == list:
				print("UAAAA")
				print(input)
			if input >= dsr[1] and input < dsr[1] + dsr[2]:
				return dsr[0] + (input - dsr[1])
			
		return input

	def getDestinationForSeed(self, seeds):
		lowestLocation = -1
		for seed in range(seeds[0], seeds[1]):
			soil = self.getDestination(self.seedToSoil, seed)
			fertilizer = self.getDestination(self.soilToFertilizer, soil)
			water = self.getDestination(self.fertilizerToWater, fertilizer)
			light  = self.getDestination(self.waterToLight, water)
			temperature  = self.getDestination(self.lightToTemperature, light)
			humidity  = self.getDestination(self.temperatureToHumidity, temperature)
			location = self.getDestination(self.humidityToLocation, humidity)

			if lowestLocation == -1 or location < lowestLocation:
				lowestLocation = location

		return lowestLocation

	def getLowestLocation(self):
		seedRanges = [self.seeds[i:i + 2] for i in range(0, len(self.seeds), 2)]

		smallerSeedRanges = []
		for seedRange in seedRanges:
			step = (seedRange[0] + seedRange[1]) / 4
			for newRange in [[round(step*i), round(step*(i+1))] for i in range(4)]:
				smallerSeedRanges.append(newRange)

		with multiprocessing.Pool(processes=len(smallerSeedRanges) - 1) as pool:
			location = pool.map(self.getDestinationForSeed, smallerSeedRanges)
			return min(location)
		

def main():
	output = 0

	with open("./input.txt", 'r') as input:
		almanac = Almanac(input.read())
		output = almanac.getLowestLocation()
	
	print(output)

if __name__ == "__main__":
	main()