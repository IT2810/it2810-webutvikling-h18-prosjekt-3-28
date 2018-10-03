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



class StepView extends React.Component{

  constructor (props) {
    super()
    this.state = {
      stepsToday: 7400,
      goal: 10000,
    }
  }

  updateStepCounter(props){
    this.setState({stepsToday: props.steps})
  }

  getWidth(){
    return 350*this.state.stepsToday / this.state.goal
  }

  
  render(){
    console.log("hei" + this.getWidth())
    return (
      
      <View style={styles.element}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
          colors={['#89f7fe', '#66a6ff']
        }
        >
        <View style={styles.chart} width={259}></View>

        </LinearGradient>
      </View>

    )


  }


}

const styles = StyleSheet.create({
  element: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6d7da',
    width:350,
    backgroundColor: 'transparent',
    marginTop:10,
    marginBottom:10,
    overflow: "hidden",
  },chart:{
    width:175,
    height:25,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',

  },

});

export default StepView