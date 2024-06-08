let count = 0;

function on_chunk (chunk) {
  let pos = 0;
  let length = chunk.length;
  while ( pos < length ) {
    const next = chunk.indexOf(10, pos);
    if ( next === -1 ) break;
    pos = next + 1;
    count += 1;
  }
}

const chunk = new Uint8Array(2 * 1024 * 1024)
const file = await Deno.open(Deno.args[2] || '/dev/shm/test.log')
let bytes = await file.read(chunk)
while (bytes > 0) {
  if (bytes === chunk.length) {
    on_chunk(chunk)
  } else {
    on_chunk(chunk.subarray(0, bytes))
  }
  bytes = await file.read(chunk)
}

console.log(count);
