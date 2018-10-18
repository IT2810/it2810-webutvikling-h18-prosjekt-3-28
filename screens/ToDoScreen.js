import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button,
  TextInput
} from 'react-native';

import Icon from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { WebBrowser } from 'expo';

import TodoTabs from "../components/TodoTabs";
import IconSelector from '../components/IconSelecter';
import AgendaScreen from '../screens/AgendaScreen';



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
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <TodoTabs 
            style = {{marginTop:"20%"}} 
            ref={tabs => this.tabs = tabs}
          >
          </TodoTabs>

          <View style={{width: '80%',marginLeft:'10%',}}>
            
            <Text style={{marginLeft:10,marginTop:40}}>Enter your task here:</Text>

            <TextInput
              style={styles.input}
              ref={input => this.input = input}
              onChangeText={(text) => this.input.text = text}
              onFocus={this._removeValidationMessage}
              value={this.state.text}
            />

            <View style={{backgroundColor:"#f5f5f5",marginTop:"5%",width:"95%",marginLeft:"2.5%"}}><Button style={styles.dateBtn}  color="#555555" onPress={this._showDateTimePicker} title={this.state.date} /></View>
            
            <View style={{marginBottom:"5%",width:"95%",marginLeft:"2.5%"}}>

              <Dropdown 
                data={data} 
                ref = {dropdown => this.dropdown = dropdown} 
                label='I will do this with:'
              >
              </Dropdown>

              <Text style={{marginTop: "5%"}}>Choose a icon:</Text>

              <IconSelector updateIcon= {this.setIcon.bind(this)}></IconSelector>


            </View>
            
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
            />

          </View>
            
        </ScrollView>

        <View style={{opacity: this.state.messageOpacity}}>

          <Text style={styles.errorMessage}>
            {this.state.errorText}
          </Text>

        </View>
        <View style={styles.containerBottom}>

              <Button 
                color="#ffffff" 
                onPress={this._prepareDataForStorage} 
                title="Add to my list" 
              />

        </View>


      </View>
    );
  }

  // Resource:
  // https://www.npmjs.com/package/react-native-modal-datetime-picker
  // Datatime-picker that shows and hides after clicks
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

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

  
  _removeValidationMessage = () =>{
    this.setState({
        messageOpacity : 0
    });
  }

  setIcon(icon){
    this.setState({icon: icon});
  }

  // 
  _prepareDataForStorage = () =>{

    var storageText = "";
    if (this.tabs.state.selectedIndex === 0){
      storageText = "todo"
    }
    else{
      storageText = "appointment"
    }

    var text = this.input.text
    if(!text){
      this.setState({messageOpacity: 1,errorText: "You have to describe your task."})
    }
    else if (this.state.date === "Choose date"){
      this.setState({messageOpacity: 1,errorText: "You have to set a date."})
    }
    else if(this.dropdown.selectedItem() == null){
      var input = [this.state.date,text,"-",this.state.icon]
      dict = this.createDict(this.state.date,text,"-",this.state.icon)
      //this._storeData(storageText,input)
    }
    else {
      this._storeData(storageText,this.state.date,text,this.dropdown.selectedItem().value,this.state.icon)
    }
  }


  createDict(date,text,friend,icon){
    dict = {}
    dict[date] = [{"text": text, "friend": friend,"icon": icon}]
    dict[date].push({"text": text, "friend": friend,"icon": icon})
    console.log(dict)
  }

  // Adding data to an already existing array in AsyncStorage. If array doesnt exist; create the array. Not the best solution, but suitable for this demo.
  _storeData = async (key,date,text,friend,icon) => {
    try {
      const value = await AsyncStorage.getItem(key);
      var current = JSON.parse(value)
      console.log("Starts here")
      console.log(current)
      if (current != null) {
        if(!(typeof current[date] == "object")){
          current[date] = [{"text": text, "friend": friend,"icon": icon}]
          console.log(typeof current[date])
        }
        else{
          current[date].push({"text": text, "friend": friend,"icon": icon})
        }
        await AsyncStorage.setItem(key, JSON.stringify(current));
      }
      else{
        var newObj = {}
        newObj[date] = [{"text": text, "friend": friend,"icon": icon}];
        await AsyncStorage.setItem(key, JSON.stringify(newObj));
      }
    } catch (error) {
      // Error saving data
      this.setState({errorText: error.toString()})
    }
    //this.updateCalendar();
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
    marginBottom: "5%"
  },

  dateBtn: {
    padding: "20px"
  },

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
    marginLeft:'10%',
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
  }
});