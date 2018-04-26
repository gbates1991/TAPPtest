import * as React from 'react'
import { StackNavigator, NavigationRouteConfig } from 'react-navigation'
import { ListScreen } from '../post/list-screen'
import { TypeSelectScreen } from '../post/type-select-screen'
import { CreateScreen } from '../post/create-screen'
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';

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
    title: 'NEW POST',
    headerBackTitle: null,
  },
}
export const routes = {
  PostsList,
  TypeSelect,
  Create,
}

const GradientHeader = props => (
  <View style={{ backgroundColor: '#eee' }}>
    <LinearGradient
      colors={['#1c1d8b', '#172a95', '#13369e']}
      style={[StyleSheet.absoluteFill]}
    />
    <Header {...props} style={{ backgroundColor: 'transparent' }} />
  </View>
);


export const MainNavigator = StackNavigator(routes, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'transparent',
    },
    headerTitleStyle: { color: '#fff' },
    header: (props) => <GradientHeader {...props} />,
    headerLeft: null,
  },
})
