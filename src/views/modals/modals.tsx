import * as React from 'react'
import { Modal, View, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'
import { ModalStore } from '../../models/modal-store'
import { PlaceSearchModal } from './place-search-modal'

import { color } from '../theme'

export interface ModalNavigatorProps {
  modalStore?: ModalStore
}

@inject('modalStore')
@observer
export class ModalNavigator extends React.Component<ModalNavigatorProps, {}> {
  closeModal = () => {
    const { close } = this.props.modalStore
    close()
  }

  getModal = () => {
    const { modal } = this.props.modalStore

    switch (modal) {
      case 'food-place-search':
        return <PlaceSearchModal />
    }
  }

  render() {
    const { isModal } = this.props.modalStore

    return (
      <Modal
        animationType='slide'
        transparent={false}
        visible={isModal}
        onRequestClose={this.closeModal}
      >
        <TouchableOpacity
          onPress={this.closeModal}
          activeOpacity={1}
          style={{ backgroundColor: color.background }}
        >
          <View style={{ paddingHorizontal: 16, paddingTop: 32, alignSelf: 'flex-start' }}>
            
          </View>
        </TouchableOpacity>
        {this.getModal()}
      </Modal>
    )
  }
}