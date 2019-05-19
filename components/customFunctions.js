import { Navigation } from 'react-native-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Adds icon to top bar, accepts screen name (string)
export async function addIconTopBar(screen){
    Promise.all([
        MaterialIcons.getImageSource('menu', 20, 'black')
      ]).then((sources) => {
        Navigation.mergeOptions(screen, {
          topBar: {
            leftButtons: {
              id: 'DrawerButton',
              icon: sources[0],
            }
          }
        })
      });
}

// handles drawer opening
export function handleButtonPress(buttonID){
  if(buttonID === "DrawerButton"){
    Navigation.mergeOptions( 'SideMenu', {
      sideMenu: {
          left: {
              visible: true
          }
      }
    })
  }
}

// opens details screen, accepts details data (object) and current screen (string)
export function changeScreen(data, currentScreen){
  Navigation.push(currentScreen, {
    component: {
      name: 'Details',
      passProps: {
        data: data,
        screenSource: currentScreen
      },
      options: {
        topBar: {
          elevation: 0,
          noBorder: true,
          title: {
						text: data.name,
						fontFamily: 'Akrobat-Bold',
            alignment: 'center'
          }
        }
      }
    }
  });
}

export function openPersonDetails(data, currentScreen){
  Navigation.push(currentScreen, {
    component: {
      name: 'PersonDetails',
      passProps: {
        data: data,
        screenSource: currentScreen
      },
      options: {
        topBar: {
          elevation: 0,
          noBorder: true,
          title: {
						text: "Team member",
            fontFamily: 'Akrobat-Bold',
            alignment: 'center'
          }
        }
      }
    }
  });
}

// opens details screen at schedule screen, accepts data (object), and current screen (string, should be schedule)
export function detailsSchedule(data, screen){
  Navigation.push(screen, {
    component: {
      name: 'DetailsSchedule',
      passProps: {
        data: data
      },
      options: {
        topBar: {
          title: {
						text: 'Details',
						fontFamily: 'Akrobat-Bold',
          }
        }
      }
    }
  });
}