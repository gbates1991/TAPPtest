import { ViewStyle, TextStyle } from 'react-native'
import { color, spacing } from '../../theme'

const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[2],
  paddingHorizontal: spacing[2],
  borderRadius: 4,
  alignSelf: 'stretch',
  minHeight: 50,
  // minWidth: 120,
  alignItems: 'center',
  justifyContent: 'center',
  // shadowOffset: {
  //   width: 0,
  //   height: 6,
  // },
  // shadowOpacity: 1,
  // shadowRadius: 12,
}

const SMALL_VIEW: ViewStyle = {
  borderRadius: 2,
  alignItems: 'center',
  justifyContent: 'center',
  height: 30,
}

const SMALLER_VIEW: ViewStyle = {
  borderRadius: 2,
  alignItems: 'center',
  justifyContent: 'center',
  height: 26,
}

const DISABLED_VIEW: ViewStyle = {
  ...BASE_VIEW,
  opacity: 0.8,
}

const BASE_TEXT: TextStyle = {
  color: color.text,
  textAlign: 'center',
  paddingHorizontal: spacing[3],
}

/**
 * What the base view looks like.
 */
export const viewPresets = {
  primary: {
    ...BASE_VIEW,
    backgroundColor: '#23a11e',
    borderRadius: 25,
    fontWeight: '900',
    alignItems: 'center',
    // shadowColor: 'rgba(91, 32, 242, 0.2)',
  } as ViewStyle,
  secondary: {
    ...BASE_VIEW,
    backgroundColor: 'transparent',
    width: 30,
    position: 'absolute',
    left: 0,

    // shadowColor: 'rgba(120, 101, 182, 0.12)',
  } as ViewStyle,
  icon: {
    borderRadius: 23,
    minHeight: 46,
    minWidth: 46,
    height: 46,
    width: 46,
    padding: 0,
  } as ViewStyle,
  small: {
    ...SMALL_VIEW,
  } as ViewStyle,
  smaller: {
    ...SMALLER_VIEW,
  } as ViewStyle,
}

/**
 * What the text looks like.
 */
export const textPresets = {
  primary: {
    ...BASE_TEXT,
    color: 'white',
  } as TextStyle,
  secondary: {
    ...BASE_TEXT,
    color: '#7a7a7a',
  } as TextStyle,
  icon: {
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  } as TextStyle,
  small: {
    backgroundColor: color.background,
    borderRadius: 2,
    margin: 1,
    paddingHorizontal: 20,
    paddingVertical: 3,
  } as TextStyle,
  smaller: {
    backgroundColor: color.background,
    borderRadius: 2,
    margin: 1,
    paddingHorizontal: spacing[4] - 2,
    paddingVertical: 1,
  } as TextStyle,
}

/**
 * What the base view looks like when disabled.
 */
export const disabledViewPresets = {
  primary: {
    // ...DISABLED_VIEW,
    // backgroundColor: color.primary,
  } as ViewStyle,
  secondary: {
    // ...DISABLED_VIEW,
    // backgroundColor: color.secondary,
  } as ViewStyle,
  icon: {
    minHeight: 46,
    minWidth: 46,
    height: 46,
    width: 46,
    borderRadius: 23,
  } as ViewStyle,
  small: {
    ...SMALL_VIEW,
    opacity: 0.8,
  } as ViewStyle,
  smaller: {
    ...SMALLER_VIEW,
    opacity: 0.8,
  } as ViewStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
