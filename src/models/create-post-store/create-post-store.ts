import { types } from 'mobx-state-tree'
import { validate, ValidationRules } from '../../lib/validate'
import { isEmpty } from 'ramda'

/**
 * Coordinates showing CreatePosts & banners.
 *
 * The `mobx-state-tree` model used to create `CreatePostStore` instances
 * as well as including as props in other `mobx-state-tree` models.
 */
export const CreatePostStoreModel = types
  .model('CreatePostStore')
  .props({
    /** Caption of post */
    caption: types.maybe(types.string),
    /** Category of Top3 */
    category: types.maybe(types.enumeration(['Food', 'Drink', 'Activity'])),
    /** 3places  */
    spotPlace1: types.maybe(types.string),
    spotPlace2: types.maybe(types.string),
    spotPlace3: types.maybe(types.string),
  })
  // setters
  .actions(self => ({
    setCaption(value: string) {
      self.caption = value
    },
    setCategory(value: 'Food'|'Drink'|'Activity') {
      self.category = value
    },
    setSpotPlace1(value: string) {
      self.spotPlace1 = value
    },
    setSpotPlace2(value: string) {
      self.spotPlace2 = value
    },
    setSpotPlace3(value: string) {
      self.spotPlace3 = value
    },
    reset() {
    },
  }))
  .views(self => ({
    /**
     * An optional error object with the keys of the fields
     * being validated and the values being an array of error
     * messages.
     */
    get errors() {
      const VALIDATION_RULES: ValidationRules = {
        caption: {
          presence: {
            message: 'Caption required',
          },
          length: {
            minimum: 3,
            message: 'Caption Minimumr 3',
          },
        },
        category: {
          presence: {
            message: 'Category required',
          },
        },
        spotPlace1: {
          presence: {
            message: 'spotPlace1 required',
          },
          length: {
            minimum: 3,
            message: 'spotPlace1 Minimumr 3',
          },
        },
        spotPlace2: {
          presence: {
            message: 'spotPlace2 required',
          },
          length: {
            minimum: 3,
            message: 'spotPlace2 Minimumr 3',
          },
        },
        spotPlace3: {
          presence: {
            message: 'spotPlace3 required',
          },
          length: {
            minimum: 3,
            message: 'spotPlace3 Minimumr 3',
          },
        },
      }

      return validate(VALIDATION_RULES, self) || {}
    },
    /**
     * Does this object have any errors?
     */
    get isValid() {
      return isEmpty((self as any).errors)
    },
  }))

/**
 * Coordinates showing CreatePosts & banners.
 *
 * An instance of a CreatePostStore.
 */
export type CreatePostStore = typeof CreatePostStoreModel.Type

/**
 * The serialized version of a `CreatePostStore` often used when acquiring
 * data from an API (for example).
 */
export type CreatePostStoreSnapshot = typeof CreatePostStoreModel.SnapshotType