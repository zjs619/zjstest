import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import cx from 'classnames'

import Dropdown from '../../Dropdown'
import { I18N } from '../../util'

import { ThemeLoading } from '../styled'

export default class HtmlUrlInput extends PureComponent {
  static propTypes = {
    readOnly: PropTypes.bool,
    value: PropTypes.string,
    onUpdateAppToken: PropTypes.func,
    handleTrack: PropTypes.func,
    locale: PropTypes.oneOf([ 'zh-CN', 'en' ])
  }

  constructor (props) {
    super(props)
    this.state = {
      isUpdatingAppToken: false,
      isOpen: false
    }
  }

  handleUpdateAppToken = async (e) => {
    const { handleTrack } = this.props
    this.onToggle(false)
    const { onUpdateAppToken } = this.props

    this.setState({ isUpdatingAppToken: true })
    await new Promise(resolve => setTimeout(resolve, 500))
    onUpdateAppToken()
    this.setState({ isUpdatingAppToken: false })

    handleTrack && handleTrack('click_Reset')
  }

  onToggle = isOpen => this.setState({ isOpen })

  render () {
    const { value, readOnly, handleTrack, locale } = this.props
    const { isUpdatingAppToken, isOpen } = this.state

    return (
      <div className={cx('html-url-input', { 'read-only': readOnly })}>
        <input
          type="text"
          id="sharing-url"
          readOnly
          className="html-input"
          value={value}
          onDoubleClick={() => handleTrack && handleTrack('click_URL')}
        />
        {
          !readOnly && <Dropdown
            mode="dark"
            openerType="custom"
            x={170}
            y={32}
            isOpen={isOpen}
            onToggle={this.onToggle}
            menuClassName="updating-app-token-confirmation"
            openerClassName={`html-button is-state-${Number(isUpdatingAppToken)}`}
            opener={
              <button type="button">
                <span className="state state-0 close-button">{I18N.sharingMenu.reset[ locale ]}</span>
                <span className="state state-1">{ isUpdatingAppToken && <ThemeLoading className="loading" /> }</span>
              </button>
            }
            menu={
              <React.Fragment>
                <p>{I18N.sharingMenu.resetTips[ locale ]}</p>
                <div className="footer">
                  <button onClick={this.handleUpdateAppToken}>{I18N.sharingMenu.next[ locale ]}</button>
                  <button onClick={() => { this.onToggle(false) }}>{I18N.sharingMenu.cancel[ locale ]}</button>
                </div>
              </React.Fragment>
            }
          />
        }
      </div>
    )
  }
}
