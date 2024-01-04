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

func isNum(b byte) bool {
	return b >= 48 && b < 58
}

func isSymbol(b byte) bool {
	return !isNum(b) && b != '.'
}

func isInsideMatrix(matrix []string, rI int, cI int) bool {
	return 0 <= rI && rI < len(matrix) && 0 <= cI && cI < len(matrix[rI])
}

func isInsideByteList(bytes []byte, i int) bool {
	return 0 <= i && i < len(bytes)
}

type NumIndexes struct {
	num     int
	indexes [][]int
}

func extractNumAndIndexes(matrix []string, rI int, cI int) NumIndexes {
	r := []byte(matrix[rI])
	left, right := cI-1, cI+1
	sequence := []byte{r[cI]}
	indexes := [][]int{{rI, cI}}

	for isInsideByteList(r, left) {
		if !isNum(r[left]) {
			break
		}
		indexes = append(indexes, []int{rI, left})
		sequence = append([]byte{r[left]}, sequence...)
		left--
	}

	for isInsideByteList(r, right) {
		if !isNum(r[right]) {
			break
		}
		indexes = append(indexes, []int{rI, right})
		sequence = append(sequence, r[right])
		right++
	}

	num, _ := strconv.Atoi(string(sequence))

	return NumIndexes{
		num,
		indexes,
	}
}

func rowColumnToKey(rC []int) string {
	return strconv.Itoa(rC[0]) + "_" + strconv.Itoa(rC[1])
}

func findAdjecentNums(matrix []string, r int, c int) []int {
	deltas := [8][2]int{
		{-1, -1},
		{-1, 0},
		{-1, 1},
		{0, -1},
		{0, 1},
		{1, -1},
		{1, 0},
		{1, 1},
	}

	visited := make(map[string]bool)
	nums := []int{}

	for _, d := range deltas {
		dR, dC := d[0], d[1]

		checkRow, checkCol := r+dR, c+dC

		_, wereVisited := visited[rowColumnToKey([]int{checkRow, checkCol})]

		if !isInsideMatrix(matrix, checkRow, checkCol) || !isNum(matrix[checkRow][checkCol]) || wereVisited {
			continue
		}

		numIndexes := extractNumAndIndexes(matrix, checkRow, checkCol)

		for _, visitedRC := range numIndexes.indexes {
			visited[rowColumnToKey(visitedRC)] = true
		}

		nums = append(nums, numIndexes.num)
	}
	return nums
}

func reduceBySum(xs []int) int {
	sum := 0
	for _, x := range xs {
		sum += x
	}
	return sum
}

func solve(matrix []string) int {
	sum := 0
	for rI, r := range matrix {
		r := []byte(r)
		for cI, c := range r {
			if !isSymbol(c) {
				continue
			}

			adjecentNums := findAdjecentNums(matrix, rI, cI)

			sum += reduceBySum(adjecentNums)
		}
	}

	return sum
}

func solve2(matrix []string) int {
	sum := 0
	for rI, r := range matrix {
		r := []byte(r)
		for cI, c := range r {
			if c != '*' {
				continue
			}

			adjecentNums := findAdjecentNums(matrix, rI, cI)

			if len(adjecentNums) != 2 {
				continue
			}

			sum += adjecentNums[0] * adjecentNums[1]
		}
	}

	return sum
}

func main() {
	input := readFileAsString("./input")
	lines := strings.Split(input, "\n")

	fmt.Println(solve(lines))
	fmt.Println(solve2(lines))
}
