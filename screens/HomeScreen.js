import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, Font, LinearGradient } from 'expo';
import {
  Avatar,
  Text,
}from 'react-native-elements';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import PedometerSensor from '../components/PedometerSensor';
import CustomCheckBox from '../components/CustomCheckBox';
import calenderItem from '../components/CalenderItem';
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


const list = [
  {
    title: 'Clean my room',
    checked: false,
  },
  {
    title: 'Math assignment',
    checked: false,
  },
  {
    title: 'Web assignment',
    checked: false,
  },
  {
    title: 'Work',
    checked: false,
  }
]

const appointments = [
  {
    title: 'Meeting',
    time: '10:10',
    guest: 'Rolv Wesenlund',

  },
  {
    title: 'lunch',
    time: '12:10',
    guest: 'Brad Pitt',
    
  },
  {
    title: 'Workshop',
    time: '14:10',
    guest: 'Axel Hennie',
    
  },
  {
    title: 'Dinner',
    time: '18:10',
    guest: 'The Rock',
    
  },
  {
    title: 'Meeting',
    time: '10:10',
    guest: 'B. Obama',

  },
  {
    title: 'lunch',
    time: '12:10',
    guest: 'Erna Solberg',
    
  },
  {
    title: 'Workshop',
    time: '14:10',
    guest: 'Per',
    
  },
]


export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      numFinishedTasks: 0,
      activeTab: 0,
      tasks:[],
      steps: 0,
      
    }
    this.setTasks(list)
  }


  static navigationOptions = {
    header: null,
  };

  setTasks(taskList){
    taskList.map((item)=>(
      this.state.tasks.push(item)
    ))
  }

   updateToDo(checked,key) {
    if(checked){
      this.setState({numFinishedTasks: this.state.numFinishedTasks+1})
      this.state.tasks[key%(this.state.tasks.length)].checked = true
    }
    else{
      this.setState({numFinishedTasks: this.state.numFinishedTasks-1})
      this.state.tasks[key%(this.state.tasks.length)].checked = false
    }
  }

  updateActiveTab(index){
      this.setState({activeTab: index})
  }

  getList(activeTab){
    if(activeTab){
      return( 
        <View style={styles.calenderView}>
          {
            appointments.map((item, i) => (
              <CalenderItem key={item.title} text={item.title} time={item.time} location={item.guest}></CalenderItem>
            ))
          }
          </View>
          )
        }
    else{
      
      return(
         
          this.state.tasks.map((item,l)=>(
            <CustomCheckBox parent = {this} key={l} text={item.title} checked={item.checked}/>
          ))
      )
    }
  }

  getDate(){
    let week = ["Sunday","Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ]
    let date = new Date()
    console.log(week[date.getDay()-1], date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear())
    return <View style={styles.header}>
            <Text style={[styles.titleText1, styles.headerText, styles.h1]}>
            {week[date.getDay()]}
            </Text>
            <Text style={[styles.titleText3, styles.headerText, styles.h1]}>
            {date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()}
            </Text>
          </View>
  }

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

  render() {
    return (
      <ScrollView style={styles.container}>
          
      
      <View style={styles.container}>
        <LinearGradient
        style={styles.headerGradient}
        colors={['#3a7bd5', '#3a6073']}
        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}>
        
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
    fontFamily: 'OpenSans-Light',
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
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
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
