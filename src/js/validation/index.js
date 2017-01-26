import {curry} from 'ramda'

const first_name = (data) => {
  return data['first_name'].match(/^[a-z ,.'-]+$/i).length
       ? ''
       : 'First name is not valid.'
}
const last_name = (data) => {
  return data['last_name'].match(/^[a-z ,.'-]+$/i).length
       ? ''
       : 'First name is not valid.'
}

const email = (data) => {
  return data['email'].length < 5 ||
         data['email'].length > 254
       ? 'E-Mail must be between 5 and 254 characters.'
       : ''
}

const password = (data) => {
  return data['password'].length < 8 ||
         data['password'].length > 39
       ? 'Password must be between 8 and 39 characters.'
       : ''
}

const validations = {first_name, last_name, email, password}

const validate = curry((fns, data) => {
  return fns
    .map(fnName => validations[fnName])
    .filter(x => x.length !== 0)
    .reduce((a, fn) => {
      const validationMessage = fn(data)
      return validationMessage
        ? Array.prototype.concat(a, [validationMessage])
        : a
    }, [])
})

export {validate}
