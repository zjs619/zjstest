import React from 'react'
import { storiesOf } from '@storybook/react'

import Root from './components/root'
import ErrorPage from '../components/ErrorPage'

storiesOf('ErrorPage', module)
  .add('403', () => (
    <Root>
      <ErrorPage preset={403} />
    </Root>
  ))

  .add('404', () => (
    <Root>
      <ErrorPage preset={404} />
    </Root>
  ))
