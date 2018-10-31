import React from 'react'
import Home from '../android/app/src/Home/Home'
import renderer from 'react-test-renderer'

test('Home snapShot', () => {
  const snap = renderer.create(<Home />).toJSON()
  expect(snap).toBeTruthy();
  expect(snap).toMatchSnapshot()
})
