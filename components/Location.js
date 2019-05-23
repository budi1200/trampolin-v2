import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import MapView, { Marker } from 'react-native-maps';
import { addIconTopBar, handleButtonPress } from './customFunctions';

export default class LoadingCircle extends Component{

  constructor(props){
    super(props);

		Navigation.events().bindComponent(this);
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
              title: 'Find us'
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

  componentDidMount(){
    // Adds icon in the top bar
		addIconTopBar("Location");
  }

  render(){
    return(
      <MapView style={{flex: 1}} region={{ latitude: 46.3577226, longitude: 15.112967, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }} showsUserLocation={true}>
        <Marker
          coordinate={{ latitude: 46.3577226, longitude: 15.112967 }}
          title='Saša Inkubator'
          description=''
        />
      </MapView>
    );
  }
}