/**
 * remove all `%c` from console that only for styling in browser
 * @param {*[]} args
 */
const polyBrowserConsole = (args) => {
  const newArgs = []

  for (let i = 0; i < args.length; i++) {
    let item = args[i]

    if (typeof item === 'string') {
      item = item.replace(/%c/g, () => {
        if (i < args.length - 1) {
          i++
          return ''
        }

        return '%c'
      })
    }

    newArgs.push(item)
  }

  return newArgs
}

exports.polyBrowserConsole = polyBrowserConsole
