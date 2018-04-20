import * as React from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { inject, observer } from 'mobx-react'
import { TextField } from '../../../views/shared/text-field'
import { DropDownPicker } from '../../../views/shared/drop-down-picker'
import { Button } from '../../shared/button'

//stores
import { CreatePostStore } from '../../../models/create-post-store'
import { ModalStore } from '../../../models/modal-store'
import { PlaceSearchStore } from '../../../models/place-search-store'
import { PostListStore } from '../../../models/post-list-store'

//style
import * as styles from './create-screen.styles'

export interface CreateScreenProps extends NavigationScreenProps<{}> {
  createPostStore?: CreatePostStore
  placeSearchStore?: PlaceSearchStore
  postListStore?: PostListStore
  modalStore?: ModalStore
}

export interface CreateScreenState {}

@inject('createPostStore', 'modalStore', 'placeSearchStore', 'postListStore')
@observer
export class CreateScreen extends React.Component<CreateScreenProps, CreateScreenState> {
  constructor(props) {
    super(props)
  }

  _onPressAddPost = () => {
    const {
      postListStore,
      navigation,
      createPostStore: { caption, spotPlace1, spotPlace2, spotPlace3 },
    } = this.props

    postListStore.addPost(caption, 'Top3', 'image', 'Food', spotPlace1, spotPlace2, spotPlace3)
    navigation.navigate('PostsList')
  }

  _onCategorySelection = (id, data) => {
    if (data === 'Food') {
      this.props.createPostStore.setCategory('Food')
      return true
    }
    return false
  }

  render() {
    const { createPostStore, placeSearchStore, modalStore } = this.props

    return (
      <View style={styles.rootContainer}>
        <KeyboardAvoidingView behavior='padding'>
          <TextField
            onChangeText={createPostStore.setCaption}
            value={createPostStore.caption}
            label='Caption'
            placeholder='Please enter caption'
          />
          <DropDownPicker
            label='Category'
            options={['Food', 'Drink']}
            onSelect={this._onCategorySelection}
          />
          <TextField
            onFocus={() => {
              modalStore.showModal('food-place-search')
              placeSearchStore.setSearchPlaceNumber(0)
            }}
            onChangeText={createPostStore.setSpotPlace1}
            value={createPostStore.spotPlace1}
            label='SpotPlace1'
            placeholder='Please enter SpotPlace1'
          />
          <TextField
            onFocus={() => {
              modalStore.showModal('food-place-search')
              placeSearchStore.setSearchPlaceNumber(1)
            }}
            onChangeText={createPostStore.setSpotPlace2}
            value={createPostStore.spotPlace2}
            label='SpotPlace2'
            placeholder='Please enter SpotPlace2'
          />
          <TextField
            onFocus={() => {
              modalStore.showModal('food-place-search')
              placeSearchStore.setSearchPlaceNumber(2)
            }}
            onChangeText={createPostStore.setSpotPlace3}
            value={createPostStore.spotPlace3}
            label='SpotPlace3'
            placeholder='Please enter SpotPlace3'
          />
          <Button
            style={styles.confirmButton}
            text='Create'
            preset='primary'
            onPress={this._onPressAddPost}
            disabled={!createPostStore.isValid}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}
