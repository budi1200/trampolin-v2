/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, ScrollView, View, TouchableNativeFeedback, Image, Platform, TouchableHighlight, AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import ImageSvg from 'react-native-remote-svg'

import { getSheetUrl } from './future40_data';
import axios from 'react-native-axios';
import { addIconTopBar, handleButtonPress, changeScreen } from './customFunctions';
import LoadingCircle from './LoadingCircle';
import { styles } from './styles';

export default class Startups extends Component {

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
              title: 'Startups'
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
						}, () => {AsyncStorage.setItem(this.props.componentId, JSON.stringify(this.state[sheet]))})
					}
	    	})
	  })
	}

	async componentDidMount(){
		// Adds icon in the top bar
		addIconTopBar("Startups");

		if((await AsyncStorage.getItem(this.props.componentId)) != null){
			this.setState({
				startups: JSON.parse(await AsyncStorage.getItem(this.props.componentId))
			})
		}
		// Load sheet
		this.handleSheet("startups");
	}

	componentWillUnmount(){
		this.setState({
			mounted: false
		})
	}

	render() {
		return (
		  <ScrollView style={{backgroundColor: 'white'}}>
  	  		{!this.state.startups ? <LoadingCircle/> : this.state.startups.map((startup, index) => {
						if(startup.hidden == false){
							if(Platform.OS == "android"){
  	  		  		return(
  	  		  		  <TouchableNativeFeedback key={index} onPress={() => {changeScreen(startup, "Startups")}}>
										<View style={styles.listCardWrapper}>
											{(startup.logo).slice(-3) === "svg" ? <ImageSvg style={styles.listCardImage} source={{ uri: startup.logo }}/> : <Image style={[styles.listCardImage, {resizeMode: 'contain'}]} source={{ uri: startup.logo }}/>}
											<Text style={[styles.listCardText, styles.stakeholdersCardText]}>{startup.name}</Text>
										</View>
									</TouchableNativeFeedback>
  	  		  		)
							}
							else{
								return(
  	  		  		  <TouchableHighlight underlayColor={'rgba(52,73,85,0.05)'} key={index} onPress={() => {changeScreen(startup, "Startups")}}>
										<View style={styles.listCardWrapper}>
											{(startup.logo).slice(-3) === "svg" ? <ImageSvg style={styles.listCardImage} source={{ uri: startup.logo }}/> : <Image style={[styles.listCardImage, {resizeMode: 'contain'}]} source={{ uri: startup.logo }}/>}
											<Text style={styles.listCardText}>{startup.name}</Text>
										</View>
									</TouchableHighlight>
								);
							}
						}
  	  		})}
		  </ScrollView>
		);
	}
}
