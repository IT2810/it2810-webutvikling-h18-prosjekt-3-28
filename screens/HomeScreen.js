import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
} from 'react-native';
import { Font, LinearGradient } from 'expo';
import {
  Avatar,
  Text,
}from 'react-native-elements';
import PedometerSensor from '../components/PedometerSensor';
import CustomCheckBox from '../components/CustomCheckBox';
import Tabs from "../components/Tabs";
import CalenderItem from '../components/CalenderItem';


//Had to add this to load font and icons
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


const appointments = [
  {
    title: 'Meeting',
    time: '10:10',
    guest: 'Gunnar Bovim',

  },
  {
    title: 'Lunch',
    time: '11:10',
    guest: 'Brad Pitt',
    
  },
  {
    title: 'Meeting about the future',
    time: '10:10',
    guest: 'B. Obama',

  },
  {
    title: 'lunch meeting',
    time: '12:10',
    guest: 'Erna Solberg',
    
  },
  {
    title: 'Workshop vol 2',
    time: '14:10',
    guest: 'Per',
    
  },
  {
    title: 'Dinner',
    time: '18:10',
    guest: 'The Rock',
    
  },
]


export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      numFinishedTasks: 0,
      activeTab: 0,
      tasks: [],
      steps: 0,
    }
  }

  //This function will be called before render
  async componentWillMount(){
    let value = this.setTasks()
    this.state._isMounted = true
  }

  componentWillUnmount() {
    this.state._isMounted=false
  }

  static navigationOptions = {
    header: null,
  };

  //Updates todo
  //Called from Customcheckbox
  updateToDo(checked,key) {
    if(checked){
      this.setState({numFinishedTasks: this.state.numFinishedTasks+1})
      this.state.tasks[key%(this.state.tasks.length)].checked = true
      this._storeData()
    }
    else{
      this.setState({numFinishedTasks: this.state.numFinishedTasks-1})
      this.state.tasks[key%(this.state.tasks.length)].checked = false
      this._storeData()
    }
  }

  //Updates which tab is active todo/appointments
  updateActiveTab(index){
      this.setState({activeTab: index})
  }

  //Returns a list of elements
  //Either alist of appointments today (calenderItems)
  //or a list of the tasks today (cutsomCheckbox)
  getList(activeTab){
    if(activeTab){
      return( 
        <View style={styles.calenderView}>
          {
            appointments.map((item, i) => (
              <CalenderItem key={item.title} text={item.title} time={item.time} location={item.guest}></CalenderItem>
            ))}
          </View>
          )
        }
    else{
      return(
        this.state.tasks.map((item,l)=>(
          <CustomCheckBox parent = {this} key={l} text={item.text} icon={item.icon} checked={item.checked}/>
        ))
      )
    }
  }

  //Returns a view of what day it is.
  //Used on the top of the homescreen
  getDate(){
    let week = ["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]
    let date = new Date()
    return <View style={styles.header}>
            <Text style={[styles.titleText1, styles.headerText, styles.h1]}>
            {week[date.getDay()]}
            </Text>
            <Text style={[styles.titleText3, styles.headerText, styles.h1]}>
            {date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()}
            </Text>
          </View>
  }

  //Returns a counter of how many tasks the user has done
  //and how many tasks is left
  getTaskView(){
    if(this.state.numFinishedTasks/this.state.tasks.length == 1){
      return <View style={{alignItems:'center'}}>
      <LinearGradient
          style={[styles.taskViewBorder, {alignItems:'center'}]}
          start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
          colors={['#ff9fa7', '#ffd9a4']
          }>
        <Text style={[styles.titleText2, {fontSize:50,color: "#ff9fa7"}]}>🎉</Text>
      </LinearGradient>
  </View>
    }else{
      return <View style={{alignItems:'center'}}>
          <LinearGradient
              style={[styles.taskViewBorder, {alignItems:'center'}]}
              start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
              colors={['#ff9fa7', '#ffd9a4']
              }>
            <View style={[styles.taskView]}>
            <Text style={[styles.titleText3, {fontSize:20,color: "#ff9fa7"}]}>Task count</Text>
            <Text style={[styles.titleText2, {fontSize:50,color: "#ff9fa7"}]}>{this.state.numFinishedTasks} / {this.state.tasks.length}</Text>
            </View>
          </LinearGradient>
      </View>
    }
  }

  //Called in willmount() 
  //sets tasks to state loaded from async
  //Retrives tasks thats should be done today
   async setTasks(){
    let date  = new Date()
    var value = await this._retrieveData()
    value = value[[date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()]]
    this.setState({tasks:value})
    let counter = 0 
    value.forEach(element => {
      if(element.checked == true){
        counter ++
      }
    });
    this.setState({numFinishedTasks: counter})
    return value[[date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()]]
  }

  //Retrives data from async
  _retrieveData = async () => {
    try {
      var value = await AsyncStorage.getItem('todo');
      if (value !== null) {
        return JSON.parse(value)
      }
     } catch (error) {
        return null
     }
  }

  // Stores data to async
  // Called every time the user updates a task
  _storeData = async () => {
    try {
      let date = new Date()
      let saved = await this._retrieveData()

      saved[[date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()]] = this.state.tasks

      await AsyncStorage.setItem('todo', JSON.stringify(saved));
    } catch (error) {
      console.log(error.toString())
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
      <View style={styles.container}>
        <LinearGradient
        style={styles.headerGradient}
        colors={['#3a7bd5', '#3a6073']}
        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}
        }>
          {this.getDate()}
          <Avatar
          style={styles.headerAvatar}
          size='large'
          rounded
          source={{uri: "https://s3.eu-central-1.amazonaws.com/artistarea.gallereplay.com/production/user_9/picture_2405201614728.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
        </LinearGradient>

          <View style = {styles.topContainer}>
            {this.getTaskView()}
            <PedometerSensor></PedometerSensor>
          </View>

          <View style={styles.tab}>
          <Tabs parent = {this} ></Tabs>

            {this.getList(this.state.activeTab)}
          </View>
      </View>
      </ScrollView>
    );
  }
}


// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop:50,
    paddingBottom: 70,
    paddingLeft:15,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  headerAvatar:{
    marginTop:40,
    marginBottom: 20,
    position: 'absolute',
    right: 60,
    top: 50,
  },
  headerGradient:{
    borderRadius: 20,
    overflow:'hidden',
    flexDirection: 'row',
    marginBottom: 25,
  },
  headerText:{
    color:'#ffff',
  },
  topContainer: {
    paddingTop: 10,
  },
  col:{
    flexDirection: 'row',
  },
  navigationFilename: {
    marginTop: 5,
  },
  calenderView: {
    backgroundColor:'#eee',
    paddingBottom: 20,
    alignItems: 'center',
  },
  taskView:{
    borderRadius:100,
    height:150,
    width:150,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor:'#fff',
  },
  taskViewBorder:{
    borderRadius:100,
    height:160,
    width:160,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
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
