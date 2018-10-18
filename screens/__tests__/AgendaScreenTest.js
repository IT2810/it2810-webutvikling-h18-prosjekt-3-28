import React from 'react';
import AgendaScreen from '../AgendaScreen.js';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';


describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the loading screen', async () => {
    const tree = renderer.create(<AgendaScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the root without loading screen', async () => {
    const tree = renderer.create(<AgendaScreen skipLoadingScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});


describe('Test methods', () =>{
  let AgendaScreen = renderer
  .create(
    <AgendaScreen
    />
  )
  .getInstance();

  // test getColor()
  expect(AgendaScreen.getColor("todo")).toBe("#9be7ff");
  expect(AgendaScreen.getColor("appointment")).toBe("#ff8a65");

  // test importToCalendar()
  AgendaScreen.data = {"22-10-2018": [{text: "Hello"},{text: "Hello2"}], "20-10-2018": [{text: "Third hello"}]}
  expect(AgendaScreen.state.items).toEqual({})
  AgendaScreen.importToCalendar();
  expect(AgendaScreen.state.items).toBe(AgendaScreen.data)

 })

