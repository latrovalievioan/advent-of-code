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

type lineValues struct {
	gameId     int
	isPossible bool
	power      int
}

func calcLine(l string) lineValues {
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

	return lineValues{
		gameId,
		maxRed <= 12 && maxGreen <= 13 && maxBlue <= 14,
		maxRed * maxGreen * maxBlue,
	}
}

func solve(lines []string) int {
	sum := 0

	for _, v := range lines {
		if v == "" {
			break
		}

		lineValues := calcLine(v)

		if lineValues.isPossible {
			sum += lineValues.gameId
		}
	}

	return sum
}

func solve2(lines []string) int {
	sum := 0

	for _, v := range lines {
		if v == "" {
			break
		}

		sum += calcLine(v).power
	}

	return sum
}

func main() {
	input := readFileAsString("input")
	// input := readFileAsString("test_input")
	lines := strings.Split(input, "\n")

	fmt.Println(solve(lines))
	fmt.Println(solve2(lines))
}
