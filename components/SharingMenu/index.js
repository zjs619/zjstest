import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Clipboard from 'clipboard'
import cx from 'classnames'

import HtmlUrlInput from './HtmlUrlInput'
import WorkSpaceSelect from '../WorkSpaceSelect'
import { I18N } from '../util'
import { getSharingUrl, getAccessList, fetchPutJSON, getRandomCid, DESIGNDRAFT } from './utils'
import { StyledSharingMenu, StyledUpdatingAppTokenConfirmationGlobalStyle } from './styled'

const CHECKED = <svg width="8" height="6" className="checked-icon" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-2 -3)" fill="none" fillRule="evenodd"><rect width="12" height="12" rx="1.867"/><path d="M2.4 5.883a.64.64 0 00.194.471l1.949 1.903c.129.129.29.193.48.193a.643.643 0 00.473-.193l4.01-3.93a.627.627 0 00.202-.468.614.614 0 00-.201-.465.667.667 0 00-.479-.194.667.667 0 00-.479.194l-3.526 3.46-1.472-1.441a.667.667 0 00-.479-.194.667.667 0 00-.478.194.64.64 0 00-.194.47z" fill="#F2F4F5"/></g></svg>

export default class SharingMenu extends PureComponent {
  static propTypes = {
    userId: PropTypes.number,
    project: PropTypes.object,
    showNoticeTip: PropTypes.func,
    handleTrack: PropTypes.func,
    footer: PropTypes.any,
    locale: PropTypes.oneOf([ 'zh-CN', 'en' ])
  }

  static defaultProps = {
    locale: 'zh-CN'
  }

  constructor (props) {
    super(props)
    this.state = {
      isURLCopied: false,
      isUpdatingAppToken: false,
      accessPwd: props.project.password,
      shareAccess: props.project.access === 'private' && !props.project.password ? 'public' : props.project.access
    }
  }

  componentDidMount () {
    this.clipboard = new Clipboard('#preview-copy-btn')
  }
  componentWillUnmount () {
    this.clipboard = null
  }

  handleUpdateProject = ({ name, value }) => {
    const { project } = this.props

    project[ name ] = value
    if (name === 'password' && project.access !== 'private') {
      project.access = 'private'
    }

    if (project.cid) {
      fetchPutJSON(`/api/web/v3/project_upper/project_basics/${project.cid}`, project).catch(console.error)
    }
  }

  handleUpdateAccessToken = () => {
    const newToken = getRandomCid()
    this.handleUpdateProject({ name: 'access_token', value: newToken })
    this.setState({ isUpdatingAppToken: true })
  }

  handleCopyURL = () => {
    const { handleTrack } = this.props
    this.setState({ isURLCopied: true, isUpdatingAppToken: false })
    handleTrack && handleTrack('click_CopyURL')

    clearTimeout(this.copyURLTimeout)
    this.copyURLTimeout = setTimeout(() => this.setState({ isURLCopied: false }), 3000)
  }

  handleChangeSelect = (value) => {
    const { showNoticeTip, locale } = this.props
    const { accessPwd } = this.state
    this.setState({ shareAccess: value })
    if (value === 'public') {
      showNoticeTip(I18N.sharingMenu.public[ locale ])
      this.handleUpdateProject({ name: 'access', value })
    } else if (value === 'restricted') {
      showNoticeTip(I18N.sharingMenu.restricted[ locale ])
      this.handleUpdateProject({ name: 'access', value })
    } else if (value === 'private') {
      accessPwd !== '' && this.handleUpdateProject({ name: 'password', value: accessPwd })
      showNoticeTip(I18N.sharingMenu.private[ locale ])
    }
  }

  handleChangePwd = (e) => {
    this.setState({ accessPwd: e.target.value })
  }

  handleSavePwd = () => {
    const { showNoticeTip, locale } = this.props
    const { accessPwd } = this.state
    if (!accessPwd || !accessPwd.length) {
      showNoticeTip(I18N.sharingMenu.emptyPassword[ locale ], 'warning')
    } else {
      this.handleUpdateProject({ name: 'password', value: accessPwd })
      showNoticeTip(I18N.sharingMenu.setPasswordSuccess[ locale ])
    }
  }

  render () {
    const { project, userId, handleTrack, locale } = this.props
    const { isURLCopied, accessPwd, shareAccess, isUpdatingAppToken } = this.state

    const { accesses, access_token: accessToken, is_org_project: isOrgProject, type, cid } = project
    const showPwdInput = shareAccess === 'private'
    const canEdit = accesses[ userId ] === 'project_owner' || accesses[ userId ] === 'project_member'

    const sharingUrl = getSharingUrl(accessToken, type, cid)
    const optionList = getAccessList(isOrgProject, locale)
    const accessLabel = optionList.find(i => i.value === shareAccess)?.accessLabel

    return <StyledSharingMenu className="share-url-action">
      <div>
        <div className="header-first-line">{I18N.sharingMenu.shareAccess[ locale ]}</div>
        {locale !== 'mockitt-en' && <div className="header-second-line">{accessLabel}</div>}
      </div>

      <div className={cx('access-url', { 'update-tips': isUpdatingAppToken })}>
        <HtmlUrlInput
          readOnly={type === DESIGNDRAFT ? true : !canEdit}
          value={sharingUrl || ''}
          onUpdateAppToken={this.handleUpdateAccessToken}
          handleTrack={handleTrack}
          locale={locale}
        />
        <button id="preview-copy-btn" type="button" className={cx('copy', 'url-copy-button', `is-state-${Number(isURLCopied)}`)} onClick={this.handleCopyURL} data-clipboard-target="#sharing-url">
          <span className={cx('state state-0', { 'red-dot': isUpdatingAppToken })}>{I18N.sharingMenu.copy[ locale ]}</span>
          <div className="state state-1">{CHECKED}</div>
        </button>
        <span className={cx('tips', locale === 'zh-CN' ? 'zh-CN' : '')}>{I18N.sharingMenu.tips[ locale ]}</span>
      </div>

      { canEdit && <div className="access-rights">
        <p>{I18N.sharingMenu.access[ locale ]}</p>
        <WorkSpaceSelect
          optionList={optionList}
          value={shareAccess}
          onChange={this.handleChangeSelect}
        />
      </div> }
      {
        canEdit && showPwdInput && <div className="pwd-input">
          <input type="text" className="html-input" value={accessPwd} onChange={this.handleChangePwd} />
          <p className="change-pwd-btn" onClick={this.handleSavePwd}>{I18N.sharingMenu.savePassword[ locale ]}</p>
        </div>
      }
      {this.props.footer}
      <StyledUpdatingAppTokenConfirmationGlobalStyle />
    </StyledSharingMenu>
  }
}
