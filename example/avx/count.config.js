
const bindings = ['core', 'memcount']
const libs = []
const embeds = []

const target = 'count-lo'
const opt = '-O3 -march=native -mtune=native'

const v8_opts = {
  v8_cleanup: 0, v8_threads: 2, on_exit: 0,
  v8flags: '--stack-trace-limit=10 --use-strict --turbo-fast-api-calls --no-freeze-flags-after-init --cppgc-young-generation'
}

let link_type = '-static'

const index = 'count.js'
export default { bindings, libs, embeds, target, opt, v8_opts, link_type, index }
