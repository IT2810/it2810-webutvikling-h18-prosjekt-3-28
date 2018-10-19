import React from 'react';
import SmartIcon from '../SmartIcon';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      NavigationTestUtils.resetInternalState();
    });
  
    it('renders the loading screen', async () => {
      const tree = renderer.create(<SmartIcon />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it('renders the root without loading screen', async () => {
      const tree = renderer.create(<SmartIcon skipLoadingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

describe('Test state', () =>{
  let smartIcon = renderer
  .create(
    <SmartIcon
    index={2}
    />
  )
  .getInstance();
  expect(smartIcon.state.index).toBe(2)
})