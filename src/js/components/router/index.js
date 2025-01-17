import { empty } from 'most'

const Router = (sources, props) => {
  const equalPath = (a, b) => a.path === b.path

  const match$ = sources.router.define(props)
  const page$ = match$
    .skipRepeatsWith(equalPath)
    .map(({path, value}) => {
      return value({
        ...sources,
        router: sources.router.path(path)
      })
    })
    .multicast()
  return {
    DOM: page$.chain(c => c.DOM),
    HTTP: page$.chain(c => c.HTTP || empty()),
    router: page$.chain(c => c.router || empty())
  }
}

export default Router
