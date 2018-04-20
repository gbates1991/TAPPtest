import { onSnapshot, onAction } from 'mobx-state-tree'
import { RootStoreModel } from '../../models/root-store'
import { Environment } from '../../models/environment'

const ROOT_STORAGE_KEY = 'root'

/**
 * Setup the root state.
 */
export async function setupRootStore(env: Environment) {
  // load data from storage
  const data: any = (await env.storage.load(ROOT_STORAGE_KEY)) || {}

  // create state passing along dependencies
  const rootState = RootStoreModel.create(data, { env })

  // track changes & save to storage
  onSnapshot(rootState, snapshot => {
    env.storage.save(ROOT_STORAGE_KEY, snapshot)
  })

  // reactotron logging
  if (__DEV__) {
    if (env.reactotron.config.state.snapshots) {
      onSnapshot(rootState, snapshot => {
        console.tron.display({ name: 'STATE SNAPSHOT', value: snapshot })
      })
    }
    if (env.reactotron.config.state.actions) {
      onAction(rootState, action => {
        console.tron.display({ name: 'STATE ACTION', value: action })
      })
    }
  }

  return rootState
}
