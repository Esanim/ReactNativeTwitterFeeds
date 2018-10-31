import React from 'react'
import Tweets from '../android/app/src/Tweets/Tweets'
import Tweet from '../android/app/src/components/Tweet'
import Home from '../android/app/src/Home/Home'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

it('find Elements in Home component', () => {
  const wrapper = Enzyme.shallow(<Home />)

  expect(wrapper.find({testID: '_searchInner'})).toHaveLength(1)
  expect(wrapper.find({testID: '_description'})).toHaveLength(1)
  expect(wrapper.find({testID: '_tweeterText'})).toHaveLength(1)
  expect(wrapper.find({testID: '_searchBtn'})).toHaveLength(1)
  expect(wrapper.find({testID: '_searchBtn2'})).toHaveLength(0)
})

it('find Elements in Tweets component', () => {
  const navigationMock = {state: {params: {searchString: '1234'}}}

  const wrapper = Enzyme.shallow(<Tweets navigation={navigationMock} />)

  expect(wrapper.find({testID: '_tweets'})).toHaveLength(1)
  expect(wrapper.find({testID: '_tweetsX'})).toHaveLength(0)
})

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

it('find Elements in Tweet component', () => {
  const wrapper = Enzyme.shallow(<Tweet tweet={testTweet} />)

  expect(wrapper.find({testID: '_tweetImage'})).toHaveLength(1)
  expect(wrapper.find({testID: '_tweetScreenName'})).toHaveLength(1)
  expect(wrapper.find({testID: '_tweetDate'})).toHaveLength(1)
  expect(wrapper.find({testID: '_tweetUserName'})).toHaveLength(1)
  expect(wrapper.find({testID: '_tweetText'})).toHaveLength(1)
})
