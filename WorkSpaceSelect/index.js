import React, { createRef, PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import EventListener from 'react-event-listener'

import get from 'lodash/get'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'
import isElement from 'lodash/isElement'
import Ellipsis from '../Ellipsis'
import { trimList, preparePortal, $, preventScrollingPropagation } from '../util'
import { positionMenu, getOptionLabel, getOptionValue, checkOptionByValue, INPUT_ARROW } from './utils'
import { StyledSelect, StyledSelectMenu } from './styles'

const MENU_ROOT_ID = 'IBOT_SELECT_MENU_ROOT'

export const $menuRoot = (
  document.getElementById(MENU_ROOT_ID) ||
  Object.assign(document.createElement('div'), { id: MENU_ROOT_ID })
)

const $body = document.body

if (!$body.contains($menuRoot)) {
  $body.appendChild($menuRoot)
}

export default class WorkSpaceSelect extends PureComponent {
  state = {
    isOpen: false,

    prevProps: this.props,
    value: this.props.value
  }

  static propTypes = {
    size: PropTypes.oneOf([ 'regular', 'small' ]),
    theme: PropTypes.oneOf([ 'core', 'plain' ]),
    menuTheme: PropTypes.oneOf([ 'core', 'plain', 'check' ]),

    unstyled: PropTypes.bool,

    className: PropTypes.string,
    menuClassName: PropTypes.string,

    placeholder: PropTypes.string,

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
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,

    onChange: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  }

  static defaultProps = {
    size: 'regular',
    theme: 'plain',
    menuTheme: 'plain',

    className: '',
    menuClassName: '',

    placeholder: 'Choose one…',
    emptyMsg: 'Nothing to display…',
    optionList: [],
    isDisabled: false,

    onChange: () => null,
    onMouseEnter: () => null,
    onMouseLeave: () => null
  }

  static getDerivedStateFromProps (props, { prevProps, value }) {
    if (!isEqual(prevProps, props)) {
      return { prevProps: props, value: props.value }
    }
    return null
  }

  componentDidMount () {
    window.addEventListener('resize', this.onResizeWindow)
  }

  get isDisabled () {
    const { isDisabled, disabled } = this.props
    return isDisabled || disabled
  }

  get readOnly () {
    return this.props.readOnly
  }

  get canSelect () {
    const { isDisabled, readOnly } = this
    return !isDisabled && !readOnly
  }

  set$select = $select => this.setState({ $select })

  open = () => this.setState({ isOpen: true })
  close = () => this.setState({ isOpen: false })
  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  onResizeWindow = () => this.state.isOpen && this.close()

  onChange = value => this.setState(
    { value },
    () => {
      this.close()
      this.props.onChange(value, this.props.attr)
    }
  )

  onSelect = ({ currentTarget: $opt }) => {
    const { value } = this.props
    const { canSelect } = this

    return this.onChange(canSelect ? $opt.dataset.value : value)
  }

  get displayText () {
    const { optionList, placeholder } = this.props
    const { value } = this.state

    const group = optionList.find(g => (
      isArray(g) && g.slice(0).some(o => checkOptionByValue(o, value))
    ))

    const option = (group || optionList).find(o => (
      !isArray(o) && checkOptionByValue(o, value)
    ))

    return option ? getOptionLabel(option) : placeholder
  }

  render () {
    const { size, unstyled, className, isFontSelectMenu, onMouseEnter, onMouseLeave } = this.props
    const { isOpen, $select, value } = this.state
    const { isDisabled, readOnly, canSelect } = this

    const klass = trimList([
      'WorkspaceSelect',
      size,
      unstyled && 'unstyled',
      className,
      isOpen && 'is-open',
      isDisabled && 'is-disabled',
      readOnly && 'readonly'
    ])

    return (
      <StyledSelect
        className={klass}
        role="listbox"
        ref={this.set$select}
      >
        <button onClick={this.toggle} disabled={isDisabled}>
          {this.displayText}
        </button>

        <span className="caret" dangerouslySetInnerHTML={{ __html: INPUT_ARROW }} />

        {
          isOpen && (
            <SelectMenu
              isOpen={isOpen}
              {...this.props}
              value={value}
              $select={$select}

              canSelect={canSelect}
              onChange={this.onSelect}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onClose={this.close}
            />
          )
        }
      </StyledSelect>
    )
  }
}

export class SelectMenu extends PureComponent {
  state = {
    isDownward: true
  }

  portal = preparePortal($menuRoot, 'SelectMenuPortal')

  static propTypes = {
    ...WorkSpaceSelect.propTypes,
    isOpen: PropTypes.bool,

    canSelect: PropTypes.bool,
    onChange: PropTypes.func,
    onClose: PropTypes.func,
    $select: PropTypes.instanceOf(Element)
  }

  static defaultProps = {
    isOpen: false,
    isTransform: false
  }

  menuBaseRef = createRef()

  menuContainerRef = createRef()

  componentDidMount () {
    const { menuBaseRef: { current: $menuBase } } = this
    preventScrollingPropagation($('.WorkspaceSelectMenu', $menuBase))
    this.position()
  }

  componentWillUnmount () {
    if (this.portal) this.portal.remove()
  }

  position = e => {
    const { $select } = this.props
    const { menuBaseRef: { current: $menuBase }, menuContainerRef: { current: $menuContainer } } = this

    if (e) {
      const $target = get(e, 'target')
      if ($target && isElement($target) && $target.matches('.WorkspaceSelectMenu')) return
    }

    const { isDownward } = positionMenu({
      $menuBase,
      $opener: $select,

      shouldSetMaxHeight: false,
      $menuContainer
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
      // eslint-disable-next-line no-mixed-operators
      isDownward && topOf$opt >= topOf$menuBase ||
      // eslint-disable-next-line no-mixed-operators
      !isDownward && bottomOf$opt <= bottomOf$menuBase
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
      onMouseEnter,
      onMouseLeave
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

    return (
      <StyledSelectMenu ref={this.menuBaseRef}>
        <ul className={klass} ref={this.menuContainerRef}>
          {
            isEmpty
              ? <li className="SelectOption empty-msg" role="empty-msg">{emptyMsg}</li>
              : (
                optionList.map((option, idx) => (
                  isArray(option)
                    ? <Group
                      key={idx}
                      menuTheme={menuTheme}
                      optionList={option}
                      value={value}
                      onChange={this.onChange}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                    />
                    : <Option
                      key={idx}
                      menuTheme={menuTheme}
                      isActive={checkOptionByValue(option, value)}
                      option={option}
                      isDisabled={option.isDisabled}
                      onChange={this.onChange}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                    />
                ))
              )
          }
        </ul>

        {isOpen && (
          <EventListener
            target={document}
            onClick={this.onClickOutside}
          />
        )}
      </StyledSelectMenu>
    )
  }
}

export function Group ({
  value,
  optionList: [ title, ...optionList ],
  menuTheme,
  onChange,
  onMouseEnter,
  onMouseLeave
}) {
  return (
    <li className="SelectGroup">
      {
        title === 'HIDDELINE'
          ? null
          : title === 'DIVIDER'
          ? <div className="divider" />
          : <Ellipsis className="title" onClick={onChange}>{title}</Ellipsis>}

      <ul>
        {
          optionList.map((option, idx) => (
            <Option
              key={idx}
              menuTheme={menuTheme}
              option={option}
              isActive={checkOptionByValue(option, value)}
              isDisabled={option.isDisabled}
              onChange={onChange}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            />
          ))
        }
      </ul>
    </li>
  )
}

Group.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  optionList: PropTypes.array,
  onChange: PropTypes.func,
  menuTheme: PropTypes.string,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}

export function Option ({
  option,
  isActive,
  isDisabled,
  menuTheme,
  onChange,
  onMouseEnter,
  onMouseLeave
}) {
  const className = trimList([
    'SelectOption',
    isActive && 'is-active',
    isDisabled && 'is-disabled'
  ])

  const label = getOptionLabel(option)
  const value = getOptionValue(option)

  return (
    <li
      role="option"
      data-value={value}
      className={className}
      onClick={isDisabled ? undefined : onChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Ellipsis>{label}</Ellipsis>
    </li>
  )
}

Option.propTypes = {
  isActive: PropTypes.bool,
  option: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object
  ]),
  isDisabled: PropTypes.bool,
  menuTheme: PropTypes.string,
  onChange: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}
