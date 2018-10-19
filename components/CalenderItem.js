import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Text,
} from 'react-native-elements';

import{
  LinearGradient,
} from 'expo';

class CalenderItem extends React.Component{

    constructor (props) {
      super(props)
      this.state = {
        text: props.text,
        time: props.time,
        location: props.location,
      }
    }
    

    render () {
      return (
        <View style={[styles.item,styles.col]}>
            <View>
            <Text style={[styles.subtitle,styles.titleText3,styles.h4]}>{this.state.time}</Text>
            <Text style={[styles.titleText2,styles.h1]}>{this.state.text}</Text>
            <Text style={[styles.subtitle,styles.titleText3,styles.h4]}>w/ {this.state.location}</Text>
            </View>
        </View>
      )
    }
  }

  
    const styles = StyleSheet.create({
        item: {
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            marginTop: 17,
            width: 350,
        },
        subtitle:{
            color: '#40434b',
        },
        col:{
          flexDirection: 'row',
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
        tab:{
          marginTop:30,
        },
        h1:{
          fontSize:35,
        },
        h2:{
          fontSize:30,
        },
        h3:{
          fontSize:25,
        },
        h4:{
          fontSize:20,
        }

    });

export default CalenderItem;