import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import moment from 'moment';

import { styles } from '../styles';
export default class DetailsSchedule extends Component{
  render(){
    return(
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.scheduleDetailsWrapper}>

          <View style={styles.scheduleDetailsTopWrapper}>
            <Text style={styles.scheduleDetailsLocation}>{this.props.data.room}</Text>
				    <Text style={styles.scheduleDetailsTitle}>{this.props.data.title}</Text>
            <Text style={styles.scheduleDetailsTime}>{moment(this.props.data.event_date).format('ddd, MMM D')} | <Text style={styles.scheduleDetailsTime2}>{moment(this.props.data.time_from).format('H:mm')} - {moment(this.props.data.time_to).format('H:mm')}</Text></Text>
          </View>

          { this.props.data.description != "" ? 
            <View>
              <Text style={styles.scheduleDetailsDetails}>Details:</Text>
              <Text style={[{ borderBottomColor: '#dadce0', borderBottomWidth: 1 }, styles.scheduleDetailsDesc]}>{this.props.data.description}</Text>
            </View>
          : null }

          { this.props.data.host != "" ?
            <View>
              <Text style={styles.scheduleDetailsDetails}>Host:</Text>
              <Text style={styles.scheduleDetailsDesc}>{this.props.data.host}</Text>
            </View>
          : null }
        </View>
      </ScrollView>
    );
  }
}