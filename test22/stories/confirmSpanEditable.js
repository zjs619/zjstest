import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import Root from './components/root'
import ConfirmEditableSpan from '../components/ConfirmEditableSpan'

storiesOf('ConfirmEditableSpan', module)
  .add('ConfirmEditableSpan', () => (
    <Root>
      <ConfirmEditableSpanExample />
    </Root>
  ))


class ConfirmEditableSpanExample extends PureComponent {
  state = {
    isNaming: true,
    name: '默认名字'
  }

  handleNameChange = (value) => {
    this.setState({ isNaming: false })
    this.setState({ name: value })
  }

  handleName = () => this.setState({ isNaming: true })

  render () {
    const { name, isNaming } = this.state
    return (
    <StyledConfirmEditableSpan>
      {
        isNaming
        ? <ConfirmEditableSpan
            isEditing={isNaming}
            className="title editable-title"
            value={name}
            onConfirm={this.handleNameChange}
          />
          : <p className="title title-text" onClick={this.handleName}>{name}</p>
      }
     </StyledConfirmEditableSpan>
    )
  }
}

const StyledConfirmEditableSpan = styled.div`
  .title {
    font-size: 14px;
    color: #1f292e;
    width: auto;
    box-shadow: none;
    padding-right: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    line-height: 14px;

    &.is-editing {
      border: unset;

      input {
        font-size: 14px;
        line-height: 14px;
        color: #1f292e;
        font-weight: normal;
      }
    }

    input {
      text-align: center;
    }
  }

  .editable-title {
    width: 100%;

    &.is-editing {
      max-width: calc(90% - 700px);

      input {
        width: 100%;
        padding: 0;
        height: 14px;
        padding-left: 7px;
      }
    }
  }

  .title-text {
    cursor: text;
    max-width: calc(80% - 700px);
  }
`
