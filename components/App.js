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
import { getSheetUrl } from './trampolin_data';
import { addIconTopBar, handleButtonPress } from './customFunctions';
import { styles } from './styles';

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
				elevation: 0,
				noBorder: true,
        title: {
          component: {
            name: 'CustomTopBarTitle',
            alignment: 'center',
            passProps: {
                title: 'Trampolin'
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
				//console.log(result, "result");
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

  render() {
    return (
      <ScrollView>
        <Image style={{resizeMode: 'contain', height: 50, width: Dimensions.get("window").width}} source={require('./img/Banner2-2.jpg')}/>

				{!this.state.news ? <View style={styles.inner}><LoadingCircle/></View> : this.state.news.map((news, index) => {
      	  if(moment().isBetween(moment(news.show_from, "YYYY-MM-DD"), moment(news.show_to, "YYYY-MM-DD"), null, []) || news.show_to == ''){
      	    return(
  	  	      <View key={index} style={styles.cardWrapper}>
      	        <Image style={{ height: 200, width: '100%', resizeMode: 'cover', alignSelf: 'center', borderRadius: 12}} source={{ uri: news.picture }}/>
      	        <View style={styles.cardTextWrapper}>
      	          <Text style={[styles.cardTitle, {fontFamily: 'Akrobat-Bold'}]}>{news.title}</Text>
									<HTML html={news.description} baseFontStyle={{color: 'black', fontSize: 16, fontFamily: 'Akrobat-SemiBold'}} imagesMaxWidth={Dimensions.get('window').width} />
      	        </View>
								{news.show_buttons ? 
									<View style={{flex: 1, alignItems: 'center', marginTop: 25}}>

										<TouchableOpacity onPress={() => this.changeScreen("Startups")}>
											<Image style={{width: 300, height: 85, resizeMode: 'contain'}} source={require("./img/startups_glow.png")}/>
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