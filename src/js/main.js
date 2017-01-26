import { just } from 'most'
// import {async} from 'most-subject'
import view from './main-view.js'
import Router from './components/router'
import Navigation from './components/navigation'

import Home from './pages/home'
// import Slideshow from './pages/slideshow/slideshow-index'
import SignUp from './pages/sign-up'
import Login from './pages/login'

const navPropDefault$ = just([
  {href: '/', title: ''},
  {href: '/login', title: 'Login', active: true},
  {href: '/sign-up', title: 'Signup'}
])

// const navPropLogedIn$ = just([
//   {href: '/', title: 'Starbugs'},
// ])

const routerProps = {
  '/': Home,
  '/login': Login,
  '/sign-up': SignUp
}

const main = (sources) => {
  // const routeProxy$ = async()
  const page = Router(sources, routerProps)
  const navigation = Navigation(sources, navPropDefault$, page.router)

  const view$ = view({navigation$: navigation.DOM, page$: page.DOM})
  const route$ = navigation.router
    .startWith('/login')
    .skipRepeats()
  const http$ = page.HTTP
  return {
    DOM: view$,
    HTTP: http$,
    router: route$
  }
}

export default main
