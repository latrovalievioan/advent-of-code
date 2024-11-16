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

func formatLine(l string) string {
	conversions := map[string]string{
		"one":   "one1one",
		"two":   "two2two",
		"three": "three3three",
		"four":  "four4four",
		"five":  "five5five",
		"six":   "six6six",
		"seven": "seven7seven",
		"eight": "eight8eight",
		"nine":  "nine9nine",
	}

	for k, v := range conversions {
		l = strings.Replace(l, k, v, -1)
	}

	return l
}

func formatLines(lines []string) []string {
	res := []string{}
	for _, v := range lines {
		if v == "" {
			break
		}

		res = append(res, formatLine(v))
	}

	return res
}

func solve2(lines []string) int {
	formatedLines := formatLines(lines)
	return solve(formatedLines)
}

func main() {
	input := readFileAsString("input")
	lines := strings.Split(input, "\n")
	fmt.Println(solve(lines))
	fmt.Println(solve2(lines))
}
