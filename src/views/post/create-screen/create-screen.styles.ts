import { color } from '../../theme'
import { typography } from '../../theme/typography'
import { ViewStyle, TextStyle } from 'react-native'

export const rootContainer: ViewStyle = {
  flex: 1,
  backgroundColor: 'white',
  padding: 20,
  paddingTop: 50
}

export const confirmButton: ViewStyle = {
  margin: 10,
}

export const backButton: ViewStyle = {
  margin: 10,
}

export const buttonsContainer: ViewStyle = {
  flexDirection: 'row',
  backgroundColor: 'transparent',
  justifyContent: 'center',
  alignItems: 'center',
}

export const linearGradient: ViewStyle = {
  marginTop: 10,
  paddingLeft: 15,
  paddingRight: 15,
  // width: 100,
  height: 50,
  borderRadius: 25,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const buttonText: TextStyle = {
  fontSize: 16,
  fontFamily: typography.primary,
  textAlign: 'center',
  margin: 10,
  color: '#ffffff',
  backgroundColor: 'transparent',
  fontWeight: '800'
}

export const customContainer: ViewStyle = {
  // alignItems: 'center',
  justifyContent: 'space-between',
  alignSelf: 'stretch',
  marginTop: 10,
  marginBottom: 10,
}

export const labelStyle: TextStyle = {
  color: '#434547',
  fontWeight: '800',
  marginBottom: 15,
  fontSize: 14,
  fontFamily: typography.primary,
}

export const uploadImageButton: ViewStyle = {
  width: 150,
  height: 40,
  backgroundColor: '#eceeef',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: '#e1e1e1',
  borderWidth: 1,
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
}

export const uploadImageButtonText: TextStyle = {
  color: '#b9babb',
  fontSize: 12,
  fontFamily: typography.primary,
}

export const customContainerRadioButtons: ViewStyle = {
  alignSelf: 'stretch',
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: '#c7c7c7',
  borderWidth: 1,
  borderRadius: 4,
  flexDirection: 'row',
}

export const singleRadioButton: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  borderColor: '#c7c7c7',
  borderRightWidth: 1,
  padding: 15,
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 10,
}

export const singleRadioButtonRight: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  padding: 15,
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 10,
}

export const RadioImage: ViewStyle = {
  width: 30,
  height: 30,
}

export const RadioTitle: TextStyle = {
  fontSize: 12,
  color: '#474b4d',
  marginTop: 12,
  fontFamily: typography.primary,
  fontWeight: 'bold'
}