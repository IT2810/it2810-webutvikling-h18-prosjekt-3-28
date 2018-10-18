import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import {
  ButtonGroup,
} from 'react-native-elements';

import{
  LinearGradient,
} from 'expo';


class TodoTabs extends React.Component{

  constructor () {
    super()
    this.state = {
      selectedIndex: 0
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }
  
  render () {
    const buttons = ['ToDo', 'Appointment',]
    const { selectedIndex } = this.state
  
    return (    
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 40, borderRadius:10, marginBottom:50 }}
      selectedButtonStyle={{backgroundColor: '#3a7bd5'}}
    />
    )
  }
} 

export default TodoTabs