import { getStorybookUI, configure } from '@storybook/react-native'

configure(() => {
  require('./storybook-registry')
})

/**
 * This value allows you to hide the hamburger menu on the UI.  I personally
 * like this gone as I control storybook from a vscode plugin.
 */
const onDeviceUI = true

export const StorybookUI = getStorybookUI({
  port: 9001,
  host: 'localhost',
  onDeviceUI,
})
