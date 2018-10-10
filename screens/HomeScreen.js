import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser, Font, LinearGradient, Pedometer } from 'expo';
import {
  Avatar,
  List,
  ListItem,
  Icon,
  CheckBox,
  Header,
  Text,
  Button,
  ButtonGroup,
  
}from 'react-native-elements';
import {PedometerSensor} from '../components/Pedometer';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import CustomCheckBox from '../components/CustomCheckBox';
import calenderItem from '../components/CalenderItem';
import StepView from '../components/StepView';
import Tabs from "../components/Tabs";
import CalenderItem from '../components/CalenderItem';


//Had to add this to load font and icons
Expo.Font.loadAsync({
  'Material Icons': require('@expo/vector-icons/fonts/MaterialIcons.ttf'),
  //'FontAwesome': require("expo/vector-icons/FontAwesome")
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

  getSteps() {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    //return <PedometerSensor></PedometerSensor>

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

  render() {
    return (

      
      
      <View style={styles.container}>
      
      <LinearGradient
        colors={['#89f7fe', '#66a6ff']}
        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}>
          <Header 
          centerComponent={{ text: 'My day', style: { color: '#ffff', fontSize:20,} }}
          backgroundColor='transparent'
          />
      </LinearGradient>

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          
        

          <View style = {styles.welcomeContainer}>

            <Avatar 
            size= 'xlarge'
            rounded
            source={{uri: "https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/32970617_1948604848506974_4342619786350428160_o.jpg?_nc_cat=103&oh=dad757a504368cec2ee81b9380325dc3&oe=5C5E2CE4"}}
            activeOpacity={0.7}
            />


            <Text h3>
              Eirik Lie Morken
            </Text>
            <Text h4>Finished</Text>
            <Text h2>{this.state.numFinishedTasks} / {this.state.tasks.length}</Text>
            <Text>tasks</Text>
            <StepView></StepView>

          </View>
          <Tabs parent = {this}></Tabs>
          <View>
          {//<PedometerSensor/>
          }
            {this.getList(this.state.activeTab)}
          </View>


          

        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  calenderView: {
    backgroundColor:"#eee",
    paddingBottom: 20,
  },
});
