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
  List,
  ListItem,
  Icon,
  CheckBox,
  Header,
  Text,
  Button,
  ButtonGroup,
}from 'react-native-elements';
import {Pedometer} from '../components/Pedometer';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import CustomCheckBox from '../components/CustomCheckBox';
import StepView from '../components/StepView';
import Tabs from "../components/Tabs";


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

  },
  {
    title: 'lunch',
    time: '12:10',
    
  },
  {
    title: 'Workshop',
    time: '14:10',
    
  },
  {
    title: 'Dinner',
    time: '18:10',
    
  },
  {
    title: 'Meeting',
    time: '10:10',

  },
  {
    title: 'lunch',
    time: '12:10',
    
  },
  {
    title: 'Workshop',
    time: '14:10',
    
  },
  {
    title: 'Dinner',
    time: '18:10',
    
  },
]


export default class HomeScreen extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      finished: 0,
      activeTab: 0,
    }
  }

  static navigationOptions = {
    header: null,
  };


   updateToDo(i) {
    this.setState({finished: this.state.finished+i})
  }

  updateActiveTab(index){
      this.setState({activeTab: index})
      console.log(this.state.activeTab)
  }

  getList(activeTab){
    console.log(activeTab)
    if(activeTab){
      return( 
<View>
  {
    appointments.map((item, i) => (
      <ListItem
        key={i}
        title={item.title}
      />
    ))
  }
</View>
      )
    }
    else{
      return(
          list.map((item,i)=>(
            <CustomCheckBox parent = {this} key={i} text={item.title} checked={item.checked}/>
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
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
            />


            <Text h3>
              Eirik Lie Morken
            </Text>
            <Text h4>Finished</Text>
            <Text h2>{this.state.finished} / {list.length}</Text>
            <Text>tasks</Text>
            <StepView></StepView>

          </View>
          <Tabs parent = {this}></Tabs>
          <View>
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
});
