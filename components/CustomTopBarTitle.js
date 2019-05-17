import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
		color: 'black',
		fontFamily: 'Akrobat-Bold'
  }
})
export default class CustomTopBarTitle extends Component{
  render(){
    return(
      <Text style={styles.title}>{this.props.title}</Text>
    );
  }
}