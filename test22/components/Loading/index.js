import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import lottie from 'lottie-web'

import MODAO_LOADING_JSON from './modaoLoading.json'
import NORMAL_LOADING_JSON from './normalLoading.json'

export default class Loading extends PureComponent {
  static propTypes = {
    isNormal: PropTypes.bool,
    className: PropTypes.string
  }

  static defaultProps = {
    isNormal: true
  }

  setElementRef = ref => (this.$element = ref)

  componentDidMount () {
    const { isNormal } = this.props
    const LOADING_JSON = isNormal ? NORMAL_LOADING_JSON : MODAO_LOADING_JSON
    this.lottieRef = lottie.loadAnimation({
      container: this.$element,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: LOADING_JSON
    })
  }

  componentWillUnmount () {
    this.lottieRef.destroy()
  }

  render () {
    const { className } = this.props
    return <div ref={this.setElementRef} className={className} />
  }
}
