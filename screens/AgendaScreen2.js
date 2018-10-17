import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Agenda } from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.data = {};
    this.markedDates = {};
    this.items = {}
    // this.state = {
    //   items: {},
    //   data: {},
    //   markedDates: {}
    // };
  }

  _retrieveData = async () => {
    console.log("retrive")
    try {
      console.log("trying")
      const value = await AsyncStorage.getItem('todo');
      //console.log(value);
      var current = JSON.parse(value);
      console.log("Current:")
      console.log(current);
      if(current != null){
        this.data = Object.assign({},current);
        console.log("Data From _retrievedata")
        console.log(this.data);
        // this.setState({
        //   data: current 
        // })
        //console.log(current);
      }
     } catch (error) {
       // Error retrieving data
     }
  }


  getColor(taskType){
    let taskToColor = 
    {"todo": "#9be7ff", "appointment": "#ff8a65"};
    return taskToColor[taskType];
  }

  updateCalendar(){
    console.log("updateCalendar")
    this._retrieveData();

    console.log("------------------udateCalendar----------------")
    console.log("This.Data")
    console.log(this.data)
   let calendarMarkedDates = {"2018-10-20": {marked: true, dotColor: this.getColor("appointment")}}; 
   
   let updatedItems = {};
   let newMarkedDates = this.markedDates;

   for(var key in this.data){
     if(!this.markedDates[key]){
      newMarkedDates[key] = {marked: true, dotColor: this.getColor("appointment")};
     }
     if(!updatedItems[key]){
      updatedItems[key] = [];
      for(var appointments in this.data[key]){
        updatedItems[key].push({
          height: 100, name: "You have a ToDo: " + appointments.text + " with " + appointments.friend
        });
      }
     }
   }
   this.items = updatedItems;
   this.markedDates = newMarkedDates;
  //  this.setState({
  //    items: updatedItems,
  //    markedDates: markedDates 
  //  });
   console.log("updatedItems:--------------------");
   console.log(updatedItems);
  //  }
  //  {"2018-10-10":[{"height": 113, "name": "Item form sadok"},{"height": 50, "name": "dkfkdsf"}], 
  //               "2018-10-15":[{"height": 113, "name": "Item form sadok"},{"height": 50, "name": "dkfkdsf"}], 
  //               "2018-10-11":[{"height": 113, "name": "Item form sadok"},{"height": 50, "name": "dkfkdsf"}], 
  //               "2018-10-12":[{"height": 113, "name": "Item form sadok"}]}

  }

  render() {
    this.updateCalendar();
    //let calendarMarkedDates = {"2018-10-20": {marked: true, dotColor: this.getColor("appointment")}} 
    return (
      <Agenda
        items={this.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        //selected={'2017-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        markedDates={this.markedDates}
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

  loadItems() {
    setTimeout(() => {
      // for (let i = 0; i < 1; i++) {
      //   const time = day.timestamp; //+ i * 24 * 60 * 60 * 1000;
      //   const strTime = this.timeToString(time);
      //   //console.log("strTime = " + strTime);
      //   if (!this.state.items[strTime]) {
      //     this.state.items[strTime] = [];
      //     const numItems = 1;//Math.floor(Math.random() * 5);
      //     for (let j = 0; j < numItems; j++) {
      //       this.state.items[strTime].push({
      //         name: 'Item for ' + strTime + ', appointment ' + j, //Include name/Description of appointment
      //         height: Math.max(50, Math.floor(Math.random() * 150))
      //       });
      //     }
      //   }
      // }
      // this.setState({
      //   items: {"2018-10-10":[{"height": 113, "name": "Item form sadok"},{"height": 50, "name": "dkfkdsf"}], 
      //           "2018-10-15":[{"height": 113, "name": "Item form sadok"},{"height": 50, "name": "dkfkdsf"}], 
      //           "2018-10-11":[{"height": 113, "name": "Item form sadok"},{"height": 50, "name": "dkfkdsf"}], 
      //           "2018-10-12":[{"height": 113, "name": "Item form sadok"}]}
      // });
    }, 1000);
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
    backgroundColor: 'white', //ToDo: #9be7ff, Appointment: #ff8a65
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