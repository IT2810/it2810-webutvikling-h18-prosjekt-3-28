import React from 'react';
import Tabs from '../Tabs';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      NavigationTestUtils.resetInternalState();
    });
  
    it('renders the loading screen', async () => {
      const tree = renderer.create(<Tabs />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it('renders the root without loading screen', async () => {
      const tree = renderer.create(<Tabs skipLoadingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

