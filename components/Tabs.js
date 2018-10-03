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
  Checkbox, 
  ButtonGroup,
  Text,
  Icon
} from 'react-native-elements';

import{
  LinearGradient,
} from 'expo';


class Tabs extends React.Component{

  constructor (props) {
    super()
    this.state = {
      selectedIndex: 1,
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
      containerStyle={{height: 40}}
    />


    )
  }

} 

export default Tabs