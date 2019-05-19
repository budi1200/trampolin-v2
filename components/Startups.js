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
import ImageSvg from 'react-native-remote-svg'

import { getSheetUrl } from './trampolin_data';
import axios from 'react-native-axios';
import { addIconTopBar, handleButtonPress, changeScreen } from './customFunctions';
import LoadingCircle from './LoadingCircle';
import { styles } from './styles';
import DynamicButton from './DynamicButton';

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
						}, () => {sheet === 'members' ? this.assignMembers() : this.handleSheet("members")})
					}
	    	})
	  })
	}

	assignMembers = () => {
		var initialStartups = this.state.startups;
		var modifiedStartups = [];

		initialStartups.map((startup) => {
			startup.members = [];
			var members = this.state.members.filter(member => member.team_id === startup.id);
			Object.assign(startup.members, members);
			modifiedStartups.push(startup);
		})

		this.setState({
			finalStartups: modifiedStartups
		}, () => AsyncStorage.setItem(this.props.componentId, JSON.stringify(this.state.finalStartups)))
	}

	async componentDidMount(){
		// Adds icon in the top bar
		addIconTopBar("Startups");

		if((await AsyncStorage.getItem(this.props.componentId)) != null){
			this.setState({
				finalStartups: JSON.parse(await AsyncStorage.getItem(this.props.componentId))
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
				{!this.state.finalStartups ? <LoadingCircle/> : this.state.finalStartups.map((startup, index) => {
					if(startup.hidden == false){
						return(
							<View key={index} style={styles.listCardOuterWrapper}>
								<DynamicButton style={styles.listCardWrapper} onPress={() => {changeScreen(startup, "Startups")}}>
									<View style={styles.listCardInnerWrapper}>
										{(startup.logo).slice(-3) === "svg" ? <ImageSvg style={styles.listCardImage} source={{ uri: startup.logo }}/> : <Image style={[styles.listCardImage, {resizeMode: 'cover'}]} source={{ uri: startup.logo }}/>}
										<Text style={[styles.listCardText, styles.stakeholdersCardText]}>{startup.name}</Text>
									</View>
								</DynamicButton>
							</View>
						);
					}
				})}
			</ScrollView>
		);
	}
}