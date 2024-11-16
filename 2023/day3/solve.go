package main

import (
	"bytes"
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

func isNum(b byte) bool {
	return b >= 48 && b < 58
}

func isSymbol(b byte) bool {
	return !isNum(b) && b != '.'
}

func checkForAdjecentSymbol(lines []string, rowIndex int, colIndex int, length int) bool {
	// Check Left
	if colIndex > 0 && isSymbol(lines[rowIndex][colIndex-1]) {
		return true
	}

	// Check Right
	if len(lines[0]) > colIndex+length && isSymbol(lines[rowIndex][colIndex+length]) {
		return true
	}

	// Check Up
	if rowIndex > 0 {
		rowToCheckIndex := rowIndex - 1
		var startCol int
		if colIndex > 0 {
			startCol = colIndex - 1
		} else {
			startCol = 0
		}
		var endCol int
		if len(lines[0]) > colIndex+length {
			endCol = colIndex + length
		} else {
			endCol = colIndex + length - 1
		}

		for startCol <= endCol {
			if isSymbol(lines[rowToCheckIndex][startCol]) {
				return true
			}
			startCol++
		}
	}

	// Check Down
	if len(lines)-1 > rowIndex+1 {
		rowToCheckIndex := rowIndex + 1
		var startCol int
		if colIndex > 0 {
			startCol = colIndex - 1
		} else {
			startCol = 0
		}
		var endCol int
		if len(lines[0]) > colIndex+length {
			endCol = colIndex + length
		} else {
			endCol = colIndex + length - 1
		}

		for startCol <= endCol {
			if isSymbol(lines[rowToCheckIndex][startCol]) {
				return true
			}
			startCol++
		}
	}

	return false
}

func solve(lines []string) int {
	sum := 0
	for rI, r := range lines {
		for cI := 0; cI < len(r); cI++ {
			c := r[cI]
			if isNum(c) {
				numSequence := bytes.NewBufferString("")
				numSequence.WriteByte(c)
				sequenceStartIndex := cI

				for cI < len(r)-1 && isNum(r[cI+1]) {
					numSequence.WriteByte(r[cI+1])
					cI++
				}

				if checkForAdjecentSymbol(lines, rI, sequenceStartIndex, numSequence.Len()) {
					int, err := strconv.Atoi(numSequence.String())

					if err == nil {
						sum += int
					}
				}
			}
		}
	}
	return sum
}

func main() {
	input := readFileAsString("./input")
	lines := strings.Split(input, "\n")
	fmt.Println(solve(lines))
}
