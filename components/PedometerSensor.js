import React from "react";
import { Expo,Font, Pedometer, LinearGradient } from "expo";
import { 
  StyleSheet, 
  View,
  
} from "react-native";
import {
  CheckBox,
  ButtonGroup,
  Text,
  Icon
} from 'react-native-elements';
import { Ionicons, FontAwesome, Foundation, Entypo, MaterialIcons } from '@expo/vector-icons';


Font.loadAsync({
  'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
  'MaterialIcons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
  'SpaceMono-Regular': require("../assets/fonts/SpaceMono-Regular.ttf"),
  'OpenSans-Light':require("../assets/fonts/OpenSans-Light.ttf"),
  'OpenSans-Regular':require("../assets/fonts/OpenSans-Regular.ttf"),
  'SF-Pro-Display-Bold':require('../assets/fonts/SF-Pro-Display-Bold.otf'),
  'SF-Pro-Display-Regular':require('../assets/fonts/SF-Pro-Display-Regular.otf'),
  'SF-Pro-Display-Thin':require('../assets/fonts/SF-Pro-Display-Thin.otf'),
  'SF-Pro-Display-Ultralight':require('../assets/fonts/SF-Pro-Display-Ultralight.otf'),
})

class PedometerSensor extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isPedometerAvailable: "checking",
            pastStepCount: 0,
            currentStepCount: 0,
            parent: props.parent,
            goal: 10000,
          };
    }
    
      componentDidMount() {
        this._subscribe();
      }
    
      componentWillUnmount() {
        this._unsubscribe();
      }

      getWidth(){
        return 350*this.state.pastStepCount / this.state.goal
      }
    
      _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
          this.setState({
            currentStepCount: result.steps
          });
        });
    
        Pedometer.isAvailableAsync().then(
          result => {
            this.setState({
              isPedometerAvailable: String(result)
            });
          },
          error => {
            this.setState({
              isPedometerAvailable: "Could not get isPedometerAvailable: " + error
            });
          }
        );
    
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);
        Pedometer.getStepCountAsync(start, end).then(
          result => {
            this.setState({ pastStepCount: result.steps });
            console.log()
          },
          error => {
            this.setState({
              pastStepCount: "NaN"
            });
          }
        );
      };
    
      _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
      };

    
      render(){
        return (
          <View style={styles.container}>
            <Text style={[styles.titleText3, styles.h2, {textAlign:'center'}]}>Activity <MaterialIcons name="directions-run" size={23}/></Text>
            <View style={{alignItems:'center'}}>
            <View style={styles.element}>
            
            <LinearGradient
              start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
              colors={['#3a7bd5', '#3a6073']
            }
            >

            <View style={styles.chart} width={this.getWidth()}></View>
    
            </LinearGradient>
          </View>
            </View>
            <View style={[styles.col,styles.activityContainer]}>
            <Text style={[styles.titleText3, styles.activityText]}><Foundation name="foot" size={20} color="#3a7bd5"/>  {this.state.pastStepCount}   |</Text>
            <Text style={[styles.titleText3, styles.activityText]}> <Ionicons size={20} name="ios-flame" color="red"/>  {(0.04*(this.state.pastStepCount)).toFixed(0)} kcal    |</Text>
            <Text style={[styles.titleText3, styles.activityText]}> <Entypo name="ruler" size={20} color="#f9c618"/>  {(0.7*(this.state.pastStepCount)/1000).toFixed(2)} km    </Text>
            </View>
          </View>
        )
      }
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: 35,
      }, element: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d6d7da',
        width:350,
        backgroundColor: 'transparent',
        marginTop:10,
        marginBottom:10,
        overflow: 'hidden',
      },chart:{
        width:175,
        height:25,
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
      },
      col:{
        flexDirection: 'row',
      },
      activityContainer:{
        justifyContent: 'center',
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
      activityText:{
        fontSize: 20,
        padding:10,
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
    
    //Expo.registerRootComponent(PedometerSensor);
    

export default PedometerSensor;