import { Storage } from '../services/storage'
import { Reactotron } from '../services/reactotron'
import { API } from '../services/api'

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  /**
   * React Native Async Storage
   */
  storage: Storage

  /**
   * Reactotron is only available in dev.
   */
  reactotron: Reactotron

  /**
   * It's API service!
   */
  api: API
}
