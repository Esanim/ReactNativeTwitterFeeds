import React from 'react'
import Tweets from '../android/app/src/Tweets/Tweets'
import renderer from 'react-test-renderer'

it('test _getErrorMessage of Tweets component', ()=>{
    const navigationMock = {state: {params: {searchString: "1234"}}};
    let TweetsData = renderer.create(<Tweets navigation={navigationMock} />).getInstance()
    expect(TweetsData._getErrorMessage('', 'User')).toEqual("Couldn't retrieve tweets for the user User.")
})