import * as React from 'react'
import { View, KeyboardAvoidingView, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { inject, observer } from 'mobx-react'
import { TextField } from '../../../views/shared/text-field-custom'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
// import { DropDownPicker } from '../../../views/shared/drop-down-picker'
import { Button } from '../../shared/button-custom'
import Checked from '../../theme/images/ok.png'
import Unchecked from '../../theme/images/empty.png'

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
  { label: 'FOOD', value: 'Food' },
  { label: 'DRINKS', value: 'Drinks' },
  { label: 'ACTIVITIES', value: 'Activities' },
  { label: 'STAY', value: 'Stay' },
];

@inject('createPostStore', 'modalStore', 'placeSearchStore', 'postListStore')
@observer
export class CreateScreen extends React.Component<CreateScreenProps, CreateScreenState> {
  constructor(props) {
    super(props);
    this.state = {
      imageName: '',
      radioValue: 'Food',
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
      createPostStore: { caption, spotPlace1, spotPlace2, spotPlace3, imageName },
    } = this.props

    postListStore.addPost(caption, 'Top3', 'image', 'Food', spotPlace1, spotPlace1, spotPlace1)
    navigation.navigate('PostsList')
  }
  
  _onPressGoBack = () => {
    const {
      navigation
    } = this.props
    navigation.navigate('PostsList')
  }

  _onCategorySelection = (data) => {
    this.setState({ radioValue: data })
    // if (data === 'Food') {
      this.props.createPostStore.setCategory(data)
    //   return true
    // }
    // return false
  }

  renderRadioButtons = () => {
    return radio_props.map((element, index) => {
      return(
        <TouchableOpacity
          key={element.label}
          onPress={() => { this._onCategorySelection(element.value) }}
        >
          <View style={index <= 3 ? styles.singleRadioButton : styles.singleRadioButtonRight }>
            <Image style={styles.RadioImage} source={element.value === this.state.radioValue ? Checked: Unchecked} />
            <Text style={styles.RadioTitle}>{element.label}</Text>
          </View>
        </TouchableOpacity>
      ) 
    })
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
                {/* <RadioForm
                  label='Caption'
                  radio_props={radio_props}
                  initial={0}
                  formHorizontal={true}
                  buttonColor={'#b9babb'}
                  labelColor={'#b9babb'}
                  labelHorizontal={false}
                  onPress={(value) => { this._onCategorySelection }}
                />       */}
                {this.renderRadioButtons()}
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
            <View style={styles.buttonsContainer}>
              <Button
                style={styles.backButton}
                text='BACK'
                preset='secondary'
                onPress={this._onPressGoBack}
                // disabled={!createPostStore.isValid}
              />
              <TouchableOpacity
                onPress={this._onPressAddPost}
                disabled={!createPostStore.isValid}
              >
                <LinearGradient
                  colors={['#229b19', '#24b62d', '#2ad246']}
                  style={styles.linearGradient}
                >
                  <Text style={styles.buttonText}>
                    SELECT CHOICHES
                </Text>
                </LinearGradient>
              </TouchableOpacity>
            
              {/* <GradientButton
                style={styles.confirmButton}
                text='SELECT CHOICHES'
                preset='primary'
                onPress={this._onPressAddPost}
                // disabled={!createPostStore.isValid}
              /> */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    )
  }
}
