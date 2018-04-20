import { AppRegistry } from 'react-native'
import { RootComponent } from './app/root-component'
import { StorybookUI } from '../storybook/storybook'

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = 'TestApp'

// TODO(steve): find a sane way to showing the stories (spoiler: it'll be config)
const SHOW_STORYBOOK = false // make sure this stays `false` as you check into git
const TopLevel = SHOW_STORYBOOK ? StorybookUI : RootComponent

AppRegistry.registerComponent(APP_NAME, () => TopLevel)
