package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"io"
	"bytes"
	"time"
)

func lineCounter(r io.Reader) (int, error) {
	buf := make([]byte, 2*1024*1024)
	count := 0
	lineSep := []byte{'\n'}
	for {
		c, err := r.Read(buf)
		count += bytes.Count(buf[:c], lineSep)
		switch {
		case err == io.EOF:
			return count, nil
		case err != nil:
			return count, err
		}
	}
}

func count_lines_in_file (filename string) (int, error) {
	file, err := os.Open(filename)
	if err != nil {
		return 0, err
	}
	lineCount, err := lineCounter(bufio.NewReader(file))
	if err != nil {
		return 0, err
	}
	file.Close()
	return lineCount, nil
}

func main() {
	filename := os.Args[1]
	expected, err := count_lines_in_file(filename)
	if err != nil {
		log.Fatalf("Error: %v", err)
	}
	fmt.Printf("The file has %d lines\n", expected)
	runs := 10
	for true {
		start := time.Now()
		for i := 1; i < runs; i++ {
			lines, err := count_lines_in_file(filename)
			if err != nil {
				log.Fatalf("Error: %v", err)
			}
			if lines != expected {
				log.Fatalf("line count is incorrect")
			}
		}
		elapsed := time.Since(start)
		rate := float64(runs) / elapsed.Seconds()
		log.Printf("time %s rate %f", elapsed, rate)
	}
}
