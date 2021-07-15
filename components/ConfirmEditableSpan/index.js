import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import cx from 'classnames'
import Ellipsis from '../Ellipsis'

import { StyledEditableSpan } from './styles'

export default class ConfirmEditableSpan extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    isEditing: PropTypes.bool,
    onConfirm: PropTypes.func,
    isShowToolTips: PropTypes.bool
  }

  static defaultProps = {
    isShowToolTips: false
  }

  constructor (props) {
    super(props)
    this.state = {
      value: props.value
    }
    this.initialValue = props.value
  }

  handleChange = (value) => this.setState({ value })

  handleBlur = () => {
    if (this.state.value === '') {
      this.setState({ value: this.initialValue })
    }
    this.props.onConfirm(this.state.value)
  }

  render () {
    const { isEditing, className, isShowToolTips } = this.props
    const { value } = this.state

    return (
      <EditableSpan
        value={value}
        className={className}
        editing={isEditing}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        isShowToolTips={isShowToolTips}
      />
    )
  }
}

class EditableSpan extends PureComponent {
  static propTypes = {
    editing: PropTypes.bool,
    value: PropTypes.string,
    className: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    isShowToolTips: PropTypes.bool
  }

  static defaultProps = {
    onFocus: () => {},
    onChange: () => {},
    isShowToolTips: false
  }

  setElementRef = ref => (this.textarea = ref)

  componentDidMount () {
    // 新创建的页面直接select
    if (this.props.editing) {
      this.cacheValue = this.props.value
      this.textarea.select()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    // 如果是首次进入编辑状态, focus + select
    if (!prevProps.editing && this.props.editing) {
      /**
       * chrome bug: 此处focus然后select textarea将导致界面布局异常
       * 解决: 跳过focus()直接select()
       */
      this.cacheValue = this.props.value
      this.textarea.select()
    }
  }

  handleFocus = () => {
    this.props.onFocus()
  }

  handleChange = (e) => {
    const { onChange } = this.props
    const { value } = e.target
    onChange(value)
  }

  handleBlur = () => {
    this.props.onBlur()
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.handleBlur()
    } else if (e.key === 'Escape') {
      this.props.onChange(this.cacheValue)
      this.cacheValue = null
      this.handleBlur()
    }
  }

  handleStopPropagation (e) {
    e.stopPropagation()
  }

  render () {
    const { editing, value, className, isShowToolTips } = this.props
    return (
      editing
        ? <StyledEditableSpan className={cx('is-editing', className)} onClick={this.handleStopPropagation}>
          <textarea
            ref={this.setElementRef}
            value={value}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
          />
        </StyledEditableSpan>
        : <StyledEditableSpan className={className}>
          {isShowToolTips ? <Ellipsis arrowed={false}>{value}</Ellipsis> : value }
        </StyledEditableSpan>
    )
  }
}
