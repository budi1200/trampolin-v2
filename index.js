/** @format */
import React from 'react';
import { YellowBox, StyleSheet, Text, Platform } from 'react-native';
import {Navigation} from 'react-native-navigation';
import { registerScreens } from './components/screens';
YellowBox.ignoreWarnings(['Setting a timer']);

registerScreens();

console.log("index!!!!!!!!!!!!!!!!!!!!!!!!!");

const styles = StyleSheet.create({
  defaultFontFamily: {
    fontFamily: 'Roboto',
  }
});

if(Platform.OS == 'android'){
  const oldRender = Text.render;
  Text.render = function (...args) {
  const origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [styles.defaultFontFamily, origin.props.style],
  });
  };
}



Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: 'SideMenu',
        left: {
          component: {
            id: 'SideDrawer',
            name: 'SideDrawer',
            passProps: {
              def: 'HomeScreen'
            }
          }
        },
        center: {
          id: 'ChildTest',
          stack: {
            id: 'MainStack',
            children: [{
              component: {
                id: 'HomeScreen',
                name: 'HomeScreen'
              },
            }]
          }
        }
      }
    }
  });
});