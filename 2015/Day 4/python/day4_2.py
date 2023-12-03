import hashlib

def main():
	output = -1

	with open("./input.txt", 'r') as input:
		line = input.readline()

		lastHash = ""
		while (not lastHash.startswith("000000")):
			output += 1
			lastHash = hashlib.md5(f"{line}{output}".encode()).hexdigest()

		input.close()
	
	print(output)
	


if __name__ == "__main__":
	main()