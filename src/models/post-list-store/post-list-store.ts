import { types } from 'mobx-state-tree'
import { PostModel } from '../post-model'

/**
 * Coordinates showing PostLists & banners.
 *
 * The `mobx-state-tree` model used to create `PostListStore` instances
 * as well as including as props in other `mobx-state-tree` models.
 */
export const PostListStoreModel = types
  .model('PostListStore')
  .props({
    /** Tracks the status of the PostList workflow. */
    status: types.optional(types.enumeration(['idle', 'PostList']), 'idle'),
    /** Notification message */
    notiMessage: types.maybe(types.string),
    /** The error message to show if we cannot show */
    errorMessage: types.maybe(types.string),

    /** List of Post */
    postList: types.optional(types.array(PostModel), []),
  })
  // setters
  .actions(self => ({
    addPost(caption: string, type: 'Top3'|'Guide'|'Photo'|'Video'|'Recommendation'|'Survey', image: string, category: 'Food'|'Drink'|'Activity', spot1: string, spot2: string, spot3: string) {
      let tempPost = PostModel.create({})
      tempPost.setData(caption, type, image, category, spot1, spot2, spot3)

      self.postList.push(tempPost)
    },
    reset() {
      self.postList.clear()
    },
  }))

/**
 * Coordinates showing PostLists & banners.
 *
 * An instance of a PostListStore.
 */
export type PostListStore = typeof PostListStoreModel.Type

/**
 * The serialized version of a `PostListStore` often used when acquiring
 * data from an API (for example).
 */
export type PostListStoreSnapshot = typeof PostListStoreModel.SnapshotType