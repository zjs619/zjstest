import React from 'react'
import { storiesOf } from '@storybook/react'

import Root from './components/root'
import SharingMenu from '../components/SharingMenu'

const project = { access_token: 'ooooo', accesses: { '888': "project_owner", '465': 'project_viewer', '466': 'project_member' }, owner_id: '888', is_org_project: true, access: 'private', password: '11' }
const showNoticeTip = (msg) => console.log(msg)

storiesOf('ShareMenu', module)
  .add('Share', () => (
    <Root>
      <SharingMenu userId={'466'} project={project} showNoticeTip={showNoticeTip} />
    </Root>
  ))
