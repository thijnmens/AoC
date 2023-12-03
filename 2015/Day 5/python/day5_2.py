import re

def main():
	consecutiveCharactersRegex = '(..).*\\1'
	consecutiveCharacterswithGapRegex = '(.).\\1'
	output = 0

	with open("./input.txt", 'r') as input:
		
		for line in input.readlines():
			
			 
			if len(re.findall(consecutiveCharactersRegex, line.rstrip('\n'))) >= 1 and len(re.findall(consecutiveCharacterswithGapRegex, line.rstrip('\n'))) >= 1:
				output += 1

		input.close()
	
	print(output)

if __name__ == "__main__":
	main()