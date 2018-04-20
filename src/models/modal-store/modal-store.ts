import { types } from 'mobx-state-tree'

/**
 * Coordinates showing modals & banners.
 *
 * The `mobx-state-tree` model used to create `ModalStore` instances
 * as well as including as props in other `mobx-state-tree` models.
 */
export const ModalStoreModel = types
  .model('ModalStore')
  .props({
    modal: types.optional(
      types.enumeration([
        'food-place-search',
      ]),
      'food-place-search',
    ),
    /** Tracks the status of the Modal workflow. */
    status: types.optional(types.enumeration(['idle', 'modal']), 'idle'),
    /** Notification message */
    notiMessage: types.maybe(types.string),
    /** The error message to show if we cannot show */
    errorMessage: types.maybe(types.string),
  })
  .views(self => ({
    /** Are we currently showing Modal? */
    get isModal() {
      return self.status === 'modal'
    },
  }))
  // setters
  .actions(self => ({
    setStatus(value: 'idle' | 'modal') {
      self.status = value
    },
    setNotiMessage(value: string) {
      self.notiMessage = value
    },
    setErrorMessage(value: string) {
      self.errorMessage = value
    },
    showModal(
      value:
        | 'food-place-search',
    ) {
      self.modal = value
      self.status = 'modal'
    },
    close() {
      self.status = 'idle'
    },
    reset() {
      //@TODO
    },
  }))

/**
 * Coordinates showing modals & banners.
 *
 * An instance of a ModalStore.
 */
export type ModalStore = typeof ModalStoreModel.Type

/**
 * The serialized version of a `ModalStore` often used when acquiring
 * data from an API (for example).
 */
export type ModalStoreSnapshot = typeof ModalStoreModel.SnapshotType