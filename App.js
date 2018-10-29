'use strict';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
  createStackNavigator,
} from 'react-navigation';
import Home from './android/app/src/Home/Home';
import Tweets from './android/app/src/Tweets/Tweets';

const App = createStackNavigator({
  Home: {screen: Home},
  Tweets: {screen: Tweets},
});
export default App;
