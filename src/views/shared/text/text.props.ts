import { TextStyle, TextProperties } from 'react-native'
import { TextPresetNames } from './text.presets'

// hack around poorly defined TextStyle
interface AnimatedTextStyle extends TextStyle {
  backgroundColor?: any
  color?: any
}

export interface TextProps extends TextProperties {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for padding & margin.
   */
  style?: AnimatedTextStyle

  /**
   * One of the different types of text presets.
   */
  preset?: TextPresetNames

  /**
   * Should we use animated text?
   */
  animated?: boolean
}
