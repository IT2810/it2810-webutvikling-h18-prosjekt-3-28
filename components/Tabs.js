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

//This code is made by React-native-elements
//https://react-native-training.github.io/react-native-elements/docs/button_group.html
class Tabs extends React.Component{

  constructor (props) {
    super()
    this.state = {
      selectedIndex: 0,
      parent: props.parent
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    this.props.parent.updateActiveTab(selectedIndex)
  }
  
  render () {
    const buttons = ['ToDos', 'Appointments',]
    const { selectedIndex } = this.state
  
    return (    
      <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 40, borderRadius:10, }}
      selectedButtonStyle={{backgroundColor: '#3a7bd5'}}
    />
    )
  }

} 

export default Tabs