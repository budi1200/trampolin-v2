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
				<DrawerButton text="Startups" icon="lightbulb-on-outline" screen="Startups" active={this.state.currentScreen == "Startups" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<DrawerButton text="About Saša" icon="info-outline" screen="AboutSasa" active={this.state.currentScreen == "AboutSasa" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<DrawerButton text="About Trampolin" icon="trending-up" screen="AboutTrampolin" active={this.state.currentScreen == "AboutTrampolin" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				<DrawerButton text="Interact" icon="checkbox-marked-outline" screen="Interact" active={this.state.currentScreen == "Interact" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/>
				{Platform.OS != "android" ? <DrawerButton text="Find us" icon="checkbox-marked-outline" screen="Location" active={this.state.currentScreen == "Location" ? true : false} currentScreen={this.state.currentScreen} updateCurrentScreen={this.updateCurrentScreen}/> : null }
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
		height: 74, 
		...Platform.select({
			ios: {
				width: Dimensions.get("window").width * 0.60,
				marginTop: 50, 
				marginLeft: 2,
				marginBottom: 14,
			},
			android: {
				width: Dimensions.get("window").width * 0.73,
				marginTop: 14,
				marginLeft: 0,
				marginBottom: 14
			},
		}),
	}
});