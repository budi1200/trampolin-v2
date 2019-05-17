/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, ScrollView, Image, AsyncStorage, Dimensions, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';
import axios from 'react-native-axios';
import moment from 'moment';
import HTML from 'react-native-render-html';

import firebase from 'firebase';
import { config } from '../fireConn';

import LoadingCircle from './LoadingCircle';
import { getSheetUrl } from './future40_data';
import { addIconTopBar, handleButtonPress } from './customFunctions';
import { styles } from './styles';
import { configSch } from './scheduleConfig';

firebase.initializeApp(config);

export default class App extends Component {

	constructor(props){
		super(props);

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
                title: 'Future 4.0'
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
    addIconTopBar("HomeScreen");

    if((await AsyncStorage.getItem(this.props.componentId)) != null){
	  	this.setState({
	  		news: JSON.parse(await AsyncStorage.getItem(this.props.componentId))
	  	})
	  }
    // Loads sheet
    this.handleSheet("news");
	}

  componentWillUnmount(){
		this.setState({
			mounted: false
		})
	}

	changeScreen = (screen) => {
		if(screen == "Schedule"){
			Navigation.setDefaultOptions({
				bottomTabs: {
					titleDisplayMode: 'alwaysShow',
				},
				bottomTab: {
					//selectedIconColor: 'rgb(236, 57, 139)',
					//selectedTextColor: 'rgb(236, 57, 139)'
					selectedIconColor: 'rgb(137, 119, 236)',
					selectedTextColor: 'rgb(137, 119, 236)'
				}
			});

			Navigation.setRoot(configSch);
		}
		else{
			Navigation.setRoot({
				root: {
					sideMenu: {
						id: 'SideMenu',
						left: {
							component: {
								id: 'SideDrawer',
								name: 'SideDrawer',
								passProps: {
									def: screen
								}
							}
						},
						center: {
							id: 'ChildTest',
							stack: {
								id: 'MainStack',
								children: [{
									component: {
										id: screen,
										name: screen
									},
								}]
							}
						}
					}
				}
			});
		}
	}

  render() {
    return (
      <ScrollView>
        <Image style={{resizeMode: 'cover', height: 60, width: Dimensions.get("window").width}} source={require('./img/Banner2-2.png')}/>

	  		{/*<View style={styles.cardWrapper}>
          <Image style={{ height: 200, width: '100%', resizeMode: 'cover', alignSelf: 'center', borderRadius: 10 }} source={require('./img/welcome.png')}/>
          <View style={styles.cardTextWrapper}>
          	<Text style={[styles.cardTitle, {fontWeight: 'bold'}]}>What is Future 4.0*</Text>
          	<Text style={styles.cardDesc}>SAŠA Incubator presents a new dimension of the event with 100% focus on the Industry 4.0 and cultarized matchmaking.</Text>
	  				<Text style={styles.cardDesc}>Our main goal is to directly connect Industrial Corporations and Startups from the Balkan region which are or could be related to the for Industry 4.0</Text>
          </View>*/}

				{!this.state.news ? <View style={styles.inner}><LoadingCircle/></View> : this.state.news.map((news, index) => {
      	  if(moment().isBetween(moment(news.show_from, "YYYY-MM-DD"), moment(news.show_to, "YYYY-MM-DD"), null, [])){
      	    return(
  	  	      <View key={index} style={styles.cardWrapper}>
      	        <Image style={{ height: 200, width: '100%', resizeMode: 'cover', alignSelf: 'center', borderRadius: 12}} source={{ uri: news.picture }}/>
      	        <View style={styles.cardTextWrapper}>
      	          <Text style={[styles.cardTitle, {fontFamily: 'Akrobat-Bold'}]}>{news.title}</Text>
									<HTML html={news.description} baseFontStyle={{color: 'black', fontSize: 16, fontFamily: 'Akrobat-SemiBold'}} imagesMaxWidth={Dimensions.get('window').width} />
      	        </View>
								{news.show_buttons ? 
									<View style={{flex: 1, alignItems: 'center', marginTop: 25}}>

										<TouchableOpacity onPress={() => this.changeScreen("Schedule")}>
	  									<Image style={{width: 300, height: 84, resizeMode: 'cover'}} source={require("./img/schedule.png")}/>
										</TouchableOpacity>

										<TouchableOpacity onPress={() => this.changeScreen("Corporations")}>
	  									<Image style={{width: 300, height: 85, resizeMode: 'cover'}} source={require("./img/corporations.png")}/>
										</TouchableOpacity>

										<TouchableOpacity onPress={() => this.changeScreen("Startups")}>
	  									<Image style={{width: 300, height: 85, resizeMode: 'cover'}} source={require("./img/startups.png")}/>
										</TouchableOpacity>
	  							</View> : null}
      	      </View>
  	  	    )
      	  }
      	})}
      </ScrollView>
    );
  }
}