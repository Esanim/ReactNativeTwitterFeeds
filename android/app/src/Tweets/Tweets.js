import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import TwitterApi from '../TwitterApi'
import {ERRNOTAUTHORIZED} from '../constants'
import {colors} from '../theme'

export default class Tweets extends React.Component {
  static navigationOptions = {
    title: 'User Tweets',
    headerTitleStyle: {
      color: 'black',
      fontSize: 20,
      fontWeight: '400'
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      tweets: [],
      isLoading: true,
      errorMsg: ''
    }
  }

  _getErrorMessage(error, searchString) {
    switch (error) {
      case ERRNOTAUTHORIZED: {
        return `User ${searchString} was not found.`
      }
      default: {
        return `Couldn't retrieve tweets for the user ${searchString}.`
      }
    }
  }

  _getTweets(searchString, max_id) {
    TwitterApi.search(searchString).then((res) => {
      if (res.errors) {
        console.table(res.errors)
        this.setState({
          errorMsg: this._getErrorMessage('', searchString),
          isLoading: false
        })
      } else if (res.error) {
        console.log(res.error)
        this.setState({
          errorMsg: this._getErrorMessage(res.error, searchString),
          isLoading: false
        })
        console.log(this.state.errorMsg)
      } else {
        console.log(res)
        this.setState({
          tweets: res,
          isLoading: false
        })
      }
    })
  }

  componentDidMount() {
    const {params} = this.props.navigation.state
    this._getTweets(params.searchString)
  }

  render() {
    const {params} = this.props.navigation.state

    if (this.state.errorMsg) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorMsg}>{this.state.errorMsg}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          {this.state.tweets.map((tweet) => (
            <View>
              <Text>Tweet</Text>
            </View>
          ))}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 10
  },
  errorMsg: {
    fontSize: 20,
    paddingTop: 40,
    color: colors.red
  }
})
