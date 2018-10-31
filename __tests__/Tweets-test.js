import React from 'react'
import renderer from 'react-test-renderer'
import Tweets from '../android/app/src/Tweets/Tweets'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

describe('Testing Tweets component', () => {
  it('renders as expected', () => {
    const navigationMock = {state: {params: {searchString: "1234"}}};
    const wrapper = Enzyme.shallow(
      <Tweets navigation={navigationMock} />
    );
    expect(wrapper).toBeTruthy()
    expect(wrapper).toMatchSnapshot();
  });
});
