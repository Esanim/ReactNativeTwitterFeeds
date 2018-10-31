import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking
} from 'react-native'
import {colors} from '../theme'

var moment = require('moment')

const Tweet = ({tweet}) => {
  const {
    created_at,
    full_text,
    user: {name, screen_name, profile_image_url, url}
  } = tweet
  return (
    <View style={styles.tweetContainer}>
      <View style={styles.tweetHeader}>
        <TouchableOpacity
          style={styles.tweetImageContainer}
          onPress={() => Linking.openURL(url)}
        >
          <Image testID={'_tweetImage'} style={styles.tweetImage} source={{uri: profile_image_url}} />
        </TouchableOpacity>
        <Text testID={'_tweetScreenName'} style={styles.tweetScreenName}>@{screen_name}</Text>
        <Text testID={'_tweetDate'} style={styles.tweetDate}>
          {moment(created_at, 'ddd MMM DD HH:mm:ss +ZZ YYYY').format(
            'ddd MMM DD HH:mm (YYYY)'
          )}
        </Text>
      </View>
      <Text testID={'_tweetUserName'} style={styles.tweetUserName}>{name}</Text>
      <Text testID={'_tweetText'}>{full_text}</Text>
    </View>
  )
}
export default Tweet

const styles = StyleSheet.create({
  tweetContainer: {
    padding: 10
  },
  tweetHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  tweetDate: {
    fontSize: 13,
    color: colors.blue_dark
  },
  tweetScreenName: {
    flexGrow: 1,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: colors.blue
  },
  tweetUserName: {
    paddingBottom: 4,
    fontSize: 13,
    fontWeight: 'bold'
  },
  tweetImageContainer: {
    height: 34,
    width: 34,
    borderRadius: 34
  },
  tweetImage: {
    height: 34,
    width: 34,
    borderRadius: 34
  }
})
