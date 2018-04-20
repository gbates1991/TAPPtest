import * as React from 'react'
import { Animated, Easing, TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Text } from '../text'
import { ButtonProps } from './button.props'
import { color } from '../../theme'

export class GradientButton extends React.Component<ButtonProps, { anim: Animated.Value }> {
  constructor(props) {
    super(props)

    this.state = {
      anim: new Animated.Value(0),
    }
  }

  handleOnPressIn = () => {
    Animated.timing(this.state.anim, {
      toValue: 1,
      duration: 150,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false, // color and backgroundColor not yet supported by native driver
    }).start()
  }

  handleOnPressOut = () => {
    Animated.timing(this.state.anim, {
      toValue: 0,
      duration: 250,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false, // color and backgroundColor not yet supported by native driver
    }).start()
  }

  render() {
    const { style, textStyle, tx, text, ...rest } = this.props

    const finalTextStyle = {
      ...textStyle,
      color: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [color.link, color.text],
      }),
      backgroundColor: this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [color.background, color.transparent],
      }),
    }

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={['#59218B', '#F459F4']}
        style={style}
      >
        <TouchableWithoutFeedback
          {...rest}
          onPressIn={this.handleOnPressIn}
          onPressOut={this.handleOnPressOut}
          style={style}
        >
          <Text animated preset='link' tx={tx} text={text} style={finalTextStyle} />
        </TouchableWithoutFeedback>
      </LinearGradient>
    )
  }
}
