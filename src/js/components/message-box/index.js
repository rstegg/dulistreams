import {just, merge} from 'most'
import {hold, async} from 'most-subject'
import isolate from '@cycle/isolate'
import view from './view'
import model from './model'
import Message from '../message'

const messages = {
  success: Message,
  error: Message
}
const itemFactory = (sources) => {
  return (props) => {
    const sinks = isolate(messages[props.type])(sources, just(props))
    const rememberedDom$  = hold(1, async())
    sinks.DOM.observe(dom => rememberedDom$.next(dom))
    return {
      DOM: rememberedDom$,
      action$: sinks.action$
    }
  }
}

const MessageBox = (sources, prop$, change$ = just((x) => x)) => {
  const deleteMessage$ = async()
  const {state$, messageAction$} = model(
    prop$,
    itemFactory(sources),
    merge(
      change$.map(arr => ({action: 'ADD_MESSAGE', payload: arr})),
      deleteMessage$.map(message => ({action: 'DEL_MESSAGE', payload: message}))
    )
  )
  messageAction$.observe(x => deleteMessage$.next(x))
  return {
    DOM: view(state$)
  }
}

export default MessageBox
