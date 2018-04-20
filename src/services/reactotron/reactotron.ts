import Tron from 'reactotron-react-native'

// Teach TypeScript about the bad things we want to do.
declare global {
  interface Console {
    /**
     * Hey, it's Reactotron if we're in dev, and no-ops if we're in prod.
     */
    tron: typeof Tron
  }
}

/** Do Nothing. */
const noop = () => undefined

// in dev, we attach Reactotron, in prod we attach a interface-compatible mock.
if (__DEV__) {
  console.tron = Tron // attach reactotron to `console.tron`
} else {
  // attach a mock so if things sneaky by our __DEV__ guards, we won't crash.
  console.tron = {
    configure: noop,
    connect: noop,
    useReactNative: noop,
    clear: noop,
    log: noop,
    display: noop,
    error: noop,
  }
}

export interface ReactotronConfig {
  /** The name of the app. */
  name?: string
  /** The host to connect to: default 'localhost'. */
  host?: string
  /** Should we use async storage */
  useAsyncStorage?: boolean
  /** Should we clear Reactotron when load? */
  clearOnLoad?: boolean
  /** Navigation state logging. */
  navigation?: {
    /** log navigation actions? */
    actions?: boolean
    /** log navigation snapshots? */
    snapshots?: boolean,
  }
  /** Root state logging. */
  state?: {
    /** log actions that change state. */
    actions?: boolean
    /** log snapshot changes. */
    snapshots?: boolean,
  }
}
/**
 * You'll probably never use the service like this since we hang the Reactotron
 * instance off of `console.tron`. This is only to be consistent with the other
 * services.
 */
export class Reactotron {
  config: ReactotronConfig

  /**
   * Create the Reactotron service.
   *
   * @param config the configuration
   */
  constructor(config: ReactotronConfig = {}) {
    this.config = {
      host: 'localhost',
      useAsyncStorage: true,
      clearOnLoad: true,
      ...config,
      navigation: {
        actions: false,
        snapshots: false,
        ...(config && config.navigation),
      },
      state: {
        actions: false,
        snapshots: false,
        ...(config && config.navigation),
      },
    }
  }

  /**
   * Configure reactotron based on the the config settings passed in, then connect if we need to.
   */
  async setup() {
    // only run this in dev... metro bundler will ignore this block: 🎉
    if (__DEV__) {
      // configure reactotron
      Tron.configure({
        name: this.config.name || require('../../../package.json').name,
        host: this.config.host,
      })

      // hookup middleware
      Tron.useReactNative({
        asyncStorage: this.config.useAsyncStorage ? undefined : false,
      })

      // connect to the app
      Tron.connect()

      // clear if we should
      if (this.config.clearOnLoad) {
        Tron.clear()
      }
    }
  }
}
