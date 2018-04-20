import '../i18n'
import * as React from 'react'
import { Preloader } from '../views/preloader'
import { setupEnvironment } from './setup/setup-environment'
import { setupNavigationStore } from './setup/setup-navigation-store'
import { setupRootStore } from './setup/setup-root-store'
import { NavigationStore, StatefulNavigator } from '../views/navigation'
import { RootStore } from '../models/root-store'
import { Provider } from 'mobx-react'

interface State {
  store?: RootStore
  navigationStore?: NavigationStore
  ready: boolean
}

export class RootComponent extends React.Component<{}, State> {
  /**
   * Initial state.
   */
  state: State = { ready: false }

  /**
   * When the component is mounted.
   */
  async componentDidMount() {
    const env = await setupEnvironment()
    const navigationStore = await setupNavigationStore(env)
    const store = await setupRootStore(env)
    this.setState({ ready: true, navigationStore, store })
  }

  render() {
    const { ready, store } = this.state
    if (!ready) {
      return <Preloader />
    }
    // Places the store models you'd like to make available to your components in here.
    const injectableStores = {
      postListStore: store.postListStore,
      createPostStore: store.createPostStore,
      navigationStore: this.state.navigationStore,
      modalStore: store.modalStore,
      placeSearchStore: store.placeSearchStore,
    }

    return (
      <Provider {...injectableStores}>
        <StatefulNavigator />
      </Provider>
    )
  }
}
