import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
    FormLabel, 
    FormInput,
    FormValidationMessage,
} from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { WebBrowser } from 'expo';

import Tabs from "../components/Tabs";

import { MonoText } from '../components/StyledText';

export default class ToDoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { key:0, storedText: "", messageOpacity: 0, isDateTimePickerVisible: false, date: "Choose date", errorText: "None" };
        }
    static navigationOptions = {
        header: null,
    
  };

  render() {

    let output = ""
    if(typeof this.state.date === "string"){output = this.state.date}else{ output = String(this.state.date.getDate()) + "/" + String(this.state.date.getMonth()+1) + "/" + String(this.state.date.getFullYear())}
    
    let data = [{
      value: 'Sam',
    }, {
      value: 'Bob',
    }, {
      value: 'Harry',
    }];


    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={{width: '80%',marginLeft:'10%',}}>
            <Tabs ref = {tabs => this.tabs = tabs}></Tabs>
            <FormLabel>Enter your task here:</FormLabel>
            <FormInput ref={input => this.input = input} onChangeText={(text) => this._removeValidationMessage(text)} onPress={this._removeValidationMessage}/>
            <TouchableOpacity>
              <Dropdown data={data} ref = {dropdown => this.dropdown = dropdown} label='I will do this with:'></Dropdown>
            </TouchableOpacity>
            <FormValidationMessage opacity={this.state.messageOpacity}>{"You cannot leave this space blank."}</FormValidationMessage>
            <View style={{marginTop:"5%",marginBottom:"5%"}}><Button onPress={this._showDateTimePicker} title={output} /></View>
            

            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />

            

            <Button marginTop="5%" onPress={this._addData} title="Add to my list" />
            
            
            <Text style={{textAlign:"center",}}>{this.state.currentArray}</Text>
            <Text style={{textAlign:"center",color:"red"}}>{this.state.errorText}</Text>
          </View>
          
          
          
          
            
        </ScrollView>
      </View>
    );
  }


  // https://www.npmjs.com/package/react-native-modal-datetime-picker
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.setState({date: String(date.getFullYear())+"-"+String(date.getMonth()+1)+"-"+String(date.getDate())})
    this._hideDateTimePicker();
  };

  _removeValidationMessage = (text) =>{
    this.input.text = text
    this.setState({
        messageOpacity : 0
    })
  }

  _addData = () =>{

    let data = [{
      value: 'Sam',
    }, {
      value: 'Bob',
    }, {
      value: 'Harry',
    }];

    var storageText = "";
    if (this.tabs.state.selectedIndex === 0){
      storageText = "todo"
    }
    else{
      storageText = "appointment"
    }

    var text = this.input.text
    if (!text){
      this.setState({messageOpacity: 1})
    }
    else if(this.state.date === "Choose date"){
      console.log("Set date")
    }
    else {
      var input = [this.state.date,text,this.dropdown.selectedItem().value]
      this._storeData(storageText,input)
    }
  }
  _storeData = async (key,array) => {
    try {
      const value = await AsyncStorage.getItem(key);
      var current = JSON.parse(value)
      if (Array.isArray(current)) {
        current.push(array)
        console.log(current)
        await AsyncStorage.setItem(key, JSON.stringify(current));
      }
      else{
        await AsyncStorage.setItem(key, JSON.stringify([]));
      }
    } catch (error) {
      // Error saving data
      this.setState({errorText: error.toString()})
    }
  }

  _retrieveText = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        this.setState({currentArray: value})
      }
    } catch (error) {
        // Error retrieving data
        this.setState({errorText: "GET"})
      }
  }
}

const styles = StyleSheet.create({

  datePicker: {
    width: "90%",
    marginLeft: "5%",
    height: "20%",
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "#aaaaaa",
    borderRadius: 5,
    padding: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContent: {
    width:'80%',
    marginLeft:'10%'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  }
});