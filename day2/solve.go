package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func readFileAsString(path string) string {
	b, err := os.ReadFile(path)
	if err != nil {
	}

	return string(b)
}

func calcLine(l string) int {
	split := strings.Split(l, ":")
	gameId, _ := strconv.Atoi(strings.Split(split[0], " ")[1])

	maxRed, maxBlue, maxGreen := 0, 0, 0

	sets := strings.Split(split[1], ";")

	for _, v := range sets {
		colors := strings.Split(v, ",")

		for _, v := range colors {
			countColor := strings.Split(strings.Trim(v, " "), " ")

			count, _ := strconv.Atoi(countColor[0])
			color := countColor[1]

			if color == "red" && count > maxRed {
				maxRed = count
			}

			if color == "blue" && count > maxBlue {
				maxBlue = count
			}

			if color == "green" && count > maxGreen {
				maxGreen = count
			}
		}
	}

	if maxRed > 12 || maxGreen > 13 || maxBlue > 14 {
		return 0
	}

	return gameId
}

func solve(lines []string) int {
	sum := 0

	for _, v := range lines {
		if v == "" {
			break
		}

		sum += calcLine(v)
	}

	return sum
}

func main() {
	input := readFileAsString("input")
	lines := strings.Split(input, "\n")

	fmt.Println(solve(lines))
}
