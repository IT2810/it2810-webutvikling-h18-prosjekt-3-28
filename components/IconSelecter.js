import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native';
import {
  Icon
} from 'react-native-elements';

import{
  LinearGradient,
} from 'expo';
import SmartIcon from './SmartIcon';


class IconSelector extends React.Component{

  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      strings: ["work", "build","assignment","home", "shop","alarm","accessibility", "bookmark"],
      backgroundcolors: ["#f5f5f5","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff","#ffffff"]
    }
    this.updateIndex = this.updateIndex.bind(this)
    this.changeBG = this.changeBG.bind(this)
  }
  
  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  changeBG(newIndex){
    if (this.state.selectedIndex !== newIndex){
      this.state.backgroundcolors[this.state.selectedIndex] = "#ffffff"
      this.state.backgroundcolors[newIndex] = "#f5f5f5"
      this.updateIndex(newIndex)
      if (this.props.updateIcon != undefined){
        this.props.updateIcon(this.state.strings[newIndex])
      }
    }
  }
  
  render () {
  
    return (
      <TouchableOpacity activeOpacity={1}>  


        <TouchableOpacity activeOpacity={1} style={styles.iconWrapper}>

          <SmartIcon backgroundColor={this.state.backgroundcolors[0]} onPress={this.changeBG} string={this.state.strings[0]} index={0}></SmartIcon>
          <SmartIcon backgroundColor={this.state.backgroundcolors[1]} onPress={this.changeBG} string={this.state.strings[1]} index={1}></SmartIcon>
          <SmartIcon backgroundColor={this.state.backgroundcolors[2]} onPress={this.changeBG} string={this.state.strings[2]} index={2}></SmartIcon>
          <SmartIcon backgroundColor={this.state.backgroundcolors[3]} onPress={this.changeBG} string={this.state.strings[3]} index={3}></SmartIcon>

        </TouchableOpacity>


        <TouchableOpacity activeOpacity={1} style={styles.iconWrapper}>

          <SmartIcon backgroundColor={this.state.backgroundcolors[4]} onPress={this.changeBG} string={this.state.strings[4]} index={4}></SmartIcon>
          <SmartIcon backgroundColor={this.state.backgroundcolors[5]} onPress={this.changeBG} string={this.state.strings[5]} index={5}></SmartIcon>
          <SmartIcon backgroundColor={this.state.backgroundcolors[6]} onPress={this.changeBG} string={this.state.strings[6]} index={6}></SmartIcon>
          <SmartIcon backgroundColor={this.state.backgroundcolors[7]} onPress={this.changeBG} string={this.state.strings[7]} index={7}></SmartIcon>

        </TouchableOpacity>
        <Text>{this.state.date}</Text>
      </TouchableOpacity>
    )
  }
} 

const styles = StyleSheet.create({
  iconWrapper: {
    flex: 1,
    flexDirection: "row",
    marginTop: "5%"
  }
})

export default IconSelector