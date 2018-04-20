import { types, getEnv } from 'mobx-state-tree'
import { Environment } from '../environment'

/**
 * Coordinates showing PlaceSearchs & banners.
 *
 * The `mobx-state-tree` model used to create `ModalStore` instances
 * as well as including as props in other `mobx-state-tree` models.
 */
export const FoodPlaceModel = types.model('FoodPlaceModel')
  .props({
    icon: types.maybe(types.string),
    placeName: types.maybe(types.string),
    placeAddress: types.maybe(types.string),
  })
  .actions(self => ({
    set(venue) {
      try {
      self.icon = venue.categories[0].icon.prefix + '32' + venue.categories[0].icon.suffix
      } catch (e) {
        self.icon = 'https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_32.png'
      }
      self.placeName = venue.name
      self.placeAddress = venue.location.address
    },
  }))
export const PlaceSearchStoreModel = types
  .model('PlaceSearchStore')
  .props({
    /** search string */
    searchString: types.maybe(types.string),
    /** foodplace candidates */
    candidates: types.optional(types.array(FoodPlaceModel), []),
    /**  */
    searchPlaceNumber: types.optional(types.number, 0),
    /** Tracks the status of the search workflow. */
    status: types.optional(types.enumeration(['idle', 'pending', 'done', 'error']), 'idle'),
    /** The error message to show if search is not available */
    errorMessage: types.maybe(types.string),
  })
  .actions(self => ({
    setErrorMessage(value: string) {
      self.errorMessage = value
    },
    setStatus(value: 'idle' | 'pending' | 'done' | 'error') {
      self.status = value
    },
    setSearchPlaceNumber(value) {
      self.searchPlaceNumber = value
    },
    setCandidatesFromApiData(data) {
      self.candidates.clear()

      const venues = data.response.venues

      venues.forEach(venue => {
        let temp = FoodPlaceModel.create({})
        temp.set(venue)

        self.candidates.push(temp)
      })
    },
    clearCandidates() {
      self.candidates.clear()
    },
  }))
  // setters
  .actions(self => ({
    async setSearchString(value: string) {
      self.searchString = value

      const environment = getEnv(self).env as Environment
      const api = environment.api
    
      // prep our state before we start
      self.setStatus('pending')
      self.setErrorMessage(null)
    
      try {
        const response = await api.searchVenues(value, 'checkin', 15, '4d4b7105d754a06374d81259', '20180418')
    
        // figure out the response and what to do next
        self.setStatus(response.ok ? 'done' : 'error')
    
        // do something with the response
        if (response.ok && response.kind === 'success') {
          // hand some data over to store?
          // persist some stuff to another service like keychain?
          // kick off some more requests to more services?
          self.setCandidatesFromApiData(response.data)

          self.setStatus('done')
          return true
        } else {
          self.clearCandidates()
          self.setErrorMessage('errors.unknown')
        }

        return false
      } catch (e) {
        // IMPORTANT:
        //   Don't trust your services.  Always try/catch.  You may decide to bubble
        //   up the error, but it will be on your terms, not your dependencies.
        //
        self.clearCandidates()
        self.setStatus('error')
        self.setErrorMessage('errors.unknown')
      }    
    },
    reset() {
      //@TODO
    },
  }))

/**
 * Coordinates showing PlaceSearchs & banners.
 *
 * An instance of a PlaceSearchStore.
 */
export type PlaceSearchStore = typeof PlaceSearchStoreModel.Type

/**
 * The serialized version of a `PlaceSearchStore` often used when acquiring
 * data from an API (for example).
 */
export type PlaceSearchStoreSnapshot = typeof PlaceSearchStoreModel.SnapshotType