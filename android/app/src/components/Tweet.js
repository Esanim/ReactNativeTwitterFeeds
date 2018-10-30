import React from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';

var moment = require('moment');

const Tweet = ({tweet}) => {
    const {created_at, full_text, user: {screen_name, profile_image_url}} = tweet
    return (
        <View style={styles.tweetContainer}>
            <TouchableHighlight style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: profile_image_url}}  />
            </TouchableHighlight> 
            <Text>{screen_name}</Text>
            <Text>{moment(created_at, 'ddd MMM DD HH:mm:ss +ZZ YYYY').format("ddd MMM DD HH:mm (YYYY)")}</Text>
            <Text>{full_text}</Text>
        </View>
    )
}
export default Tweet;

const styles = StyleSheet.create({
    tweetContainer: {
        padding: 10,
    },
    imageContainer: {
        height: 32,
        width: 32,
        borderRadius: 32,
    },
    image: {
        height: 32,
        width: 32,
        borderRadius: 32,
    },
})
