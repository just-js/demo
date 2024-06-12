#!/bin/bash
emcc -O3 --profiling -flto -msimd128 -msse4.1 -c linecount_wasm.c
emcc -s DISABLE_EXCEPTION_CATCHING=1 -s FILESYSTEM=0 -s ALLOW_TABLE_GROWTH=0 -s ALLOW_MEMORY_GROWTH=0 -s EXPORTED_FUNCTIONS=@functions.json -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s INLINING_LIMIT=0 -s WASM_BIGINT=0 -Wl,--import-memory --no-entry -O3 -flto --closure 1 -o linecount.wasm linecount_wasm.o
