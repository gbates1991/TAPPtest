import * as React from 'react'
import {
  View,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { Button } from '../../shared/button'

//stores

//style
import * as styles from './type-select-screen.styles'

export interface TypeSelectScreenProps extends NavigationScreenProps<{}> {
}

export interface TypeSelectScreenState {
}

export class TypeSelectScreen extends React.Component<TypeSelectScreenProps, TypeSelectScreenState> {
  constructor(props) {
    super(props)

  }

  _gotoTop3Creation = () => {
    this.props.navigation.navigate('Create')
  }

  render() {
    return (
      <View style={styles.rootContainer}>
        <Button style={styles.typeButton} text='Top 3' preset='primary' onPress={this._gotoTop3Creation} />
        <Button style={styles.typeButtonDiabled} text='Guide' preset='primary' onPress={() => window.alert('pressed')} disabled />
        <Button style={styles.typeButtonDiabled} text='Photo' preset='primary' onPress={() => window.alert('pressed')} disabled />
        <Button style={styles.typeButtonDiabled} text='Video' preset='primary' onPress={() => window.alert('pressed')} disabled />
        <Button style={styles.typeButtonDiabled} text='Recommendation' preset='primary' onPress={() => window.alert('pressed')} disabled />
        <Button style={styles.typeButtonDiabled} text='Survey' preset='primary' onPress={() => window.alert('pressed')} disabled />
      </View>
    )
  }
}