import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AgendaScreen from '../screens/AgendaScreen';
//import ToDoScreen from '../screens/ToDoScreen';


const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const AgendaStack = createStackNavigator({
  Agenda: AgendaScreen,
});

AgendaStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-calendar${focused ? '' : '-outline'}` : 'md-calendar'}
    />
  ),
};

// const ToDoStack = createStackNavigator({
//   ToDo: ToDoScreen,
// });

// ToDoStack.navigationOptions = {
//   tabBarLabel: 'ToDo',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? `ios-add-circle${focused ? '' : '-outline'}` : 'md-add-cirlce'}
//     />
//   ),
// };

export default createBottomTabNavigator({
  AgendaStack,
  HomeStack,
}
  //ToDoStack

  , {initialRouteName: 'HomeStack'});
