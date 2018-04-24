import { color } from '../../theme'
import { typography } from '../../theme/typography'
import { ViewStyle, TextStyle } from 'react-native'

export const rootContainer: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  padding: 20,
}

export const confirmButton: ViewStyle = {
  margin: 10,
}

export const customContainer: ViewStyle = {
  // alignItems: 'center',
  justifyContent: 'space-between',
  alignSelf: 'stretch',
  marginTop: 10,
  marginBottom: 10,
}

export const labelStyle: TextStyle = {
  color: 'white',
  fontWeight: '800',
  marginBottom: 15,
  fontSize: 14,
  fontFamily: typography.primary,
}

export const uploadImageButton: ViewStyle = {
  width: 150,
  height: 40,
  backgroundColor: '#2D2252',
  alignItems: 'center',
  justifyContent: 'center'
}

export const uploadImageButtonText: TextStyle = {
  color: '#9D98CB'
}

export const customContainerRadioButtons: ViewStyle = {
  alignSelf: 'stretch',
  alignItems: 'center',
}
