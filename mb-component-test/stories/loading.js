import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'

import Root from './components/root'
import Loading from '../components/Loading'

storiesOf('Loading', module)
  .add('modao', () => (
    <Root>
      <StyledLoading className="mb-loading" isNormal={false} />
    </Root>
  ))

  .add('normal', () => (
    <Root>
      <StyledLoading className="mb-loading" isNormal={true} />
    </Root>
  ))

const StyledLoading = styled(Loading)`
  &.mb-loading {
    width: 100px;
    height: 100px;
  }
`
