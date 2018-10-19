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
  let agendaScreen = renderer
  .create(
    <AgendaScreen
    />
  )
  .getInstance();
  beforeAll(() => {
    agendaScreen.setState({items : {}})
  });
  test("test getColor()", () => {
      expect(agendaScreen.getColor("todo")).toBe("#9be7ff");
      expect(agendaScreen.getColor("appointment")).toBe("#ff8a65");
  });
  test("test importToCalendar()", () => {
    agendaScreen.data = {"22-10-2018": [{text: "Hello"},{text: "Hello2"}], "20-10-2018": [{text: "Third hello"}]}
    expect(agendaScreen.state.items).toEqual({})
    agendaScreen.importToCalendar();
    expect(agendaScreen.state.items).toEqual({"20-10-2018": [{"height": 50, "name": "Third hello with: undefined", "type": "todo"}], "22-10-2018": [{"height": 50, "name": "Hello with: undefined", "type": "todo"}, {"height": 50, "name": "Hello2 with: undefined", "type": "todo"}]})
  });

  let day = {
    "dateString": "2018-10-18",
    "day": 18,
    "month": 10,
    "timestamp": 1539820800000,
    "year": 2018
    }

  test("test generateRandomAppointments()", () => {
    agendaScreen.setState({items : {}})
    expect(agendaScreen.state.items).toEqual({})
    agendaScreen.generateRandomAppointments(day);
    expect(agendaScreen.state.items).not.toEqual({})
  });
 })
