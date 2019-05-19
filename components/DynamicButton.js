import React, { Component } from 'react';
import { TouchableNativeFeedback, Platform, TouchableHighlight, View } from 'react-native';

import { touchBackground } from './styles';

export default class DynamicButton extends Component {
  render() {
    if(Platform.OS == "android"){
      return(
        <View style={{overflow: "hidden"}} borderRadius={this.props.borderRadius ? this.props.borderRadius : 0}>
          <TouchableNativeFeedback delayPressIn={0} onPress={this.props.onPress}>
            <View style={this.props.style}>
              {this.props.children}
            </View>          
          </TouchableNativeFeedback>
        </View>
      );
    }else{
      return(
        <TouchableHighlight style={this.props.style} underlayColor={touchBackground} onPress={this.props.onPress}>
          {this.props.children}
        </TouchableHighlight>
      );
    }
  }
}
