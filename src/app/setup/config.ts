import { ReactotronConfig } from '../../services/reactotron'
import { StorageConfig } from '../../services/storage'
import { APIConfig } from '../../services/api'

/**
 * Reactotron.
 */
export const reactotron: ReactotronConfig = {
  useAsyncStorage: false,
  navigation: {
    actions: false,
    snapshots: true,
  },
  state: {
    actions: true,
    snapshots: false,
  },
}

/**
 * Async storage.
 */
export const storage: StorageConfig = {}

/**
 * API.
 */
export const api: APIConfig = {
  dev: 'https://api.foursquare.com',
  staging: 'https://api.foursquare.com',
  production: 'https://api.foursquare.com',
}

