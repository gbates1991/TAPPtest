import * as React from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import { color, spacing, typography } from '../../theme'
import { Text } from '../text'

export interface DropDownPickerState {
  /**
   * Is the DropDownPicker open?
   */
  isOpen?: boolean
}

export interface ReadonlyDriverTypeArray {
  readonly [index: number]: string
}

export interface DropDownPickerProps {
  /** The label i18n key. */
  labelTx?: string
  /** The label text if no labelTx is provided. */
  label?: string
  /**
   * Options for vehicles
   * Currently restricted to car, and bike
   */
  options?: ReadonlyDriverTypeArray
  onSelect: (rodId: number, data: any) => boolean
  /** Optional parameter toggle show label on/off */
  hideLabel?: boolean
}

export class DropDownPicker extends React.Component<DropDownPickerProps, DropDownPickerState> {
  render() {
    const { labelTx, label, hideLabel, ...rest } = this.props

    let maybeLabel = null
    if (!hideLabel)
      maybeLabel = <Text preset='label' tx={labelTx} text={label} style={LABEL} />

    return (
      <View style={CONTAINER}>
        {maybeLabel}
        <ModalDropdown
          style={ROOT}
          textStyle={TEXT_STYLE}
          dropdownStyle={DROPDOWN_STYLE}
          {...rest}
        />
      </View>
    )
  }
}

const CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}

const ROOT: ViewStyle = {
  backgroundColor: color.palette.purple,
  borderWidth: 1,
  borderRadius: 1,
  minHeight: 44,
  justifyContent: 'center',
  paddingLeft: spacing[2],
}

const TEXT_STYLE: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 18,
  color: color.text,
}

const DROPDOWN_STYLE: ViewStyle = {
  height: 69, // Arbitrary numbers FTL but the library doesn't do a good calc so this is what we get.
  width: 150,
}

const LABEL: TextStyle = {
  paddingBottom: spacing[2],
}
