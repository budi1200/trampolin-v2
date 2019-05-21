/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, WebView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import axios from 'react-native-axios';

import LoadingCircle from './LoadingCircle';
import { getSheetUrl } from './trampolin_data';
import { addIconTopBar, handleButtonPress } from './customFunctions';

export default class Interact extends Component {

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
				elevation: 0,
				noBorder: true,
        title: {
          component: {
            name: 'CustomTopBarTitle',
            alignment: 'center',
            passProps: {
              title: 'Interact'
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
						})
					}
	    	})
	  })
	}

	componentDidMount(){
		// Load sheet
		this.handleSheet("vote");
		// Adds icon in the top bar
		addIconTopBar("Interact");
	}

	componentWillUnmount(){
		this.setState({
			mounted: false
		})
	}

	render() {
		return(
			<View>
				<View style={{ height: '100%', width: '100%'}}>
					{!this.state.vote ? <LoadingCircle/> : this.state.vote.map((vote) => {
						return(<WebView key={vote.url} source={{uri: vote.url}} javaScriptEnabled={true} startInLoadingState={false}/>)
					})}
				</View>
			</View>
		)
	}
}
