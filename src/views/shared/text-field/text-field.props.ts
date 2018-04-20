import { TextStyle, TextInputProperties, ViewStyle } from 'react-native'

export interface TextFieldProps extends TextInputProperties {
  /**
   * The placeholder i18n key.
   **/
  placeholderTx?: string

  /**
   * The Placeholder text if no placeholderTx is provided.
   **/
  placeholder?: string

  /**
   * The label i18n key.
   **/
  labelTx?: string

  /**
   * The label text if no labelTx is provided.
   **/
  label?: string

  /**
   * The error text.
   **/
  error?: string

  /**
   * The i18n error text.
   **/
  errorTx?: string

  /**
   * Hide error.
   */
  hideError?: boolean

  /**
   * Optional container style overrides useful for margins & padding
   **/
  style?: ViewStyle

  /**
   * Optional style overrides for the input.
   **/
  inputStyle?: TextStyle

  /**
   * Various look & feels.
   **/
  preset?: 'default'

  /**
   * Optional parameter toggle right button
   **/
  renderRight?: React.ReactNode

  /**
   * Optional parameter toggle left button
   **/
  renderLeft?: React.ReactNode
}