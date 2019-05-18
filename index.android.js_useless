/** @format */

import {Navigation} from 'react-native-navigation';
import { registerScreens } from './components/screens';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);

console.log("android index !!!!!!!!!!!!!!!!!!!")
registerScreens();

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