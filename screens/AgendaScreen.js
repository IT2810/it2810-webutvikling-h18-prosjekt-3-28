import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Agenda, DateObject } from 'react-native-calendars';


// This Screen/Class is based upon an example from https://github.com/expo/examples/blob/master/with-react-native-calendars/screens/agenda.js
// It generates some random appointments to fill up some of the days in the Agenda
// Functionality have been added to allow for "importing" ToDos from the AsyncStorage and show them inside the Agenda
export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      items: {}
    };
  }

  // Returns a color for the background of either an Appointment or ToDo
  getColor(taskType){
    let taskToColor = 
    {"todo": "#9be7ff", "appointment": "#ff8a65"};
    return taskToColor[taskType];
  }

  // Basic AsyncStorage-fetch, based upon example from https://facebook.github.io/react-native/docs/asyncstorage
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('todo');
      var current = JSON.parse(value);
      if(current != null){
         this.data = Object.assign({}, current);
        }
    } catch (error) {
        console.log("An error occured");
    }
  }

  // After the data is fetched from AsyncStorage, this function loops through and adds any new ToDos to the Agenda
  importToCalendar(){
    for(let key in this.data){
      if(!this.state.items[key]){
        this.state.items[key] = [];
      }
      for(let i = 0; i < this.data[key].length; i++){
        let appointment = this.data[key][i];
        let alreadyExists = false;
        for(let j = 0; j < this.state.items[key].length; j++){
            let existing = this.state.items[key][j]
            let appointmentText = appointment["text"] + " with: " + appointment["friend"];
            if(appointmentText == existing["name"]){
                alreadyExists = true;
                break;
            }
        }
        if(!alreadyExists){
            this.state.items[key].push({
              name: appointment["text"] + " with: " + appointment["friend"],
              height: 50, type: "todo"
            });
        }
      } 
    }
  }

  // Function based upon the example which creates some random appointments to fill up the Agenda
  generateRandomAppointments(day){
    for (let i = -15; i < 15; i++) {
      const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      const strTime = this.timeToString(time);
      if (!this.state.items[strTime]) {
        this.state.items[strTime] = [];
        const numItems = Math.floor(Math.random() * 2);
        for (let j = 0; j < numItems; j++) {
          this.state.items[strTime].push({
            name: 'Randomly generated appointment for ' + strTime,
            height: Math.max(50, Math.floor(Math.random() * 100)),
            type: "appointment"
            });
          }
        }
    }
  }

  render() {
    this._retrieveData();
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        onDayChange={this.loadItems.bind(this)}
        onDayPress={this.loadItems.bind(this)}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      this.generateRandomAppointments(day);
      this.importToCalendar();
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height, backgroundColor: this.getColor(item.type)}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is an empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});