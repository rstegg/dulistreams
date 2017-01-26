import {div} from '@cycle/dom'

const view = (state$) => {
  return state$.map(state => {
    return div('.login', [
      state.messageBox,
      state.form
    ])
  })
}

export default view
