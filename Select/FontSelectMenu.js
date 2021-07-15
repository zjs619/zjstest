import React, { createRef, PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from 'react-event-listener'

import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isElement from 'lodash/isElement'

import { trimList, preparePortal, $, preventScrollingPropagation } from '@ibot/ibot/lib/util'
import { positionMenu, checkOptionByValue } from './utils'
import { Option, Group } from './index'
import { StyledSelectMenu } from './styles'
import { SVGIcon } from '../Icon'

const MENU_ROOT_ID = 'IBOT_SELECT_MENU_ROOT'

export const $menuRoot = (
  document.getElementById(MENU_ROOT_ID) ||
  Object.assign(document.createElement('div'), { id: MENU_ROOT_ID })
)

export class FontSelectMenu extends PureComponent {
  state = {
    isDownward: true
  }

  portal = preparePortal($menuRoot, 'SelectMenuPortal')

  static propTypes = {
    menuTheme: PropTypes.string,
    menuClassName: PropTypes.string,
    emptyMsg: PropTypes.string,
    optionList: PropTypes.arrayOf(
      PropTypes.oneOfType([
        // Regular options:
        PropTypes.node,
        PropTypes.shape({
          label: PropTypes.node,
          value: PropTypes.any,
          isDisabled: PropTypes.bool
        }),

        // Option groups:
        PropTypes.arrayOf(
          PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.shape({
              label: PropTypes.node,
              value: PropTypes.any,
              isDisabled: PropTypes.bool
            })
          ])
        )
      ])
    ).isRequired,

    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),

    isDisabled: PropTypes.bool,
    isRightAlign: PropTypes.bool,
    onChange: PropTypes.func,
    isOpen: PropTypes.bool,

    canSelect: PropTypes.bool,
    onClose: PropTypes.func,
    $select: PropTypes.instanceOf(Element),
    missingFont: PropTypes.string
  }

  static defaultProps = {
    isOpen: false,
    isTransform: false
  }

  menuBaseRef = createRef()

  menuContainerRef = createRef()

  fontTipRef = createRef()

  componentDidMount () {
    const { menuBaseRef: { current: $menuBase } } = this
    preventScrollingPropagation($('.WorkspaceSelectMenu', $menuBase))
    this.position()
  }

  componentWillUnmount () {
    if (this.portal) this.portal.remove()
  }

  position = e => {
    const { $select, isRightAlign } = this.props
    const { menuBaseRef: { current: $menuBase }, menuContainerRef: { current: $menuContainer }, fontTipRef: { current: $fontTip } } = this

    if (e) {
      const $target = get(e, 'target')
      if ($target && isElement($target) && $target.matches('.WorkspaceSelectMenu')) return
    }

    const { isDownward } = positionMenu({
      $menuBase,
      $opener: $select,
      isRightAlign,
      shouldSetMaxHeight: false,
      $menuContainer,
      $fontTip
    })

    this.setState({ isDownward, isTransform: true })
  }

  onChange = e => {
    const { onChange } = this.props
    const { isDownward } = this.state

    const $opt = e.currentTarget
    const $menuBase = $opt.closest('.WorkspaceSelectMenu')

    if (!$opt || !$menuBase) {
      return this.onlose()
    }

    const { top: topOf$opt, bottom: bottomOf$opt } = $opt.getBoundingClientRect()
    const { top: topOf$menuBase, bottom: bottomOf$menuBase } = $menuBase.getBoundingClientRect()

    if (
      (isDownward && topOf$opt >= topOf$menuBase) ||
      (!isDownward && bottomOf$opt <= bottomOf$menuBase)
    ) {
      if ($opt.classList.contains('title')) return

      return onChange(e)
    }

    return this.onClose()
  }

  onClose = () => {
    const { onClose } = this.props

    onClose()
  }

  onClickOutside = ({ target }) => {
    const { $select } = this.props

    const isOutsideMenu = !$menuRoot.contains(target)

    const closestLabel = target.closest('label')
    const isOwnLabel = closestLabel && closestLabel.contains($select)

    if (isOutsideMenu && !isOwnLabel) {
      this.onClose()
    }
  }

  render () {
    return createPortal(this.menu, this.portal)
  }

  get menu () {
    const {
      isOpen,
      isDisabled,
      menuTheme, menuClassName,
      optionList,
      emptyMsg,
      value,
      canSelect,
      missingFont
    } = this.props

    const { isDownward, isTransform } = this.state

    const isEmpty = optionList.length === 0

    const klass = trimList([
      'WorkspaceSelectMenu',
      menuClassName,
      isTransform && 'is-open',
      isDownward ? 'is-downward' : 'is-upward',
      isDisabled && 'is-disabled',
      isEmpty && 'is-empty',
      canSelect ? 'can-select' : 'cant-select'
    ])

    const fontStyle = trimList([
      'font-select-menu-tip',
      'is-show'
    ])

    return (
      <StyledSelectMenu ref={this.menuBaseRef} >
        <ul className={klass} ref={this.menuContainerRef} >
          {
            isEmpty
              ? <li className="SelectOption empty-msg">{ emptyMsg }</li>
              : <>
                {missingFont !== '' && <div className="missingFont"><SVGIcon name="design/notify/checked"/>{missingFont}</div>}
                {
                  optionList
                    .map((option, idx) => (
                      isArray(option)
                        ? <Group
                          key={idx}
                          menuTheme={menuTheme}
                          optionList={option}
                          value={value}
                          onChange={this.onChange}
                        />
                        : <Option
                          key={idx}
                          menuTheme={menuTheme}
                          isActive={checkOptionByValue(option, value)}
                          option={option}
                          isDisabled={option.isDisabled}
                          onChange={this.onChange}
                        />
                    ))
                }
              </>
          }
        </ul>
        <div className={fontStyle} ref={this.fontTipRef}>
          {I18N.Common.font_commercial_use_info}
          <a
            target="_blank"
            className="font-link"
            rel="noopener noreferrer"
            href={I18N.link.link_article_business_font_state}
          >
            {/* 字体商用问题 posts 帖子 */}
            {I18N.Common.learn_more}
          </a>
        </div>

        { isOpen && (
          <EventListener
            target={document}
            onClick={this.onClickOutside}
          />
        )}
      </StyledSelectMenu>
    )
  }
}
