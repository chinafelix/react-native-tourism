/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'

import Home from './src/pages/home'
import Buy from './src/pages/buyer'
import Personal from './src/pages/personal'
import Login from './src/pages/login'
import Register from './src/pages/register'


const stackNavigator = createStackNavigator({
  Home, Buy, Personal,Login,Register
},{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      // backgroundColor: '#f4511e',
    },
    headerBackTitle: null,
    // headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    header: null
  }
});

const AppContainer = createAppContainer(stackNavigator);

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <AppContainer />
    );
  }

}

export default App;
