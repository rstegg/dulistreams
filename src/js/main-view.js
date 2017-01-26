import { html } from 'snabbdom-jsx'
import { combine } from 'most'

const mainView = ({navigation, page}) =>
  <div className='app'>
    <div className='navigation'>
      {navigation}
    </div>
    <div className='card'>
        <div className="card__image">
          <img src="http://localhost:1337/assets/head.png" />
        </div>
        <div className='page'>
          {page}
        </div>
    </div>
  </div>


const view = ({navigation$, page$}) => {
  const makeViewObj = (navigation, page) => ({navigation, page})
  return combine(
    makeViewObj
  , navigation$
  , page$
  )
  .map(mainView)
}

export default view
