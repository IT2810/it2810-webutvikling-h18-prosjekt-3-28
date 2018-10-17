import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.state = {
      items: {}
    };
  }

  getColor(taskType){
    let taskToColor = 
    {"todo": "#9be7ff", "appointment": "#ff8a65"};
    return taskToColor[taskType];
  }

  _retrieveData2 = async () => {
    console.log("Trying:")
    try {
      const value = await AsyncStorage.getItem('todo');
      console.log("Value:")
      console.log(value);
      var current = JSON.parse(value);
      console.log("Current:")
      console.log(current);
       if(current != null){
         this.data = Object.assign({}, current);
        }
     } catch (error) {
       // Error retrieving data
       console.log("An error occured");
     }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('todo');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
     } catch (error) {
       // Error retrieving data
       console.log("Error message");
     }
  }


  render() {
    this._retrieveData2();
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        //selected={'2017-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        //markingType={'interactive'}
        //markedDates={{
        //  '2017-05-08': [{textColor: '#666'}],
        //  '2017-05-09': [{textColor: '#666'}],
        //  '2017-05-14': [{startingDay: true, color: 'blue'}, {endingDay: true, color: 'blue'}],
        //  '2017-05-21': [{startingDay: true, color: 'blue'}],
        //  '2017-05-22': [{endingDay: true, color: 'gray'}],
        //  '2017-05-24': [{startingDay: true, color: 'gray'}],
        //  '2017-05-25': [{color: 'gray'}],
        //  '2017-05-26': [{endingDay: true, color: 'gray'}]}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      console.log("This.data");
      console.log(this.data);
      for (let i = -15; i < 15; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      for(let key in this.data){
          if(!this.state.items[key]){
            this.state.items[key] = [];
            for (let appointment in this.data[key]) {
                this.state.items[key].push({
                  name: appointment.text + " with: " + appointment.friend,
                  height: 100
                });
              } 
          }
          else {
            for (let appointment in this.data[key]) {
                this.state.items[key].push({
                  name: appointment.text + " with: " + appointment.friend,
                  height: 100
                });
              } 
          }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height, backgroundColor: this.getColor("appointment")}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
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