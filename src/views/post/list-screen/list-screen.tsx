import * as React from 'react'
import {
  View, TouchableOpacity, FlatList, Text, Image,
} from 'react-native'
import { NavigationScreenProps } from 'react-navigation'
import { inject, observer } from 'mobx-react'
import Icon from 'react-native-vector-icons/FontAwesome'

//stores
import { PostListStore } from '../../../models/post-list-store'

//style
import * as styles from './list-screen.styles'
import { color } from '../../theme'


interface PostRow {
  id?: number
  caption?: string
}


export interface ListScreenProps extends NavigationScreenProps<{}> {
  postListStore?: PostListStore
}

export interface ListScreenState {
}

@inject('postListStore')
@observer
export class ListScreen extends React.Component<ListScreenProps, ListScreenState> {
  constructor(props) {
    super(props)

  }

  _convertToDiplayable = (posts) => {
    let PostRows: PostRow[] = []
    posts.forEach(post => {
      let temp: PostRow = {}
      temp.caption = post.caption
      temp.id = PostRows.length

      PostRows.push(temp)
    })

    return PostRows
  }

  _renderPost = ({item}) => {
    return (
      <View style={{ width: '100%', height: 200, marginBottom: 30}}>
        <Image source={{uri: 'https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&h=350'}} style={{position: 'absolute', width: '100%', height: '100%'}} />
        <Image source={{uri: 'https://www.yueimg.com/en/images/common/avatar.b6a87.png'}} style={{
          position: 'absolute', width: 50, height: 50, borderRadius: 25, borderWidth: 3, borderColor: 'white', left: 5, top: 5,
        }}/>
        <Text
          style={{
            marginTop: 50,
            marginBottom: 50,
            alignSelf: 'center',
            backgroundColor: 'transparent',
            color: color.palette.black,
            textAlign: 'center',
            fontSize: 20,
            width: '70%',
          }}
        >{item.caption}</Text>
      </View>
    )
  }

  _onPressAddPost = () => {
    this.props.navigation.navigate('TypeSelect')
  }
  
  _keyExtractor = (item, index) => item.id

  render() {
    const { postList } = this.props.postListStore
    const PostRows = this._convertToDiplayable(postList)

    let MaybeListOrNotFound = null
    if (PostRows.length > 0) {
      MaybeListOrNotFound = 
      <FlatList
        data={PostRows}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderPost}
        style={{
          marginTop: 50,
          marginBottom: 70,
        }}
      />
    } else {
      MaybeListOrNotFound = <Text
        style={{
          marginTop: 50,
          marginBottom: 50,
          alignSelf: 'center',
          color: color.secondaryText,
          textAlign: 'center',
          fontSize: 20,
          width: '70%',
        }}>There is no post!
      </Text>
    }

    return (
      <View style={styles.rootContainer}>
        {MaybeListOrNotFound}
        <TouchableOpacity style={styles.plusButton} onPress={this._onPressAddPost}>
          <Icon name='plus-circle' size={60} color={color.primary} />
        </TouchableOpacity>
      </View>
    )
  }
}