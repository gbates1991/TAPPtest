import { StackNavigator, NavigationRouteConfig } from 'react-navigation'
import { ListScreen } from '../post/list-screen'
import { TypeSelectScreen } from '../post/type-select-screen'
import { CreateScreen } from '../post/create-screen'

import { color } from '../theme/color'

const PostsList: NavigationRouteConfig<any> = {
  screen: ListScreen,
  navigationOptions: {
    gesturesEnabled: false,
    title: 'Post List',
    headerBackTitle: null,
  },
}

const TypeSelect: NavigationRouteConfig<any> = {
  screen: TypeSelectScreen,
  navigationOptions: {
    gesturesEnabled: false,
    title: 'Select type',
    headerBackTitle: null,
  },
}

const Create: NavigationRouteConfig<any> = {
  screen: CreateScreen,
  navigationOptions: {
    gesturesEnabled: false,
    title: 'Create post',
    headerBackTitle: null,
  },
}
export const routes = {
  PostsList,
  TypeSelect,
  Create,
}

export const MainNavigator = StackNavigator(routes, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: color.secondaryText,
    },
    headerTitleStyle: {
      color: color.secondary,
    },
    headerLeft: null,
  },
})
