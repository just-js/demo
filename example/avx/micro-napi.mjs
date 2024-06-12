import { Bench } from './lib/bench.mjs'
import { openSync, readSync, closeSync } from "node:fs"
import { createRequire } from "node:module"
const { count_avx } = createRequire(import.meta.url)("./build/Release/linecount.node")

const file_name = args[1] || '/dev/shm/test.log'
const buf = new Uint8Array(2 * 1024 * 1024)
const fd = openSync(file_name)
const bytes = readSync(fd, buf)
closeSync(fd)
const bench = new Bench()
const runs = parseInt(args[0] || 40000000, 10)
const expected = count_avx(buf, 10, bytes)
console.log(`bytes ${bytes}`)
console.log(`lines ${expected}`)

for (let j = 0; j < 10; j++) {
  bench.start('count_avx')
  for (let i = 0; i < runs; i++) {
    assert(count_avx(buf, 10, bytes) === expected)
  }
  bench.end(runs)
}
