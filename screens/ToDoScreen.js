import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput, 
  Alert
} from 'react-native';
import { Button } from 'react-native-elements'
import LinearGradient from 'expo';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TodoTabs from "../components/TodoTabs";
import IconSelector from '../components/IconSelecter';


export default class ToDoScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      messageOpacity: 0,  // Opacity of the error message.
      isDateTimePickerVisible: false,
      date: "Choose date", // Holds the string for the date button(and the data being sent for date)
      errorText: "None", // Holds the validation error message
      icon: "work"
    };
  }
  // removes header
  static navigationOptions = {
    header: null,
  };

  render() {


    // data set for the dropdown element
    let data = [{
      value: 'Sam',
    }, {
      value: 'Bob',
    }, {
      value: 'Harry',
    }];

    return (
      
      <ScrollView>
        <View style={styles.container}>
          <TodoTabs 
            ref={tabs => this.tabs = tabs}
          >
          </TodoTabs>

          <View style={{width: 300, alignContent:"center", justifyContent:'center'}}>
            
            <Text style={[styles.titleText3, styles.h3]}>Enter your task here:</Text>

            <TextInput
              style={[styles.input, styles.titleText3]}
              ref={input => this.input = input}
              onChangeText={(text) => this.input.text = text}
              onFocus={this._removeValidationMessage}
              value={this.state.text}
            />
            <View style={{alignItems:'center', justifyContent:'center', paddingBottom:30}}>
            <Button
              title={this.state.date}
              onPress={this._showDateTimePicker} 
              buttonStyle={{
                marginTop:20,
                padding:5,
                borderRadius:100,
                width:200,
                backgroundColor:"#3a7bd5",
              }}
            />  
            </View>
        
            <View style={{marginTop:20}}>

              <Dropdown 
                data={data} 
                ref = {dropdown => this.dropdown = dropdown} 
                label='I will do this with:'
              >
              </Dropdown>

              <Text style={[styles.titleText3, styles.h3, {marginTop:50}]}>Choose an icon:</Text>

              <IconSelector updateIcon= {this.setIcon.bind(this)}></IconSelector>


            </View>
            
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />

          </View>

          <View style={{opacity: this.state.messageOpacity}}>
          <Text style={styles.errorMessage}>
            {this.state.errorText}
          </Text>

          </View>
          <View style={{alignItems:'center', justifyContent:'center', paddingBottom:30}}>
            <Button
                title="Add to my list" 
                onPress={() => {
                  this._prepareDataForStorage()
                  Alert.alert("Task added!","Since this is a working protype, you'll have to refresh the app to show the new todo. Sorry for this 😥")
              }}
                buttonStyle={{
                  padding:5,
                  borderRadius:100,
                  width:200,
                  backgroundColor:"#3a7bd5",
                }}
              />
          </View> 
        </View> 
      </ScrollView>
    );
  }



  // Resource:
  // https://www.npmjs.com/package/react-native-modal-datetime-picker
  // Datatime-picker that shows and hides after clicks
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  // saves date in state(yyyy-mm-dd), hides DayTimePicker and removes the error message(if there is one)
  _handleDatePicked = (date) => {
    var day = date.getDate()
    if (day<10){
      day = "0" + String(day)
    }
    var month = date.getMonth()+1
    if (month<10){
      month = "0" + String(month)
    }
    this.setState({date: String(date.getFullYear())+"-"+month+"-"+day})
    this._hideDateTimePicker();
    this._removeValidationMessage();
  };

  // Removes error message
  _removeValidationMessage = () =>{
    this.setState({
        messageOpacity : 0
    });
  }

  // saves icon in state
  setIcon(icon){
    this.setState({icon: icon});
  }

  // Checks if the input data is valid and prepares data for storage
  _prepareDataForStorage = () =>{

    var storageKey = "";
    if (this.tabs.state.selectedIndex === 0){
      storageKey = "todo"
    }
    else{
      storageKey = "appointment"
    }

    var text = this.input.text
    if(!text){
      this.setState({messageOpacity: 1,errorText: "You have to describe your task."})
    }
    else if (this.state.date === "Choose date"){
      this.setState({messageOpacity: 1,errorText: "You have to set a date."})
    }
    else if(this.dropdown.selectedItem() == null){
      this._storeData(storageText,this.state.date,text,"-",this.state.icon)
    }
    else {
      this._storeData(storageKey,this.state.date,text,this.dropdown.selectedItem().value,this.state.icon)
    }
  }


  // Adding data to an already existing array in AsyncStorage. If array doesnt exist; create the array. Not the best solution, but suitable for this demo.
  _storeData = async (key,date,text,friend,icon) => {
    try {
      const value = await AsyncStorage.getItem(key);
      var currentData = JSON.parse(value)
      if (currentData != null) {
        if(!(typeof currentData[date] == "object")){
          currentData[date] = [{"text": text, "friend": friend,"icon": icon, "checked": false}]
        }
        else{
          currentData[date].push({"text": text, "friend": friend,"icon": icon, "checked": false})
        }
        await AsyncStorage.setItem(key, JSON.stringify(currentData));
      }
      else{
        var newObj = {}
        newObj[date] = [{"text": text, "friend": friend,"icon": icon, "checked": false}];
        await AsyncStorage.setItem(key, JSON.stringify(newObj));
      }
    } catch (error) {
      // Error saving data
      console.log(error.toString())
      this.setState({errorText: error.toString()})
    }
  }
}

const styles = StyleSheet.create({

  input: {
    height: 40, 
    borderColor: 'gray', 
    borderRadius: 5, 
    paddingLeft: 10, 
    fontSize: 20, 
    borderWidth: 1
  },

  errorMessage: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10,
  },

  dateBtn: {
    padding: "20px"
  },

  datePicker: {
    width: 350,
    backgroundColor: "#aaaaaa",
    borderRadius: 5,
    padding: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding:50,
  },
  centerContent: {
    width:300,
  },
  contentContainer: {
    paddingTop: 30,
  },
  containerBottom: {
    backgroundColor: "#0080ff",
    padding: 20,
  },
  test: {
    opacity:0,
  },
  titleText1: {
    fontFamily: 'SF-Pro-Display-Bold',
  },
  titleText2: {
    fontFamily: 'SF-Pro-Display-Regular',
    textAlign: 'center',
  },
  titleText3: {
    fontFamily: 'SF-Pro-Display-Thin',
    textAlign: 'center',
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