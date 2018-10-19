import React from 'react';
import CustomCheckbox from '../CustomCheckBox';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      NavigationTestUtils.resetInternalState();
    });
  
    it('renders the loading screen', async () => {
      const tree = renderer.create(<CustomCheckbox />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it('renders the root without loading screen', async () => {
      const tree = renderer.create(<CustomCheckbox skipLoadingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});


describe('Test functions', () =>{
    let customCheckbox = renderer
    .create(
      <CustomCheckbox checked={true}
      />
    )
    .getInstance();

    expect(customCheckbox.state.checked).toBe(true);
    expect(customCheckbox.state.checkIcon).toBe("check-circle")
  })
