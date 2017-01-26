import { merge, empty } from 'most'
import intent from './intent'
import model from './model'
import view from './view'

const Navigation = (sources, prop$, change$ = empty()) => {
  const action$ = merge(intent(sources), change$)
  const {state$, route$} = model(action$, prop$)
  const view$ = view(state$)
  return {
    DOM: view$,
    router: route$
  }
}

export default Navigation
