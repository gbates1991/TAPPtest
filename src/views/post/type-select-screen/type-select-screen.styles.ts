import { color } from '../../theme'
import { ViewStyle } from 'react-native'

export const rootContainer: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  padding: 20,
}

export const typeButton: ViewStyle = {
  margin: 10,
}

export const typeButtonDiabled: ViewStyle = {
  margin: 10,
  backgroundColor: color.dim,
}
