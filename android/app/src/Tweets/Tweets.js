import React from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native'
import TwitterApi from '../TwitterApi'
import {ERRNOUSER, ERRNOTAUTHORIZED} from '../constants'
import {colors} from '../theme'
import Tweet from '../components/Tweet'

export default class Tweets extends React.Component {
  static navigationOptions = {
    title: 'User Tweets',
  }

  constructor(props) {
    super(props)
    this.state = {
      tweets: [],
      isLoading: true,
      errorMsg: '',
      onEndReachedCalledDuringMomentum: true
    }
    this.searchString = props.navigation.state.params.searchString
  }

  _getErrorMessage(error, searchString) {
    switch (error) {
      case ERRNOUSER: {
        return `User ${searchString} was not found.`
      }
      case ERRNOTAUTHORIZED: {
        return `No access for user ${searchString}.`
      }
      default: {
        return `Couldn't retrieve tweets for the user ${searchString}.`
      }
    }
  }

  _setErrorState(message) {
    this.setState({
      errorMsg: this._getErrorMessage(message, this.searchString),
      isLoading: false
    })
  }

  _getTweets(searchString, max_id = -1) {
    TwitterApi.search(searchString, max_id)
      .then((res) => {
        if (res.errors) {
          console.table(res.errors)
          this._setErrorState(res.errors[0].code)
        } else if (res.error) {
          console.log(res.error)
          this._setErrorState(res.error)
        } else {
          this.setState({
            // remove the last tweet because the new tweet data will start from that tweet
            tweets: this.state.tweets.slice(0, -1).concat(res),
            isLoading: false
          })
        }
      })
      .catch((err) => {
        console.log('Crucial error while fetching tweets: ' + err)
        this._setErrorState('')
      })
  }

  _loadMoreTweets() {
    let max_id = -1,
      l = this.state.tweets.length
    if (l > 0) {
      max_id = this.state.tweets[l - 1].id
    }
    this.setState({isLoading: true})
    this._getTweets(this.searchString, max_id)
  }

  onEndReached = ({distanceFromEnd}) => {
    if (!this.state.onEndReachedCalledDuringMomentum) {
      this._loadMoreTweets()
      this.setState({onEndReachedCalledDuringMomentum: true})
    }
  }

  componentDidMount() {
    this._getTweets(this.searchString)
  }

  renderHeader = () => {
    return (!this.state.isLoading && !this.state.tweets.length) ? (
      <Text style={styles.description}>No tweets found.</Text>
    ) : null
  }

  renderFooter = () => {
    if (!this.state.isLoading) return null

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderTopColor: colors.separator
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  render() {
    if (this.state.errorMsg) {
      return (
        <View style={styles.container}>
          <Text style={[styles.description, styles.errorMsg]}>{this.state.errorMsg}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            data={this.state.tweets}
            renderItem={({item, separators}) => <Tweet tweet={item} />}
            keyExtractor={(item) => item.id_str}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={1}
            onMomentumScrollBegin={() => {
              this.setState({onEndReachedCalledDuringMomentum: false})
            }}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  errorMsg: {
    color: colors.error,
  },
  separator: {
    height: 1,
    backgroundColor: colors.blue_dark
  }, 
  description: {
    fontSize: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    color: colors.description,
    textAlign: 'center',
  }
})
