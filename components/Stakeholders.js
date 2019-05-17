/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, ScrollView, View, TouchableNativeFeedback, Image, Linking, Platform, TouchableHighlight, AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import axios from 'react-native-axios';

import LoadingCircle from './LoadingCircle';
import { getSheetUrl } from './future40_data';
import { addIconTopBar, handleButtonPress } from './customFunctions';
import { styles } from './styles';

export default class Stakeholders extends Component {

	constructor(props){
		super(props)

		Navigation.events().bindComponent(this);

		this.state = {
			mounted: true
		}
	}

	static get options() {
    return {
      topBar: {
        title: {
          component: {
            name: 'CustomTopBarTitle',
            alignment: 'center',
            passProps: {
              title: 'Stakeholders'
            }
          }
        },
      }
    };
  }

  // Handler for navigation button presses
  navigationButtonPressed({ buttonId }) {
    // Custom button handle function, accepts button id
    handleButtonPress(buttonId);
  }

	// Accepts sheet name
	// Calls getSheetUrl for sheet url
	// Fetches json at url
	// Outputs state with sheets name
	handleSheet = (sheet) => {
	  	getSheetUrl(sheet, (url) => {
	    	axios.get(url).then(result => {
          if(this.state.mounted){
	    	    this.setState({
	    	        [sheet]: result.data[sheet],
            }, function(){ sheet == "sponsors" ? this.getTypes() : null; AsyncStorage.setItem(this.props.componentId, JSON.stringify(this.state[sheet]))})
          }
	    	})
	  })
  }

  getTypes= () => {

    var uniqueNames = [];

    for(var i = 0; i < this.state.sponsors.length; i++){    
        if(uniqueNames.indexOf(this.state.sponsors[i].sponsor_type) === -1){
            uniqueNames.push(this.state.sponsors[i].sponsor_type);    
        }        
    }

    this.setState({
        uniqueTypes: uniqueNames
    }, () => {AsyncStorage.setItem("sponsorTypes", JSON.stringify(this.state.uniqueTypes))})

  }

	async componentDidMount(){
    // Adds icon in the top bar
		addIconTopBar("Stakeholders");

		if((await AsyncStorage.getItem(this.props.componentId)) != null){
			this.setState({
        sponsors: JSON.parse(await AsyncStorage.getItem(this.props.componentId)),
        uniqueTypes: JSON.parse(await AsyncStorage.getItem("sponsorTypes"))
			})
		}
    // Load sheet
    this.handleSheet("sponsors");
  }
  
  componentWillUnmount(){
		this.setState({
			mounted: false
		})
	}

	render() {
		return (
		  <ScrollView style={{backgroundColor: 'white'}}>

        { this.state.uniqueTypes ? this.state.uniqueTypes.map((type, index) => {
          return(
            <View key={index}>
              <Text style={styles.stakeholdersTypeText}>{type}</Text>
              {this.state.sponsors.map((sponsor, index2) => {
                if(sponsor.sponsor_type == type && sponsor.hidden == false){
                  if(Platform.OS == "android"){
                    return(
                      <TouchableNativeFeedback key={index2} onPress={() => {Linking.openURL(sponsor.website)}}>
                        <View style={styles.stakeholdersCardWrapper}>
                          <Image style={styles.stakeholdersCardImage} source={{ uri: sponsor.logo }}/>
                          <Text style={[styles.listCardText, styles.stakeholdersCardText]}>{sponsor.name}</Text>
                        </View>
                      </TouchableNativeFeedback>
                    )
                  }
                  else{
                    return(
                      <TouchableHighlight underlayColor={'rgba(52,73,85,0.05)'} key={index2} onPress={() => {Linking.openURL(sponsor.website)}}>
                          <View style={styles.stakeholdersCardWrapper}>
                            <Image style={styles.stakeholdersCardImage} source={{ uri: sponsor.logo }}/>
                            <Text style={[styles.listCardText, styles.stakeholdersCardText]}>{sponsor.name}</Text>
                          </View>
                      </TouchableHighlight>
                    )
                  }
                }
              })}
            </View>
          )
        }) : <LoadingCircle/>}
        
		  </ScrollView>
		);
	}
}
