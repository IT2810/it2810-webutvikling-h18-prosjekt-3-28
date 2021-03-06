import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  Icon
} from 'react-native-elements';

//Had to add this to load font and icons
Expo.Font.loadAsync({
  'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
  'MaterialIcons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
})

import{
  LinearGradient,
} from 'expo';


class SmartIcon extends React.Component{

  constructor (props) {
    super(props)
    this.state = {
      index: props.index,
      string: props.string,
      parent: props.parent
    }
  }
  
  render () {
    return (
        <TouchableOpacity onPress={() =>this.props.onPress(this.state.index)} activeOpacity={0.5} style={{width: "25%", padding: "2%", borderRadius: 5, backgroundColor: this.props.backgroundColor}}>
          <Icon name={this.state.string}  color='#323940' backgroundColor='transparent' size={50} style={styles.icon}></Icon>          
        </TouchableOpacity>
    )
  }
} 

const styles = StyleSheet.create({
  icon: {
    height: 5,
  }
})

export default SmartIcon