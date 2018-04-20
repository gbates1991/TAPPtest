import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import { inject, observer } from 'mobx-react'
import { addNavigationHelpers } from 'react-navigation'
import { RootNavigator } from './root-navigator'
import { NavigationStore } from './navigation-store'
import { ModalStore } from '../../models/modal-store'
import { color } from '../theme'
import { ModalNavigator } from '../modals'

const ROOT: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
}

interface StatefulNavigatorProps {
  navigationStore?: NavigationStore
  modalStore?: ModalStore
}

@inject('navigationStore', 'modalStore')
@observer
export class StatefulNavigator extends React.Component<StatefulNavigatorProps, {}> {
  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.navigationStore.dispatch,
      state: this.props.navigationStore.state,
    })

    return (
      <View style={ROOT}>
        <RootNavigator navigation={navigation} />
        <ModalNavigator />
      </View>
    )
  }
}
