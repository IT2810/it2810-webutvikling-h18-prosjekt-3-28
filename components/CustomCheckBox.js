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

var i = -1
class CustomCheckBox extends React.Component{

  constructor (props) {
      i = i+1
      super(props)

      this.state = {
        text: props.text,
        icon: "work",
        key: i,
        checked: props.checked,
        parent: props.parent,
      }
      
    }


    componentDidMount(){
      
      if(this.state.checked){
        this.setState({checkIcon: "check-circle"});
      }else{
        this.setState({checkIcon: "radio-button-unchecked"});
      }
    }
    
    updateChecked () {
      if(this.state.checked){
        this.setState({checkIcon: "radio-button-unchecked"}),
        this.setState({checked: false})
        this.props.parent.updateToDo(false,this.state.key);
      }else{
        this.setState({checkIcon: "check-circle"}),
        this.setState({checked: true})
        this.props.parent.updateToDo(true,this.state.key);
      }

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
          <Icon name={this.state.icon} color="#323940" style={styles.leftIcon}></Icon>
          <Text style={[styles.testText, styles.titleText3]}>{this.state.text}</Text>
          <Icon name={this.state.checkIcon} color='#3a7bd5' backgroundColor='transparent' style={styles.checkbox}></Icon>
        </TouchableOpacity> 
      )
    }
  }
    const styles = StyleSheet.create({
      element: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'center',
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
      titleText1: {
        fontFamily: 'SF-Pro-Display-Bold',
      },
      titleText2: {
        fontFamily: 'SF-Pro-Display-Regular',
      },
      titleText3: {
        fontFamily: 'SF-Pro-Display-Thin',
      },
      titleText4: {
        fontFamily: 'SF-Pro-Display-Ultralight',
      },

    });

export default CustomCheckBox;