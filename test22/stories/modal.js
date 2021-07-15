import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react'
import TransitionModal from '../components/StyleModal'
import PureTransitionModal from '../components/AnimationModal'

storiesOf('Modal', module)
  .add('Customized', () => <ModalExample />)

  .add('Blank', () => <ModalExample2 />)

class ModalExample extends PureComponent {
  state = {
    isOpen: false
  }

  onClick = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  confirm = () => { }

  cancel = () => { }

  render () {
    return (
      <>
        <button onClick={this.onClick}>弹窗</button>

        <TransitionModal className={'myModal'} isOpen={this.state.isOpen} onClose={this.close} onConfirm={this.confirm} onCancel={this.cancel}>
        </TransitionModal>
      </>
    )
  }
}

class ModalExample2 extends PureComponent {
  state = {
    isOpen: false,
    canCloseOnClickMask: true
  }

  onClick = () => this.setState({ isOpen: true })

  close = () => this.setState({ isOpen: false })

  render () {
    return (
      <>
        <button onClick={this.onClick}>弹窗</button>

        <PureTransitionModal className={'myModal'} isOpen={this.state.isOpen} onClose={this.close} canCloseOnClickMask={this.state.canCloseOnClickMask}>
          <header onClick={this.close}>Im header under Modal component</header>
        </PureTransitionModal>
      </>
    )
  }
}
