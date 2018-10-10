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
        <View style={styles.item}>
            <Text style={styles.subtitle}>{this.state.time}</Text>
            <Text h4>{this.state.text}</Text>
            <Text style={styles.subtitle}>{this.state.location}</Text>
        </View>
      )
    }
  }
    const styles = StyleSheet.create({
        item: {
            backgroundColor: 'white',
            borderRadius: 1,
            padding: 10,
            marginLeft: 40,
            marginTop: 17,
            width: 350,
        },
        subtitle:{
            fontSize: 20,
            color: "#40434b",
        },

    });

export default CalenderItem;