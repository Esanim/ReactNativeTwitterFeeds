import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

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
      tweets: []
    }
  }

  render() {
    const {params} = this.props.navigation.state

    return (
      <View style={styles.container}>
        <Text>{params.searchString}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 10
  }
})
