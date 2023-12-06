package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {
	input := readFileAsString("input")
	lines := strings.Split(input, "\n")

	fmt.Println(solve(lines))
}

func readFileAsString(path string) string {
	b, err := os.ReadFile(path)
	if err != nil {
	}

	return string(b)
}

func solve(lines []string) int {
	sum := 0
	for i := 0; i < len(lines)-1; i++ {
		sum += calcLine(lines[i])
	}

	return sum
}

func calcLine(s string) int {
	leftP, rightP := 0, len(s)-1
	sum := 0
	updateLeft := true
	updateRight := true

	for updateLeft || updateRight {
		leftB, rightB := s[leftP], s[rightP]

		if isByteNumber(leftB) && updateLeft {
			sum += (10 * byteToInt(leftB))
			updateLeft = false
		}

		if isByteNumber(rightB) && updateRight {
			sum += byteToInt(rightB)
			updateRight = false
		}

		if updateLeft {
			leftP++
		}

		if updateRight {
			rightP--
		}
	}

	return sum
}

func isByteNumber(b byte) bool {
	return b >= 48 && b <= 57
}

func byteToInt(b byte) int {
	return int(b - 48)
}
