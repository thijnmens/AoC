import re

def main():
	excludedRegex ='(ab)+|(cd)+|(pq)+|(xy)+'
	vowelRegex = '[aeiou]'
	consecutiveCharactersRegex = '(([a-z])\\2?(?=\\2))+'
	output = 0

	with open("./input.txt", 'r') as input:
		
		for line in input.readlines():
			if len(re.findall(excludedRegex, line)) > 0:
				continue
			if len(re.findall(vowelRegex, line)) < 3:
				continue
			if len(re.findall(consecutiveCharactersRegex, line)) < 1:
				continue

			output += 1

		input.close()
	
	print(output)

if __name__ == "__main__":
	main()