'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import Home from './android/app/src/Home/Home';
import Tweets from './android/app/src/Tweets/Tweets';
import {colors} from './android/app/src/theme'

const App = createStackNavigator({
  Home: {screen: Home},
  Tweets: {screen: Tweets},
},
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.blue,
        color: colors.white,
        fontSize: 20,
        fontWeight: '400',
      },
      headerTintColor: colors.white
    }
  });
export default App;
