import 'babel-polyfill'
import '../less/main.less'

import { run } from '@cycle/most-run'
import { makeDOMDriver } from '@cycle/dom'
import { createHashHistory } from 'history'
import { makeRouterDriver } from 'cyclic-router'
import { makeHTTPDriver } from './drivers/http-driver'
import storageDriver from '@cycle/storage'
import switchPath from 'switch-path'
import Main from './main'

const drivers = {
  DOM: makeDOMDriver('#app'),
  HTTP: makeHTTPDriver(),
  router: makeRouterDriver(createHashHistory(), switchPath),
  storage: storageDriver
}

run(Main, drivers)
