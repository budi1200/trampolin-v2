import React, { Component } from 'react';
import { View, Text } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

export default class NetworkInfo extends Component{

  constructor(props){
    super(props);

    this.state = {
      isConnected: true
    }
  }

  handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected });
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);

    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({
        isConnected: isConnected
      })
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  render() {
      return(
        <View>
          { !this.state.isConnected ? <View style={{ padding: 6 }}><Text style={{textAlign: 'center', color: 'red', fontWeight: 'bold'}}>No internet Connection!</Text><Text style={{textAlign: 'center', color: 'red', fontWeight: 'bold'}}>Using only cached data</Text></View> : null }
        </View>
      );
    }
}