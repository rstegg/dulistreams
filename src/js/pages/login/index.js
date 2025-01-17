import {just, combine} from 'most'
import view from './view'
import HTTPForm from '../../components/http-form'
import MessageBox from '../../components/message-box'
import {validate} from '../../validation'
import config from '../../config'

const Login = (sources) => {
  const formProp$ = just({
    inputs: [
      {as: 'username', prop$: just({disabled: false, placeholder: 'Username', type: 'text', value: ''})},
      {as: 'password', prop$: just({disabled: false, placeholder: 'Password', type: 'password', value: ''})}
    ],
    button: {
      prop$: just({disabled: false, spinner: false, label: 'Sign In'})
    },
    http: {
      url: config.url.login,
      method: 'POST'
    },
    validation: validate(['username', 'password'])
  })

  const form = HTTPForm(sources, formProp$)
  const messageBox = MessageBox(sources, just([]), form.messages$)
  const dom$ = combine(
    (form, messageBox) => ({form, messageBox}),
    form.DOM,
    messageBox.DOM
  )
  const vtree$ = view(dom$)
  return {
    DOM: vtree$,
    HTTP: form.HTTP
  }
}

export default Login
