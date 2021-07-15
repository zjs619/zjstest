import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { I18N } from '../util'

import { StyledErrorPage } from './style'

export default class ErrorPage extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    preset: PropTypes.oneOf([ 403, 404, 401 ]),
    locale: PropTypes.oneOf([ 'zh-CN', 'en' ])
  }

  static defaultProps = {
    locale: 'zh-CN'
  }

  render () {
    const { preset, locale, title, desc } = this.props
    const titleContent = title || I18N.errorPage[ `title_${preset}` ][ locale ]
    const descContent = desc || I18N.errorPage[ `desc_${preset}` ][ locale ]

    return (
      <StyledErrorPage id="content">
        <div className="logo">
          <a href="/">
            <img src="https://modao.cc/images/logo-full.png" />
          </a>
        </div>
        <h3>{titleContent}</h3>
        <p>{descContent}</p>
        <div className="action">
          <a href="/">{I18N.errorPage.back[ locale ]}</a>
          |
          <a href="mailto:support@mockingbot.com">{I18N.errorPage.getSupport[ locale ]}</a>
        </div>
      </StyledErrorPage>
    )
  }
}
