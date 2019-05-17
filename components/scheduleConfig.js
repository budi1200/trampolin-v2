import { Platform } from 'react-native';

export const configSch = {
	root: {
		sideMenu: {
			id: 'SideMenu',
			left: {
				component: {
					id: 'SideDrawer',
					name: 'SideDrawer',
					passProps: {
						def: 'Schedule'
					}
				}
			},
			center: {
				id: 'ChildTest',
				stack: {
					id: 'MainStack',
					children: [{
						bottomTabs: {
							options: {
								topBar: {
									visible: (Platform.OS == "ios" ? false : true)
								}
							},
							children: [
								{
									component: {
										id: 'Schedule',
										name: 'Schedule',
										passProps: {
											day: '2018-11-27',
											first: true
										},
										options: {
											bottomTab: {
												text: 'Day 1',
												fontFamily: 'Akrobat-SemiBold',
												icon: require('./img/calendar27.png')
											},
										}
									},
								},
								{
									component: {
										id: 'Schedule2',
										name: 'Schedule',
										passProps: {
											day: '2018-11-28'
										},
										options: {
											bottomTab: {
												text: 'Day 2',
												fontFamily: 'Akrobat-SemiBold',
												icon: require('./img/calendar28.png')
											}
										}
									},
								},
							]
						}
					}]
				}
			}
		}
	}
}