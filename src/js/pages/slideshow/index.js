import {just} from 'most'
import {div} from '@cycle/dom'

const Slideshow = () => {
  return {
    DOM: just(
      div('.slideshow', ['Slide'])
    )
  }
}

export default Slideshow
