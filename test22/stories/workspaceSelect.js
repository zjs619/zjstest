import React, {PureComponent} from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import Root from './components/root'
import WorkSpaceSelect from '../components/WorkSpaceSelect'

const optionList = [
  { value: 'public', label: '所有人可见' },
  { value: 'restricted', label: '仅企业成员可见' },
  { value: 'private', label: '可凭密码访问' }
]

storiesOf('Select', module)
  .add('Workspace Select', () => (
    <Root>
      <WorkSpaceSelectExample />
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

const StyledWorkSpaceSelectExample= styled(WorkSpaceSelect)`
  &.WorkspaceSelect {
    margin-top: 100px;
  }
`
