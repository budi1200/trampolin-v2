/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, ScrollView, View, TouchableNativeFeedback, Image, TouchableHighlight, Platform, AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import axios from 'react-native-axios';

import LoadingCircle from '../LoadingCircle';
import { getSheetUrl } from '../trampolin_data';
import { addIconTopBar, handleButtonPress, changeScreen } from '../customFunctions';
import { styles } from '../styles';

export default class Corporations extends Component {

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
              title: 'Corporations'
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
		addIconTopBar("Corporations");

		if((await AsyncStorage.getItem(this.props.componentId)) != null){
			this.setState({
				corporations: JSON.parse(await AsyncStorage.getItem(this.props.componentId))
			})
		}

		// Load sheet
		this.handleSheet("corporations");
	}

	componentWillUnmount(){
		this.setState({
			mounted: false
		})
	}

	render() {
		return (
		  <ScrollView style={{backgroundColor: 'white', marginTop: 4, marginBottom: 4}}>
  	  		{!this.state.corporations ? <LoadingCircle/> : this.state.corporations.map((corporation, index) => {
						if(corporation.hidden == false){
							if(Platform.OS == "android"){
  	  		  		return(
  	  		  		  <TouchableNativeFeedback key={index} onPress={() => {changeScreen(corporation, "Corporations")}}>
										<View style={styles.listCardWrapper}>
											<Image style={styles.listCardImage} source={{ uri: corporation.logo }}/>
											<Text style={styles.listCardText}>{corporation.name}</Text>
										</View>
									</TouchableNativeFeedback>
  	  		  		)
							}
							else{
  	  		  		return(
  	  		  		  <TouchableHighlight underlayColor={'rgba(52,73,85,0.05)'} key={index} onPress={() => {changeScreen(corporation, "Corporations")}}>
										<View style={styles.listCardWrapper}>
											<Image style={styles.listCardImage} source={{ uri: corporation.logo }}/>
											<Text style={styles.listCardText}>{corporation.name}</Text>
										</View>
									</TouchableHighlight>
  	  		  		)
							}
						}
  	  		})}
		  </ScrollView>
		);
	}
}
