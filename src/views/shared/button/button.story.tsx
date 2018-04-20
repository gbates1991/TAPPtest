import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../../storybook/views'
import { Button } from './'
import { Text } from '../text'

storiesOf('Button')
  .addDecorator(fn => <StoryScreen text='Button'>{fn()}</StoryScreen>)
  .add('Style Presets', () => (
    <Story>
      <UseCase text='Primary' usage='The primary button.'>
        <Button
          text='Click Me'
          preset='primary'
          onPress={() => window.alert('Im the important one.')}
        />
      </UseCase>
      <UseCase text='Secondary' usage='The secondary button.'>
        <Button
          text='Click Me Too'
          preset='secondary'
          onPress={() => window.alert('I still matter though.')}
        />
      </UseCase>
      <UseCase text='Disabled' usage='The disabled behaviour of the primary button.'>
        <Button text='Cant Click Me' preset='primary' onPress={() => true} disabled />
      </UseCase>
      <UseCase text='Icon Primary' usage='The primary icon button.'>
        <Button icon='list-ul' preset='primary' onPress={() => window.alert('Im iconic.')} />
      </UseCase>
      <UseCase text='Icon Secondary' usage='The secondary icon button.'>
        <Button
          icon='list-ul'
          preset='secondary'
          onPress={() => window.alert('Im an iconoclast.')}
        />
      </UseCase>
      <UseCase text='Small' usage='The small button.' style={{ alignItems: 'center' }}>
        <Button text='Colorful click' preset='small' onPress={() => window.alert('Im tiny.')} />
      </UseCase>
      <UseCase text='Smaller' usage='The smaller button.' style={{ alignItems: 'center' }}>
        <Button
          text='Tiny but colorful click'
          preset='smaller'
          onPress={() => window.alert('Im the smallest.')}
        />
      </UseCase>
    </Story>
  ))
  .add('Style Overrides', () => (
    <Story>
      <UseCase text='Container' usage='The container style overrides.'>
        <Button
          text='Click It'
          style={{
            backgroundColor: 'rebeccapurple',
            borderWidth: 10,
            borderRadius: 4,
            borderColor: 'hotpink',
          }}
          onPress={() => true}
        />
      </UseCase>
      <UseCase text='Text' usage='The text style overrides.'>
        <Button
          text='Click It'
          textStyle={{
            color: 'hotpink',
            fontSize: 24,
            fontWeight: '900',
          }}
          onPress={() => true}
        />
      </UseCase>
    </Story>
  ))
  .add('Passing Content', () => (
    <Story>
      <UseCase
        text='text'
        usage='Used when you want to pass a value but dont want to open a child.'
      >
        <Button text='Click It' onPress={() => true} />
      </UseCase>
      <UseCase text='tx' usage='Used for looking up i18n keys'>
        <Button tx='common.ok' onPress={() => true} />
      </UseCase>
      <UseCase text='nested children' usage='You can embed them and change styles too.'>
        <Button onPress={() => true}>
          <Text text='Click Here!' />
        </Button>
      </UseCase>
    </Story>
  ))
