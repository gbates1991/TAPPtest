import * as React from 'react'
import {
  KeyboardAvoidingView,
  Image,
  View,
  ViewStyle,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native'
import { inject, observer } from 'mobx-react'
import { Button } from '../../shared/button'
import { color, spacing } from '../../theme'
import { ModalStore } from '../../../models/modal-store'
import { PlaceSearchStore } from '../../../models/place-search-store'
import { CreatePostStore } from '../../../models/create-post-store'
import { TextField } from '../../../views/shared/text-field'

//styles
import * as styles from './place-search-modal.styles'

const ROOT: ViewStyle = { flex: 1, backgroundColor: color.background }

export interface PlaceSearchModalProps {
  modalStore?: ModalStore
  placeSearchStore?: PlaceSearchStore
  createPostStore?: CreatePostStore
}

interface CandidateRow {
  id?: number
  icon?: string
  locationName?: string
  locationAddress?: string
}

@inject('modalStore', 'placeSearchStore', 'createPostStore')
@observer
export class PlaceSearchModal extends React.Component<PlaceSearchModalProps, {}> {
  _clickCandidate = locationName => {
    const { createPostStore, placeSearchStore, modalStore } = this.props
    if (placeSearchStore.searchPlaceNumber == 0) createPostStore.setSpotPlace1(locationName)
    if (placeSearchStore.searchPlaceNumber == 1) createPostStore.setSpotPlace2(locationName)
    if (placeSearchStore.searchPlaceNumber == 2) createPostStore.setSpotPlace3(locationName)

    modalStore.close()
  }

  _renderCandidate = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.candidateContainer}
        onPress={() => {
          this._clickCandidate(item.locationName)
        }}
      >
        <Image style={styles.icon} source={{ uri: item.icon }} />
        <View style={styles.locationContainer}>
          <Text style={styles.locationName}>{item.locationName}</Text>
          <Text style={styles.locationAddress}>{item.locationAddress}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _convertToDiplayable = candidates => {
    let CandidateRows: CandidateRow[] = []
    candidates.forEach(candidate => {
      let temp: CandidateRow = {}
      temp.icon = candidate.icon
      temp.locationAddress = candidate.placeAddress
      temp.locationName = candidate.placeName
      temp.id = CandidateRows.length

      CandidateRows.push(temp)
    })

    return CandidateRows
  }

  _keyExtractor = (item, index) => item.id

  render() {
    const { close } = this.props.modalStore
    const { setSearchString, searchString, candidates } = this.props.placeSearchStore
    const CandidateRows = this._convertToDiplayable(candidates)

    let MaybeListOrNotFound = null
    if (CandidateRows.length > 0) {
      MaybeListOrNotFound = (
        <FlatList
          data={CandidateRows}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderCandidate}
          style={{
            marginTop: 50,
            marginBottom: 50,
          }}
        />
      )
    } else {
      MaybeListOrNotFound = (
        <Text
          style={{
            marginTop: 50,
            marginBottom: 50,
            alignSelf: 'center',
            color: color.secondaryText,
            textAlign: 'center',
            fontSize: 20,
            width: '70%',
          }}
        >
          We couldn't find a matching place near you!
        </Text>
      )
    }

    return (
      <View style={ROOT}>
        <KeyboardAvoidingView behavior='padding'>
          <View
            style={{
              height: 80,
              padding: 20,
              width: '100%',
              backgroundColor: color.secondaryText,
              position: 'absolute',
              alignItems: 'center',
              top: -30,
            }}
          >
            <TextField
              onChangeText={setSearchString}
              value={searchString}
              placeholder='Search nearby places'
              style={{ width: '100%' }}
            />
          </View>

          {MaybeListOrNotFound}

          <Button
            style={{
              flex: 1,
              width: '90%',
              alignSelf: 'center',
              marginHorizontal: spacing[4],
              position: 'absolute',
              bottom: 10,
            }}
            text='Back'
            onPress={close}
          />
        </KeyboardAvoidingView>
      </View>
    )
  }
}
