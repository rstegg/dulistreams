import {just, combine} from 'most'
import config from '../../config'
import HTTPForm from '../../components/http-form'
import MessageBox from '../../components/message-box'
import {validate} from '../../validation'
import view from './view'

const Signup = (sources) => {
  const formProp$ = just({
    inputs: [
      {
        as: 'first_name',
        prop$: just({
          disabled: false,
          placeholder: 'First Name',
          type: 'text',
          value: ''
        })
      }, {
        as: 'last_name',
        prop$: just({
          disabled: false,
          placeholder: 'Last Name',
          type: 'text',
          value: ''
        })
      }, {
        as: 'email',
        prop$: just({
          disabled: false,
          placeholder: 'Email',
          type: 'email',
          value: ''
        })
      }, {
        as: 'password',
        prop$: just({
          disabled: false,
          placeholder: 'Password',
          type: 'password',
          value: ''
        })
      }
    ],
    button: {
      prop$: just({
        disabled: false,
        spinner: false,
        label: 'Sign Up'
      })
    },
    http: {
      url: config.url.signup,
      method: 'POST'
    },
    validation: validate(['first_name', 'last_name', 'email', 'password'])
  })
  const form = HTTPForm(sources, formProp$)
  const messageBox = MessageBox(sources, just([]), form.messages$)
  const isSuccess = (el) => el.type === 'success'
  const route$ = form.messages$
    .filter(m => m.every(isSuccess))
    .constant('/login')
    .delay(2000)
  const dom$ = combine(
    (form, messageBox) => ({form, messageBox}),
    form.DOM,
    messageBox.DOM
  )
  const vtree$ = view(dom$)
  return {
    DOM: vtree$,
    HTTP: form.HTTP,
    router: route$
  }
}

export default Signup
