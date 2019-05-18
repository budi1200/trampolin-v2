import React, { Component } from 'react';
import { TouchableNativeFeedback, View, Text , Platform, TouchableHighlight} from 'react-native';
import { Navigation } from 'react-native-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import { configSch } from './no_use/scheduleConfig';

class DrawerButton extends Component{

	// Handles Drawer button click, accepts screen name
	handleClick = (screen) => {
			
		// Prevents crash if clicking on already selected screen
		if(screen != this.props.currentScreen){
			if(screen == "Schedule"){
				Navigation.setDefaultOptions({
					bottomTabs: {
						titleDisplayMode: 'alwaysShow',
					},
					bottomTab: {
						//selectedIconColor: 'rgb(236, 57, 139)',
						//selectedTextColor: 'rgb(236, 57, 139)'
						selectedIconColor: 'rgb(137, 119, 236)',
						selectedTextColor: 'rgb(137, 119, 236)',
					}
				});
				
				Navigation.setRoot(configSch);

			}else{

			// Changes screen
			Navigation.setStackRoot('MainStack', {
				component: {
					id: this.props.screen,
					name: this.props.screen,
				}
			});

		}
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
		if(this.props.special){
			return(
				<TouchableOpacity onPress={() => this.handleClick(this.props.screen)}>
					<Image style={{width: 300, height: 85, resizeMode: 'cover'}} source={require("./img/schedule.png")}/>
				</TouchableOpacity>
			);
		}else if(Platform.OS == "android"){
			return(
				<TouchableNativeFeedback onPress={() => {this.handleClick(this.props.screen)}}>
					<View style={[styles.buttonContainer, this.props.active ? styles.active : null]}>
						{this.props.icon == "home-outline" || this.props.icon == "lightbulb-on-outline" || this.props.icon == "checkbox-marked-outline" ? <MaterialCommunityIcons style={styles.buttonIcon} name={this.props.icon} size={24} color={this.props.active ? 'black' : '#5f6368'}/> : <MaterialIcons style={styles.buttonIcon} name={this.props.icon} size={24} color={this.props.active ? 'black' : '#5f6368'}/>}
						<Text style={[styles.buttonText, {color: this.props.active ? 'black' : '#474747'}]}>{this.props.text}</Text>
					</View>
				</TouchableNativeFeedback>
			);
			}
			else{
				return(
					<TouchableHighlight underlayColor={'rgba(52,73,85,0.1)'} onPress={() => {this.handleClick(this.props.screen)}}>
						<View style={[styles.buttonContainer, this.props.active ? styles.active : null]}>
							{this.props.icon == "home-outline" || this.props.icon == "lightbulb-on-outline" || this.props.icon == "checkbox-marked-outline" ? <MaterialCommunityIcons style={styles.buttonIcon} name={this.props.icon} size={24} color={this.props.active ? 'black' : '#5f6368'}/> : <MaterialIcons style={styles.buttonIcon} name={this.props.icon} size={24} color={this.props.active ? 'black' : '#5f6368'}/>}
							<Text style={[styles.buttonText, {color: this.props.active ? 'black' : '#474747'}]}>{this.props.text}</Text>
						</View>
					</TouchableHighlight>
				)
			}
	}
}

export default DrawerButton;