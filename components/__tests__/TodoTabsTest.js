import React from 'react';
import TodoTabs from '../TodoTabs';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      NavigationTestUtils.resetInternalState();
    });
  
    it('renders the loading screen', async () => {
      const tree = renderer.create(<TodoTabs />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it('renders the root without loading screen', async () => {
      const tree = renderer.create(<TodoTabs skipLoadingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});

