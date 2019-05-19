import { StyleSheet, Dimensions, Platform } from 'react-native';

export const primaryColor = 'rgb(0, 134, 200)';
export const touchBackground = 'rgba(0, 134, 200, 0.24)';

export const styles = StyleSheet.create({
  inner: {
    flex: 1,
    alignSelf: 'stretch',
    alignContent: 'center',
    justifyContent: 'center',
    height: Math.floor(Dimensions.get('window').height) - 179
  },

  cardWrapper: {
    flex: 1,
    borderWidth: 0,
    borderColor: '#dadce0',
    margin: 8
  },
  cardTextWrapper: {
    padding: 12
  },
  cardTitle: {
    color: "black",
    fontSize: 20,
		paddingBottom: 5
  },
  cardDesc: {
    fontSize: 16,
		//color: '#818181',
		color: "black",
    paddingLeft: 4
  },

  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    marginRight: 8,
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },
  buttonIcon: {
    paddingLeft: 16,
    paddingRight: 32
  },
  buttonText: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 18,
    color: '#474747',
    fontFamily: 'Akrobat-SemiBold'
  },
  active: {
    //backgroundColor: 'rgba(236, 57, 139, 0.24)',
    //backgroundColor: 'rgba(137, 119, 236, 0.24)',
    //backgroundColor: 'rgba(85, 75, 185, 0.24)',
    backgroundColor: 'rgba(0, 134, 200, 0.6)'
  },

  scheduleWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#dadce0',
    borderBottomWidth: 1,
    marginLeft: 8,
    marginRight: 8
  },
  scheduleBigTimeWrapper: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
    justifyContent: 'center'
  },
  scheduleBigTimeText: {
    fontSize: 24,
    //color: '#ff72bb',
    color: '#554bb9',
    fontFamily: 'Akrobat-Bold'
  },
  scheduleInfoWrapper: {
    paddingLeft: 6,
    paddingTop: 13,
    paddingBottom: 13
  },
  scheduleInfoText: {
    color: '#606060',
    fontSize: 18,
    fontFamily: 'Akrobat-Bold',
    marginRight: 100
  },
  scheduleInfoDesc: {
    fontSize: 15,
    paddingTop: 2,
		color: '#979797',
		fontFamily: 'Akrobat-SemiBold'
  },
  scheduleInfoRoom: {
		color: '#6dcac1',
		fontFamily: 'Akrobat-SemiBold'
  },

  listCardWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 3,
    marginBottom: 3,
    borderColor: '#dadce0',
    borderWidth: 1,
    borderRadius: 8
  },
  listCardImage: {
    height: 96,
    width: 96,
    marginRight: 16,
    ...Platform.select({
			ios: {
        borderRadius: 50
			},
			android: {
        borderRadius: 200
			},
		}),
  },
  listCardText: {
    fontSize: 16,
    fontWeight: '400',
		color: 'black',
		fontFamily: 'Akrobat-SemiBold'
  },

  aboutWrapper: {
    margin: 4,
    padding: 12
  },
  aboutTitle: {
    color: primaryColor,
    fontSize: 24,
    fontFamily: 'Akrobat-Bold',
    marginBottom: 4,
  },
  aboutDesc: {
		paddingLeft: 4,
		fontFamily: 'Akrobat-SemiBold'
  },

  stakeholdersCardWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    marginLeft: 6,
    marginRight: 6,
    marginTop: 3,
    marginBottom: 3,
    borderColor: '#dadce0',
    borderWidth: 1,
    borderRadius: 8
  },
  stakeholdersTypeText: {
    fontSize: 22,
    fontFamily: 'Akrobat-Bold',
    color: '#554bb9',
    paddingTop: 8,
    padding: 6,
    marginLeft: 8
  },
  stakeholdersCardImage: {
    height: 106,
    width: 106,
    marginRight: 16,
    resizeMode: 'contain',
    ...Platform.select({
			ios: {
        borderRadius: 60
			},
			android: {
        borderRadius: 150,
			},
		}),
  },
  stakeholdersCardText: {
    margin: 4,
    padding: 12,
    marginRight: 100
  },

  detailsWrapper: {
    paddingLeft: 14,
    paddingRight: 14
  },
  detailsTitle: {
    fontSize: 28,
    color: primaryColor,
		marginBottom: 6,
		fontFamily: 'Akrobat-Bold'
  },
  detailsDesc: {
    paddingLeft: 4,
    paddingRight: 24,
    paddingBottom: 12,
    fontSize: 14,
    color: '#818181',
  },
  detailsMembersTitle: {
    fontFamily: 'Akrobat-Bold',
    fontSize: 24,
    marginLeft: -2,
    marginBottom: 4,
    color: 'black'
  },
  detailsWebsiteWrapper: {
    padding: 8,
    borderRadius: 6
  },
  detailsWebsiteText: {
    color: primaryColor,
    fontSize: 16,
		fontWeight: 'bold',
		fontFamily: 'Akrobat-Bold'
  },

  scheduleDetailsWrapper:{
    paddingLeft: 16,
  },
  scheduleDetailsTopWrapper: {
    borderBottomColor: '#dadce0',
    borderBottomWidth: 1,
    marginRight: 16
  },
  scheduleDetailsTitle: {
    color: '#554bb9',
    fontSize: 28,
    fontFamily: 'Akrobat-Bold',
    paddingBottom: 8,
  },
  scheduleDetailsTime: {
    color: '#606060',
    fontSize: 16,
		paddingBottom: 8,
		fontFamily: 'Akrobat-SemiBold'
  },
  scheduleDetailsTime2: {
    //color: '#ff72bb',
    color: '#8977ec',
		fontSize: 19,
		fontFamily: 'Akrobat-SemiBold'
  },
  scheduleDetailsLocation: {
    color: 'black',
    fontSize: 28,
    paddingBottom: 6,
		marginTop: 8,
		fontFamily: 'Akrobat-SemiBold'
  },
  scheduleDetailsDetails: {
    paddingLeft: 2,
    paddingTop: 6,
    fontSize: 18,
		color: 'black',
		fontFamily: 'Akrobat-Bold'
  },
  scheduleDetailsDesc: {
    fontSize: 16,
    color: '#818181',
    padding: 6,
		marginRight: 16,
		fontFamily: 'Akrobat-SemiBold'
  },
  personDetailsPicture: {
    width: 230, 
    height: 230, 
    resizeMode: 'cover', 
    borderRadius: 230/2
  },
  personDetailsName: {
    fontFamily: 'Akrobat-SemiBold',
    marginTop: 20,
    fontSize: 26,
    color: primaryColor
  },
  personDetailsPosition: {
    fontFamily: 'Akrobat-Regular',
    marginTop: 2,
    fontSize: 16,
    color: '#020202',
    fontWeight: '400'
  },
  personDetailsDescription: {
    marginLeft: 30,
    marginRight: 30,
  },
  personDetailsContact: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  personDetailsContactIcon: {
    paddingLeft: 14,
    ...Platform.select({
			ios: {
        paddingTop: 13,
        paddingRight: 13,
        paddingBottom: 12,
			},
			android: {
        paddingTop: 13,
        paddingRight: 14,
        paddingBottom: 13,
			},
		}),
    backgroundColor: primaryColor,
    borderRadius: 48
  },
  memberEntryWrapper:{
    padding: 6,
    borderRadius: 6,
    marginBottom: 2
  },
  memberEntryInnerWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberEntryThumbnail: {
    width: 64,
    height: 64,
    resizeMode: 'cover',
    borderRadius: 64/2
  },
  memberEntryDetails: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 14
  },
  memberEntryName: {
    fontFamily: 'Akrobat-SemiBold',
    fontSize: 18,
    color: 'black'
  },
  memberEntryPosition: {
    marginTop: 3,
    marginLeft: 1,
    fontSize: 12,
    color: 'grey'
  }
})