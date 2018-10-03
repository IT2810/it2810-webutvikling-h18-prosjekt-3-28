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

class CustomCheckBox extends React.Component{

  constructor (props) {
      super()
      this.state = {
        text: props.text,
        icon: "work",

        checked: false,
        checkIcon: "radio-button-unchecked",
      }
      
    }
    
    updateChecked () {
      if(this.state.checked){
        this.setState({checkIcon: "radio-button-unchecked"}),
        this.setState({checked: false})
      }else{
        this.setState({checkIcon: "check-circle"}),
        this.setState({checked: true})
      }
      this.render()
    }
    
    getCheckIcon(){
      return this.state.checkIcon
    }

    render () {
      
    
      return (
        <TouchableOpacity style={styles.element} 
          onPress={() => {
          //Alert.alert('You tapped the button!' + this.state.checkIcon);
          this.updateChecked()
        }}
        activeOpacity={0.5}
        >
          <Icon name={this.state.icon} style={styles.leftIcon}></Icon>
          <Text style={styles.testText}>{this.state.text}</Text>
          <Icon name={this.state.checkIcon} color='#00aced' backgroundColor='transparent' style={styles.checkbox}></Icon>
        </TouchableOpacity> 
      )
    }
  }
    const styles = StyleSheet.create({
      element: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:"center",
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: '#d6d7da',
        padding:20,
      },testText:{
        flex:1,
        fontSize:20,
        marginLeft:20,

      },leftIcon:{
        flex:1,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        justifyContent: "flex-start",

      },
      checkbox:{
        flex:1,
        justifyContent:"flex-end",
      },

    });

export default CustomCheckBox;