import React, { Component } from 'react';
import { View, Image, StyleSheet, Dimensions, Platform } from 'react-native';

import DrawerButton from './DrawerButton';
import NetworkInfo from './NetworkInfo';
export default class SideDrawer extends Component {

	constructor(props){
		super(props)

		this.state = {
			currentScreen: this.props.def
		}
	}

	// Accepts Screen Name, Updates currentScreen State
	updateCurrentScreen = (screenName) => {
		this.setState({
			currentScreen: screenName
		})
	}
	
	render() {
    return (
      <View style={ styles.container }>
				<View>
        	<Image style={styles.sidebarLogo} source={require('./img/logo_black.png')}/>
				</View>

				<DrawerButton text="Home" icon="home-outline" screen="HomeScreen" active={this.state.currentScreen == "HomeScreen" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<DrawerButton text="Schedule" icon="schedule" screen="Schedule" active={this.state.currentScreen == "Schedule" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<DrawerButton text="Corporations" icon="business" screen="Corporations" active={this.state.currentScreen == "Corporations" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<DrawerButton text="Startups" icon="lightbulb-on-outline" screen="Startups" active={this.state.currentScreen == "Startups" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<DrawerButton text="About Saša" icon="info-outline" screen="AboutSasa" active={this.state.currentScreen == "AboutSasa" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<DrawerButton text="About Future" icon="perm-identity" screen="AboutFuture" active={this.state.currentScreen == "AboutFuture" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<DrawerButton text="Stakeholders" icon="people-outline" screen="Stakeholders" active={this.state.currentScreen == "Stakeholders" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<DrawerButton text="Interact" icon="checkbox-marked-outline" screen="Interact" active={this.state.currentScreen == "Interact" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<NetworkInfo/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
		width: Dimensions.get("window").width * 0.77,
		height: '100%'
	},
	sidebarLogo: {
		resizeMode: 'contain', 
		height: 89, 
		...Platform.select({
			ios: {
				width: Dimensions.get("window").width * 0.60,
				marginTop: 30, 
				marginLeft: 10
			},
			android: {
				width: Dimensions.get("window").width * 0.73,
				marginTop: 4, 
				marginLeft: 10
			},
		}),
	}
});