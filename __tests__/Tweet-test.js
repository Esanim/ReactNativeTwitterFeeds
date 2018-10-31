import React from 'react'
import renderer from 'react-test-renderer'
import Tweet from '../android/app/src/components/Tweet'

const testTweet = {
  created_at: 'Wed Aug 22 10:10:10 +0000 2108',
  full_text: 'This is a full text',
  user: {
    name: 'Adam',
    screen_name: 'Adam',
    profile_image_url: 'www.example.com',
    url: 'www.example.com'
  }
}

test('Tweet snapShot', () => {
  const snap = renderer.create(<Tweet tweet={testTweet} />).toJSON()
  expect(snap).toBeTruthy()
  expect(snap).toMatchSnapshot()
})
