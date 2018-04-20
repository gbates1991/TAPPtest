import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../../storybook/views'
import { Text } from './text'

storiesOf('Text')
  .addDecorator(fn => <StoryScreen text='Text'>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text='default' usage='Used for normal body text.'>
        <Text>Hello!</Text>
        <Text style={{ paddingTop: 10 }}>
          Check out{'\n'}
          my{'\n'}
          line height
        </Text>
        <Text style={{ paddingTop: 10 }}>The quick brown fox jumped over the slow lazy dog.</Text>
        <Text>$123,456,789.00</Text>
      </UseCase>
      <UseCase text='bold' usage='Used for bolded body text.'>
        <Text preset='bold'>Osnap! I'm puffy.</Text>
      </UseCase>
      <UseCase text='superBold' usage='Used for extra bolded body text.'>
        <Text preset='superBold'>I am super bold style.</Text>
      </UseCase>
      <UseCase text='header' usage='Used for major section headers.'>
        <Text preset='header'>Behold!</Text>
      </UseCase>
      <UseCase text='title' usage='Used for major section bolded headers.'>
        <Text preset='title'>I am title.</Text>
      </UseCase>
      <UseCase text='description' usage='Used for descriptions.'>
        <Text preset='description'>I am descriptions.</Text>
      </UseCase>
      <UseCase text='label' usage='Used for field/button label text.'>
        <Text preset='label'>I am label.</Text>
      </UseCase>
      <UseCase text='sectionHeader' usage='Used for section header text.'>
        <Text preset='sectionHeader'>I am sectionHeader.</Text>
      </UseCase>
      <UseCase text='error' usage='Used for error text.'>
        <Text preset='error'>I am error.</Text>
      </UseCase>
      <UseCase text='link' usage='Used for link text.'>
        <Text preset='link'>I am link.</Text>
      </UseCase>
      <UseCase text='small' usage='Used for small secondary text.'>
        <Text preset='small'>I am small.</Text>
      </UseCase>
      <UseCase text='detail' usage='Used for detail secondary text.'>
        <Text preset='detail'>I am detail text.</Text>
      </UseCase>
    </Story>
  ))
  .add('Passing Content', () => (
    <Story>
      <UseCase
        text='text'
        usage='Used when you want to pass a value but dont want to open a child.'
      >
        <Text text='Heyo!' />
      </UseCase>
      <UseCase text='tx' usage='Used for looking up i18n keys.'>
        <Text tx='common.ok' />
        <Text tx='omglol' />
      </UseCase>
      <UseCase
        text='children'
        usage='Used like you would normally use a React Native <Text> component.'
      >
        <Text>Passing strings as children.</Text>
      </UseCase>
      <UseCase text='nested children' usage='You can embed them and change styles too.'>
        <Text>
          {' '}
          Hello <Text preset='bold'>bolded</Text> World.
        </Text>
      </UseCase>
    </Story>
  ))
