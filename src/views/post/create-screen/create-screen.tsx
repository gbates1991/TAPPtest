import * as React from 'react'
import { View, KeyboardAvoidingView, Text, TouchableOpacity, ScrollView } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { inject, observer } from 'mobx-react'
import { TextField } from '../../../views/shared/text-field'
import RadioForm from 'react-native-simple-radio-button'
import ImagePicker from 'react-native-image-picker';
// import { DropDownPicker } from '../../../views/shared/drop-down-picker'
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

const radio_props = [
  { label: 'FOOD', value: 'FOOD' },
  { label: 'DRINKS', value: 'DRINKS' },
  { label: 'ACTIVITIES', value: 'ACTIVITIES' },
  { label: 'STAY', value: 'STAY' },
];

@inject('createPostStore', 'modalStore', 'placeSearchStore', 'postListStore')
@observer
export class CreateScreen extends React.Component<CreateScreenProps, CreateScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      imageName: ''
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };
        this.setState({
          imageName: response.fileName
        }, () => {
          this.props.createPostStore.setImage(`${this.state.imageName}`)
        });
      }
    });

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
          <ScrollView>
            <TextField
              onChangeText={createPostStore.setCaption}
              value={createPostStore.caption}
              label='Post Caption'
              placeholder='Top 3 Cofee Shops'
            />
            <TextField
              onFocus={() => {
                modalStore.showModal('food-place-search')
                placeSearchStore.setSearchPlaceNumber(0)
              }}
              onChangeText={createPostStore.setSpotPlace1}
              value={createPostStore.spotPlace1}
              label='Location'
              placeholder='Los Angeles, CA'
            />
            <View style={styles.customContainer}>
              <Text style={styles.labelStyle}>Image</Text>
              <TouchableOpacity style={styles.uploadImageButton} onPress={this.selectPhotoTapped.bind(this)}>
                <Text style={styles.uploadImageButtonText}>{this.state.imageName !== '' ? this.state.imageName : 'Upload'}</Text>
              </TouchableOpacity>
            </View>
            {/* <DropDownPicker
              label='Category'
              options={['Food', 'Drink']}
              onSelect={this._onCategorySelection}
            /> */}
            <View style={styles.customContainer}>
              <Text style={styles.labelStyle}>Category</Text>
              <View style={styles.customContainerRadioButtons}>
                <RadioForm
                  label='Caption'
                  radio_props={radio_props}
                  initial={0}
                  formHorizontal={true}
                  buttonColor={'white'}
                  labelColor={'white'}
                  labelHorizontal={false}
                  onPress={(value) => { this._onCategorySelection }}
                />
              </View>
            </View>
           
            {/* <TextField
              onFocus={() => {
                modalStore.showModal('food-place-search')
                placeSearchStore.setSearchPlaceNumber(1)
              }}
              onChangeText={createPostStore.setSpotPlace2}
              value={createPostStore.spotPlace2}
              label='SpotPlace2'
              placeholder='Please enter SpotPlace2'
            /> */}
            {/* <TextField
              onFocus={() => {
                modalStore.showModal('food-place-search')
                placeSearchStore.setSearchPlaceNumber(2)
              }}
              onChangeText={createPostStore.setSpotPlace3}
              value={createPostStore.spotPlace3}
              label='SpotPlace3'
              placeholder='Please enter SpotPlace3'
            /> */}
            <Button
              style={styles.confirmButton}
              text='Create'
              preset='primary'
              onPress={this._onPressAddPost}
              disabled={!createPostStore.isValid}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}
