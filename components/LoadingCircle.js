import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles, primaryColor } from './styles';

export default class LoadingCircle extends Component{
  render(){
    return(
      <View style={styles.inner}><ActivityIndicator size="large" color={primaryColor}/></View>
    );
  }
}