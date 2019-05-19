import React, { Component } from 'react';
import { ScrollView, Text, Image, View, Dimensions, TouchableNativeFeedback, Linking, Platform, TouchableHighlight, Clipboard } from 'react-native';
import HTML from 'react-native-render-html';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import DynamicButton from './DynamicButton';

export default class PersonDetails extends Component{

  render(){

    const person = this.props.data;

    return(
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{flex: 1, alignItems: "center", marginTop: 16, marginBottom: 8}}>
          <Image style={styles.personDetailsPicture} source={{ uri: person.picture }} />
          <Text style={styles.personDetailsName}>{person.first_name + " " + person.last_name}</Text>
          <Text style={styles.personDetailsPosition}>{person.position}</Text>
        </View>
        
        <View style={styles.personDetailsDescription}>
          { this.props.data.description != '' ?
            <HTML html={this.props.data.description} baseFontStyle={{fontFamily: 'Akrobat-Regular', fontSize: 15}} imagesMaxWidth={Dimensions.get('window').width} />
          : null }
        </View>

        <View style={styles.personDetailsContact}>
          {person.email !== '' ? 
            <DynamicButton style={styles.personDetailsContactIcon} borderRadius={styles.personDetailsContactIcon.borderRadius} onPress={() => Linking.openURL("mailto:" + person.email)} onLongPress={() => Clipboard.setString(person.email)}>
              <View>
                <MaterialCommunityIcons name={'email-outline'} size={24} color={'white'}/>
              </View>           
            </DynamicButton>
          : null}

          {person.linkedin !== '' ? 
            <DynamicButton style={styles.personDetailsContactIcon} borderRadius={styles.personDetailsContactIcon.borderRadius} onPress={() => Linking.openURL(person.linkedin)}>
              <View>
                <MaterialCommunityIcons name={'linkedin'} size={24} color={'white'}/>
              </View>           
            </DynamicButton>
          : null}

          {person.phone !== '' ? 
            <DynamicButton style={styles.personDetailsContactIcon} borderRadius={styles.personDetailsContactIcon.borderRadius} onPress={() => Linking.openURL("tel:" + person.phone)} onLongPress={() => Clipboard.setString(person.phone)}>
              <View>
                <MaterialCommunityIcons name={'phone'} size={24} color={'white'}/>
              </View>           
            </DynamicButton>
            : null }
          </View>
          
      </ScrollView>
    );
  }
}