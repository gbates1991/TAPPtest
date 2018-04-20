import { types } from 'mobx-state-tree'

/**
 * Coordinates showing PostLists & banners.
 *
 * The `mobx-state-tree` model used to create `Post` instances
 * as well as including as props in other `mobx-state-tree` models.
 */
export const PostModel = types
  .model('Post')
  .props({
    /** Caption of post */
    caption: types.maybe(types.string),
    /** type of post */
    type: types.optional(types.enumeration(['Top3', 'Guide', 'Photo', 'Video', 'Recommendation', 'Survey']), 'Top3'),    
    /** Image of Post */
    image: types.maybe(types.string),
    /** Category of Top3 */
    category: types.optional(types.enumeration(['Food', 'Drink', 'Activity']), 'Food'),
    /** 3places  */
    spotPlaces: types.optional(types.array(types.string), []),
  })
  // setters
  .actions(self => ({
    setData(caption: string, type: 'Top3'|'Guide'|'Photo'|'Video'|'Recommendation'|'Survey', image: string, category: 'Food'|'Drink'|'Activity', spot1: string, spot2: string, spot3: string) {
      self.caption = caption
      self.type = type
      self.image = image
      self.category = category
      self.spotPlaces.clear()
      self.spotPlaces.push(spot1)
      self.spotPlaces.push(spot2)
      self.spotPlaces.push(spot3)
    },
    reset() {
      //@TODO
    },
  }))

/**
 * Coordinates showing PostLists & banners.
 *
 * An instance of a Post.
 */
export type Post = typeof PostModel.Type

/**
 * The serialized version of a `Post` often used when acquiring
 * data from an API (for example).
 */
export type PostSnapshot = typeof PostModel.SnapshotType