import { StackNavigator, NavigationRouteConfig } from 'react-navigation'
import { MainNavigator } from './main-navigator'
// import { DrawerNavigator } from './drawer-navigator'

export const routes = {
  mainStack: { screen: MainNavigator } as NavigationRouteConfig<any>,
}

export const RootNavigator = StackNavigator(routes, {
  headerMode: 'none',
  initialRouteName: 'mainStack',
  navigationOptions: {
    gesturesEnabled: false,
  },
})
