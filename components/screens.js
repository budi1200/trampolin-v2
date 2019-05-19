import { Navigation } from 'react-native-navigation';

import App from './App';

//import Schedule from './Schedule';
//import Corporations from './no_use/Corporations';
import Startups from './Startups';
import AboutSasa from './AboutSasa';
import AboutTrampolin from './AboutTrampolin';
//import Stakeholders from './Stakeholders';
import Interact from './Interact';
import SideDrawer from './SideDrawer';
import Details from './Details';
//import DetailsSchedule from './no_use/DetailsSchedule';
import CustomTopBarTitle from './CustomTopBarTitle';
import PersonDetails from './PersonDetails';

export function registerScreens(){
    Navigation.registerComponent('HomeScreen', () => App);
    //Navigation.registerComponent('Schedule', () => Schedule);
    //Navigation.registerComponent('Corporations', () => Corporations);
    Navigation.registerComponent('Startups', () => Startups);
    Navigation.registerComponent('AboutSasa', () => AboutSasa);
    Navigation.registerComponent('AboutTrampolin', () => AboutTrampolin);
    //Navigation.registerComponent('Stakeholders', () => Stakeholders);
    Navigation.registerComponent('Interact', () => Interact);
    Navigation.registerComponent('SideDrawer', () => SideDrawer);
    Navigation.registerComponent('Details', () => Details);
    //Navigation.registerComponent('DetailsSchedule', () => DetailsSchedule);
    Navigation.registerComponent('CustomTopBarTitle', () => CustomTopBarTitle);
    Navigation.registerComponent('PersonDetails', () => PersonDetails);
}