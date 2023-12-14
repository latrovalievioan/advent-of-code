package main

import (
	"bytes"
	"fmt"
	"os"
	"strconv"
	"strings"
	"unicode"
)

func readFileAsString(path string) string {
	b, err := os.ReadFile(path)
	if err != nil {
	}

	return string(b)
}

func getLine(s string) string {
	result := ""

	for i := 0; i < len(s); i++ {
		currentAsRune := bytes.Runes([]byte{s[i]})[0]
		if unicode.IsNumber(currentAsRune) {
			result += string(currentAsRune)
			break
		}
	}

	for i := len(s) - 1; i >= 0; i-- {
		currentAsRune := bytes.Runes([]byte{s[i]})[0]
		if unicode.IsNumber(currentAsRune) {
			result += string(currentAsRune)
			break
		}
	}

	return result
}

func solve(lines []string) int {
	sum := 0

	for _, v := range lines {
		conv, err := strconv.Atoi(getLine(v))
		if err == nil {
			sum += conv
		}
	}

	return sum
}

func main() {
	input := readFileAsString("input")
	lines := strings.Split(input, "\n")
	fmt.Println(solve(lines))
}
