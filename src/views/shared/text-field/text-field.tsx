import * as React from 'react'
import { Animated, TextInput, TextStyle, View, ViewStyle } from 'react-native'
import { color, spacing, typography } from '../../theme'
import { translate } from '../../../i18n'
import { Text } from '../text'
import { TextFieldProps } from './'

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingTop: spacing[4],
}

const FIELD: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: color.field,
  borderRadius: 2,
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  borderRadius: 2,
  flex: 1,
  fontFamily: typography.primary,
  color: color.secondary,
  fontSize: 14,
  lineHeight: 22,
  height: 38,
  backgroundColor: color.field,
  paddingLeft: spacing[4],
  paddingVertical: spacing[2],
}

// the base styling for the label above the TextInput
const LABEL: TextStyle = {
  paddingBottom: spacing[4],
}

// currently we have no presets, but that changes quickly when you build your aspp
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldState {
  isFocused: boolean
  withError: any
  value: string
}

/**
 * A component which has a label and an input together.
 */
export class TextField extends React.PureComponent<TextFieldProps, TextFieldState> {
  constructor(props) {
    super(props)

    this.state = {
      isFocused: true,
      withError: new Animated.Value(0),
      value: props.value,
    }
  }

  componentDidMount() {
    this.shouldShowError()
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      this.setState({ value: props.value }, () => {
        this.shouldShowError()
      })
    }
  }

  focus() {
    (this.refs.TextInput as any).focus()
  }

  onBlur = () => {
    this.setState({ isFocused: false }, () => {
      this.shouldShowError()
    })
    const { onBlur } = this.props
    onBlur && onBlur()
  }

  onFocus = () => {
    this.setState({ isFocused: true }, () => {
      this.shouldShowError()
    })
    const { onFocus } = this.props
    onFocus && onFocus()
  }

  shouldShowError = () => {
    const { error, errorTx } = this.props
    const { isFocused, withError, value } = this.state

    if (value && !isFocused && (errorTx || error)) {
      Animated.spring(withError, { toValue: 1 }).start()
    } else {
      Animated.spring(withError, { toValue: 0 }).start()
    }
  }

  render() {
    const {
      preset = 'default',
      hideError = false,
      placeholderTx,
      placeholder,
      labelTx,
      label,
      errorTx,
      error,
      style: styleOverride,
      inputStyle: inputStyleOverride,
      renderRight,
      renderLeft,
      ...rest,
    } = this.props
    const containerStyle: ViewStyle = { ...CONTAINER, ...PRESETS[preset], ...styleOverride }
    const inputStyle: TextStyle = { ...INPUT, ...inputStyleOverride }
    const actualPlaceholder = placeholderTx ? translate(placeholderTx) : placeholder
    const labelStyle: TextStyle = { ...LABEL }
    const hasLabel = label || labelTx
    const errorStyle = {
      opacity: this.state.withError.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    }

    return (
      <View style={containerStyle}>
        {hasLabel && <Text preset='label' tx={labelTx} text={label} style={labelStyle} />}
        <View style={FIELD}>
          {renderLeft}
          <TextInput
            placeholder={actualPlaceholder}
            placeholderTextColor={color.dim}
            underlineColorAndroid={color.transparent}
            keyboardAppearance='dark'
            {...rest}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            style={inputStyle}
            ref='TextInput'
          />
          {renderRight}
        </View>
        {!hideError && (
          <Animated.View style={errorStyle}>
            <Text preset='error' tx={errorTx} text={error} />
          </Animated.View>
        )}
      </View>
    )
  }
}