import React from 'react';
import IconSelecter from '../IconSelecter';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      NavigationTestUtils.resetInternalState();
    });
  
    it('renders the loading screen', async () => {
      const tree = renderer.create(<IconSelecter />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it('renders the root without loading screen', async () => {
      const tree = renderer.create(<IconSelecter skipLoadingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});


describe('Test functions', () =>{
  let iconSelecter = renderer
  .create(
    <IconSelecter
    />
  )
  .getInstance();

  iconSelecter.changeBG(2);
  expect(iconSelecter.state.selectedIndex).toBe(2);
})

