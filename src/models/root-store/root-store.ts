import { types } from 'mobx-state-tree'
import { PostListStoreModel } from '../post-list-store'
import { CreatePostStoreModel } from '../create-post-store'
import { ModalStoreModel } from '../modal-store'
import { PlaceSearchStoreModel } from '../place-search-store'

/**
 * An RootStore model.
 */
export const RootStoreModel = types.model('Root')
  .props({
    postListStore: types.optional(PostListStoreModel, {}),
    createPostStore: types.optional(CreatePostStoreModel, {}),
    modalStore: types.optional(ModalStoreModel, {}),
    placeSearchStore: types.optional(PlaceSearchStoreModel, {}),
  })

/**
 * The RootStore instance.
 */
export type RootStore = typeof RootStoreModel.Type

/**
 * The data of an RootStore.
 */
export type RootStoreSnapshot = typeof RootStoreModel.SnapshotType
