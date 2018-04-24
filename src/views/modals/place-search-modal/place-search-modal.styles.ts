import { color } from '../../theme'
import { ViewStyle, ImageStyle, TextStyle } from 'react-native'

export const rootContainer: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  padding: 20,
}

export const candidateContainer: ViewStyle = {
  flexDirection: 'row',
  margin: 5,
}

export const icon: ImageStyle = {
  width: 30,
  height: 30,
  margin: 10,
}

export const locationContainer: ViewStyle = {
  flex: 1,
}

export const locationName: TextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  color: 'white',
}
export const locationAddress: TextStyle = {
  fontSize: 10,
  color: 'white',
}
