'use strict'

import React, {Component} from 'react'
import {StyleSheet, Text, TextInput, View, Button} from 'react-native'
import {colors} from '../theme'

export default class Home extends Component {
  static navigationOptions = {
    title: 'Tweeter feeds',
  }
  constructor(props) {
    super(props)
    this.state = {
      searchString: ''
    }
  }

  _onSearchPressed = () => {
    this.props.navigation.navigate('Tweets', {
      searchString: this.state.searchString
    })
  }

  _onSearchTextChanged = (event) => {
    this.setState({searchString: event.nativeEvent.text})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Show user's tweets</Text>
        <View style={styles.flowRight}>
          <Text style={styles.tweeterText}>twitter\</Text>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            placeholder="twitter user name"
          />
          <Button onPress={this._onSearchPressed} color={colors.light_blue} title="Go" />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    paddingVertical: 70,
    alignItems: 'center',
    flex: 1,
    alignSelf: 'stretch'
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: colors.label,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  tweeterText: {
    fontSize: 20,
    paddingRight: 4,
    color: colors.label,
  },
  searchInput: {
    height: 36,
    paddingVertical: 4,
    paddingHorizontal: 6,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: colors.light_blue,
    borderRadius: 8,
    color: colors.light_blue,
  }
})
