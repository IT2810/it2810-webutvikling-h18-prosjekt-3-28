import React from 'react';
import PedometerSensor from '../PedometerSensor';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      NavigationTestUtils.resetInternalState();
    });
  
    it('renders the loading screen', async () => {
      const tree = renderer.create(<PedometerSensor />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  
    it('renders the root without loading screen', async () => {
      const tree = renderer.create(<PedometerSensor skipLoadingScreen />).toJSON();
      expect(tree).toMatchSnapshot();
    });
});


describe('Test functions', () =>{
    let pedometerSensor = renderer
    .create(
      <PedometerSensor 
      />
    )
    .getInstance();
   
  })
