/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, ScrollView, View, Image, AsyncStorage } from 'react-native';
import { Navigation } from 'react-native-navigation';
import axios from 'react-native-axios';

import LoadingCircle from './LoadingCircle';
import { getSheetUrl } from './trampolin_data';
import { addIconTopBar, handleButtonPress } from './customFunctions';
import { styles } from './styles';

export default class AboutSasa extends Component {

	constructor(props){
		super(props)

		Navigation.events().bindComponent(this);

		this.state = {
			mounted: true
		}
	}

	// Set options for screen
	static get options() {
    return {
      topBar: {
        title: {
          component: {
            name: 'CustomTopBarTitle',
            alignment: 'center',
            passProps: {
              title: 'About Saša'
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
		addIconTopBar("AboutSasa");

		if((await AsyncStorage.getItem(this.props.componentId)) != null){
			this.setState({
				about: JSON.parse(await AsyncStorage.getItem(this.props.componentId))
			})
		}
		// Load sheet
		this.handleSheet("about");
	}

	componentWillUnmount(){
		this.setState({
			mounted: false
		})
	}

	render() {
		return (
		  <ScrollView>
  	  		{!this.state.about ? <LoadingCircle/> : this.state.about.map((about, index) => {
            if(about.name == "Sasa"){
  	  		    return(
						  		<View key={index}>
						  			<Image style={{ height: 250, resizeMode: 'contain'}} source={{ uri: about.picture }}/>
						  			<View style={styles.aboutWrapper}>
											<Text style={styles.aboutTitle}>Saša Inkubator</Text>
											<Text style={styles.aboutDesc}>{about.description}</Text>
										</View>
						  		</View>
  	  		    )
            }
  	  		})}
		  </ScrollView>
		);
	}
}
