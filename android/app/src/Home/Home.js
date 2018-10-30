'use strict'

import React, {Component} from 'react'
import {StyleSheet, Text, TextInput, View, Button} from 'react-native'
import {colors} from '../theme'

export default class Home extends Component {
  static navigationOptions = {
    title: 'Tweeter feeds'
  }
  constructor(props) {
    super(props)
    this.state = {
      searchString: '',
      errorMsg: ''
    }
  }

  _onSearchPressed = () => {
    if (!this.state.searchString) {
      this.setState({errorMsg: 'Please provide a username.'})
      return
    }
    this.props.navigation.navigate('Tweets', {
      searchString: this.state.searchString
    })
  }

  _onSearchTextChanged = (event) => {
    this.setState({searchString: event.nativeEvent.text, errorMsg: ''})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Show user's tweets</Text>
        <View style={styles.flowRight}>
          <Text style={styles.tweeterText}>twitter\</Text>
          <View style={styles.searchOuter}>
            <TextInput
              underlineColorAndroid={'transparent'}
              style={styles.searchInner}
              value={this.state.searchString}
              onChange={this._onSearchTextChanged}
              placeholder="twitter user name"
            />
            {this.state.errorMsg ? (
              <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
            ) : null}
          </View>
          <Button
            onPress={this._onSearchPressed}
            color={colors.light_blue}
            title="Go"
          />
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
    color: colors.label
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  tweeterText: {
    fontSize: 20,
    paddingRight: 4,
    color: colors.label
  },
  searchOuter: {
    flexGrow: 1,
    fontSize: 18,
    marginRight: 5,
    color: colors.light_blue
  },
  searchInner: {
    height: 36,
    paddingVertical: 4,
    paddingHorizontal: 6,
    fontSize: 18,
    borderWidth: 1,
    borderColor: colors.light_blue,
    borderRadius: 8,
    color: colors.light_blue
  },
  errorMsg: {
    position: 'absolute',
    bottom: -20,
    left: 4,
    color: 'red'
  }
})
