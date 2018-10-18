import React from 'react';
import HomeScreen from '../HomeScreen';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });
  it('renders the loading screen', async () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<HomeScreen skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Test methods', () =>{
    let homeScreen = renderer
    .create(
      <HomeScreen
      />
    )
    .getInstance();
    homeScreen.state.tasks.push({checked:false, text:"Lorum Ipsum", icon:"work"})
  

    homeScreen.updateToDo(true, 0)
   
    // on icon change
    expect(homeScreen.state.numFinishedTasks).toBe(1);
    expect(homeScreen.state.tasks[0].checked).toBe(true)
    
    homeScreen.updateActiveTab(1)
    expect(homeScreen.state.activeTab).toBe(1);

  })
  
  