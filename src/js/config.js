const host = 'http://localhost'
const vers = '/'
const port = 3030

const config = {
  url: {
    init: host + ':' + port + vers + 'init/',
    signup: host + ':' + port + vers + 'signup',
    login: host + ':' + port + vers + 'auth/local'
  }
}

export default config
