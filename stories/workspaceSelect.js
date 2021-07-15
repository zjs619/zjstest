import React, {PureComponent} from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import Root from './components/root'
import WorkSpaceSelect from '../components/WorkSpaceSelect'

const optionList = [
  { value: '16', label: '16' },
  { value: '20', label: '20' },
  { value: '24', label: '24' },
  { value: '32', label: '32' },
  { value: '40', label: '40' },
  { value: '48', label: '48' },
  { value: '60', label: '60' },
  { value: '72', label: '72' }
]

const optionList2 = [
  { value: '16', label: '16' },
  { value: '20', label: '20' },
  { value: '24', label: '24' },
  { value: '32', label: '32' },
  { value: '40', label: '40' },
  { value: '48', label: '48' },
  { value: '60', label: '60' },
  { value: '72', label: '72' }
]

storiesOf('Select', module)
  .add('Workspace Select', () => (
    <Root>
      <WorkSpaceSelectExample />
      <WorkSpaceSelectExample2 />
    </Root>
  ))

class WorkSpaceSelectExample extends PureComponent {
  state = {
    value: 'public'
  }

  handleChangeSelect = (value) => {
    this.setState({ value })
  }

  render () {
    return (
      <StyledWorkSpaceSelectExample
        optionList={optionList}
        value={this.state.value}
        onChange={this.handleChangeSelect}
      />
    )
  }
}

class WorkSpaceSelectExample2 extends PureComponent {
  state = {
    value: 'public'
  }

  handleChangeSelect = (value) => {
    this.setState({ value })
  }

  render () {
    return (
      <StyledWorkSpaceSelectExample
        optionList={optionList2}
        value={this.state.value}
        onChange={this.handleChangeSelect}
      />
    )
  }
}

const StyledWorkSpaceSelectExample= styled(WorkSpaceSelect)`
  &.WorkspaceSelect {
    margin-top: 100px;
  }
`
