import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from '../../../../storybook/views'
import { Text } from '../text'
import { TextField } from './'
import { State } from 'react-powerplug'

storiesOf('TextField')
  .addDecorator(fn => <StoryScreen text='TextField'>{fn()}</StoryScreen>)
  .add('Labelling', () => (
    <Story>
      <UseCase text='Normal text' usage='Use placeholder and label to set the text.'>
        <State initial={{ value: '' }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              label='Name'
              placeholder='omg your name'
            />
          )}
        </State>
      </UseCase>
      <UseCase text='i18n text' usage='Use placeholderTx and labelTx for i18n lookups'>
        <State initial={{ value: '' }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              placeholderTx='storybook.placeholder'
              labelTx='storybook.field'
            />
          )}
        </State>
      </UseCase>
    </Story>
  ))
  .add('Style Presets', () => (
    <Story>
      <UseCase text='default' usage='Used for default text field.'>
        <State initial={{ value: '' }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              label='Name'
              preset='default'
            />
          )}
        </State>
      </UseCase>
      <UseCase text='with error' usage='The text field with an error.'>
        <TextField label='Name' preset='default' error='Oh no! What did you do now?' />
      </UseCase>
    </Story>
  ))
  .add('Style Overrides', () => (
    <Story>
      <UseCase
        noPad
        text='Container'
        usage='Useful for applying margins when laying out a form to remove padding if the form brings its own.'
      >
        <State initial={{ value: 'Test' }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              label='First Name'
              style={{ paddingTop: 0, paddingHorizontal: 40 }}
            />
          )}
        </State>
        <State initial={{ value: 'City' }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              label='Last Name'
              style={{ paddingBottom: 0 }}
            />
          )}
        </State>
      </UseCase>
      <UseCase
        text='Input'
        usage='Useful for 1-off exceptions. Try to steer towards presets for this kind of thing.'
      >
        <State initial={{ value: 'fancy colour' }}>
          {({ state, setState }) => (
            <TextField
              onChangeText={value => setState({ value })}
              value={state.value}
              label='Name'
              inputStyle={{
                backgroundColor: 'rebeccapurple',
                color: 'white',
                padding: 40,
                borderWidth: 10,
                borderRadius: 4,
                borderColor: 'hotpink',
              }}
            />
          )}
        </State>
        <Text text='* attention designers: i am so sorry' preset='small' />
      </UseCase>
    </Story>
  ))