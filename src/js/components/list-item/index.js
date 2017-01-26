import model from './model'
import view from './view'
import intent from './intent'

const ListItem = (sources) => {
  const actions = intent(sources)
  const state$ = model(actions, sources.props)
  const view$ = view(state$)
  return {
    DOM: view$,
    actions: actions
  }
}

export default ListItem
