const bindings = ['fsmount', 'core']
const libs = []
const embeds = []
const target = 'empty' 
const link_type = '-static'
const opt = '-O2'
const v8_opts = {
  v8_cleanup: 0, v8_threads: 1, on_exit: 0,
  v8flags: '--lite-mode --jitless --single-threaded --disable-write-barriers --max-heap-size=16 --no-verify-heap --no-expose-wasm --memory-reducer --optimize-for-size --stack-trace-limit=10 --use-strict --turbo-fast-api-calls'
//  v8flags: '--use-strict'
}
const main = 'empty.js'

export default { bindings, libs, embeds, target, link_type, opt, v8_opts, main }
