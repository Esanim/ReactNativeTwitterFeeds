import base64 from 'base-64'

const constants = require('./twitterconfig')
const Buffer = require('buffer').Buffer

const TwitterApi = {
  // Search for user's tweets
  // Params:
  // username:string - name of the user whose tweets we want to retrieve
  // max_id:int - show tweets with id less than max_id
  // The function first acquires the guest bearer token which then uses it to fetch tweets and return a promise
  async search(username, max_id) {
    const usernameEncoded = encodeURIComponent(username)
    max_id = Number.isInteger(max_id) ? max_id : -1

    if (!this.bearerToken) {
      let tokenData = await this._getBearerToken()
      this.bearerToken = tokenData?.access_token
    }
    return this._loadTweet(usernameEncoded, max_id)
  },

  async _getBearerToken() {
    const details = {
      grant_type: 'client_credentials'
    }

    let formBody = []
    for (let property in details) {
      const encodedKey = encodeURIComponent(property)
      const encodedValue = encodeURIComponent(details[property])
      formBody.push(encodedKey + '=' + encodedValue)
    }
    formBody = formBody.join('&')

    const credentials =
      encodeURIComponent(constants.TWITTER_KEY) +
      ':' +
      encodeURIComponent(constants.TWITTER_SECRET)
    const encoded = Buffer.from(credentials).toString('base64')

    return await fetch(`https://api.twitter.com/oauth2/token`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Authorization: 'Basic ' + encoded
      },
      body: formBody
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log('_getBearerToken failure' + JSON.stringify(error))
      })
  },

  async _loadTweet(username, max_id) {
    let q = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${username}&count=50&exclude_replies=true&include_rts=false&tweet_mode=extended`
    if (max_id > 0) {
      q += `&max_id=${max_id}`
    }
    return await fetch(q, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + this.bearerToken
      }
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log('_loadTweet failure' + JSON.stringify(error))
      })
  }
}
export default TwitterApi
