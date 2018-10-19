import React from 'react';
import ToDoScreen from '../ToDoScreen.js';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';


describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the loading screen', async () => {
    const tree = renderer.create(<ToDoScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<ToDoScreen skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


describe('Test methods', () =>{
  let toDoScreen = renderer
  .create(
    <ToDoScreen
    />
  )
  .getInstance();

  toDoScreen._storeData("todo","2018-11-11","My todo", "Sam", "work")

  // on icon change
  expect(toDoScreen.state.icon).toBe("work");
  toDoScreen.setIcon("home");
  expect(toDoScreen.state.icon).toBe("home");

  // remove validation message
  toDoScreen.setState({messageOpacity : 1});
  expect(toDoScreen.state.messageOpacity).toBe(1);
  toDoScreen._removeValidationMessage();
  expect(toDoScreen.state.messageOpacity).toBe(0);

  // store date (the reachable part)
  toDoScreen._storeData("todo","2018-11-11","My task", "Sam", "work");


  // _handleDatePicked
  toDoScreen._showDateTimePicker();
  expect(toDoScreen.state.isDateTimePickerVisible).toBe(true);
  toDoScreen._handleDatePicked(new Date());
  expect(toDoScreen.state.isDateTimePickerVisible).toBe(false);
})

