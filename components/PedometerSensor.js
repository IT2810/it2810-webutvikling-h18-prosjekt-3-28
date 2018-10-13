import React from "react";
import { Expo, Pedometer, LinearGradient } from "expo";
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
            this.parent.updateSteps(this.state.pastStepCount);
            console.log()
          },
          error => {
            this.setState({
              pastStepCount: "Could not get stepCount: 😥"
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
            <Text h4>Your activity today</Text>
            <View style={styles.element}>
            
              <LinearGradient
                start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
                colors={['#89f7fe', '#66a6ff']
              }
              >

              <View style={styles.chart} width={this.getWidth()}></View>
      
              </LinearGradient>
            </View>
            <Text>{this.state.pastStepCount} steps</Text>
          </View>
        )
      }
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: 35,
        alignItems: "center",
        justifyContent: "center"
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
    
    //Expo.registerRootComponent(PedometerSensor);
    

export default PedometerSensor;