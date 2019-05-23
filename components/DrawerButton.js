import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Navigation } from 'react-native-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import DynamicButton from './DynamicButton';

class DrawerButton extends Component{

	// Handles Drawer button click, accepts screen name
	handleClick = (screen) => {
			
		// Prevents crash if clicking on already selected screen
		if(screen != this.props.currentScreen){
			// Changes screen
			Navigation.setStackRoot('MainStack', {
				component: {
					id: this.props.screen,
					name: this.props.screen,
				}
			});
			
			// Updates current screen name
			this.props.updateCurrentScreen(screen);

			// Closes the drawer
			Navigation.mergeOptions( 'SideMenu', {
				sideMenu: {
						left: {
								visible: false
						}
				}
			})
		}
	}

	render(){
		return(
			<DynamicButton onPress={() => {this.handleClick(this.props.screen)}}>
				<View style={[styles.buttonContainer, this.props.active ? styles.active : null]}>
					{this.props.icon == "home-outline" || this.props.icon == "lightbulb-on-outline" || this.props.icon == "checkbox-marked-outline" || this.props.icon == "map-marker" ? <MaterialCommunityIcons style={styles.buttonIcon} name={this.props.icon} size={24} color={this.props.active ? 'black' : '#5f6368'}/> : <MaterialIcons style={styles.buttonIcon} name={this.props.icon} size={24} color={this.props.active ? 'black' : '#5f6368'}/>}
					<Text style={[styles.buttonText, {color: this.props.active ? 'black' : '#474747'}]}>{this.props.text}</Text>
				</View>
			</DynamicButton>
		)
	}
}

export default DrawerButton;