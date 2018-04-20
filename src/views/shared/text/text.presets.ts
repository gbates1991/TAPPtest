import { TextStyle } from 'react-native'
import { typography } from '../../theme/typography'
import { color, spacing } from '../../theme'

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  fontSize: 14,
  lineHeight: 22,
}

const SECONDARY: TextStyle = {
  ...BASE,
  color: color.dim,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: 'bold' } as TextStyle,

  /**
   * A super bold version of the default text.
   */
  superBold: { ...BASE, fontWeight: '900' } as TextStyle,

  /**
   * Header text.
   */
  header: { ...BASE, fontWeight: '900', lineHeight: 16 } as TextStyle,

  /**
   * Large bold headers.
   */
  title: {
    ...BASE,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    marginVertical: spacing[2],
  } as TextStyle,

  /**
   * Description text that shows up below titles.
   */
  description: { ...SECONDARY, marginBottom: spacing[5] - 2 } as TextStyle,

  /**
   * Labels that appear on forms above the inputs or on buttons.
   */
  label: { ...BASE, fontWeight: 'bold', lineHeight: 16 } as TextStyle,

  /**
   * Labels that appear on secondary buttons.
   */
  secondaryLabel: { color: color.secondaryText, fontSize: 16, lineHeight: 30 } as TextStyle,

  /**
   * Section header text.
   */
  sectionHeader: { ...SECONDARY, fontSize: 10, fontWeight: '900', lineHeight: 12 } as TextStyle,

  /**
   * Appears below the form field when there is a problem.
   */
  error: {
    ...BASE,
    fontSize: 12,
    lineHeight: 14,
    color: color.error,
    marginTop: spacing[2],
  } as TextStyle,

  /**
   * Link text.
   */
  link: { ...BASE, fontWeight: '500', color: color.link } as TextStyle,

  /**
   * Small secondary text.
   */
  small: { ...SECONDARY, fontSize: 11, lineHeight: 14 } as TextStyle,

  /**
   * Detail secondary text.
   */
  detail: { ...BASE, fontSize: 9, fontWeight: '900', lineHeight: 11 } as TextStyle,
}

/**
 * A list of preset names.
 */
export type TextPresetNames = keyof typeof presets
