export default {
  name: 'node',
  version: '1.0.0',
  desc: '伪Node.js',
  url: 'https://furryr.github.io/term-plugins/node.js',
  start: async handler => {
    handler.term.write('Welcome to fake Node.js v1.0.0.\n')
    handler.term.write('Type ".help" for more information.\n')
    let line = ''
    for (;;) {
      handler.term.write('> ')
      line = await handler.term.getline()
      if (line.trim() == '') continue
      else if (line == '.exit') break
      else if (line == '.help') {
        handler.term.write('.exit  Exit the REPL\n')
        handler.term.write('.help  Print this help message\n')
        handler.term.write(
          'This is not a real Node.js. All operations were based on eval().\n'
        )
      } else {
        try {
          const ret = eval(line)
          handler.term.write(
            typeof ret == 'string' ? JSON.stringify(ret) : ret.toString(),
            '\n'
          )
        } catch (err) {
          handler.term.write(err.toString(), '\n')
        }
      }
    }
    return 0
  }
}
