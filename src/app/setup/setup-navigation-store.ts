import { onSnapshot, onAction } from 'mobx-state-tree'
import { NavigationStoreModel } from '../../views/navigation/navigation-store'
import { Environment } from '../../models/environment'

const NAVIGATION_STATE_STORAGE_KEY = 'navigation'

/**
 * Setup the `react-navigation` state.
 */
export async function setupNavigationStore(env: Environment) {
  // load data from storage
  // const data: any = (await env.storage.load(NAVIGATION_STATE_STORAGE_KEY)) || {}

  // create state passing along dependencies
  const navState = NavigationStoreModel.create({}, { env })

  // track changes & save to storage
  onSnapshot(navState, snapshot => {
    env.storage.save(NAVIGATION_STATE_STORAGE_KEY, snapshot)
  })

  // reactotron logging
  if (__DEV__) {
    if (env.reactotron.config.navigation.snapshots) {
      onSnapshot(navState, snapshot => {
        console.tron.display({ name: 'NAV SNAPSHOT', value: snapshot })
      })
    }
    if (env.reactotron.config.navigation.actions) {
      onAction(navState, action => {
        console.tron.display({ name: 'NAV ACTION', value: action })
      })
    }
  }

  return navState
}
