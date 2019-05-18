import firebase from 'firebase';

// Accepts sheet name
// Returns google sheet link from firebase database
export function getSheetUrl(sheet, callback){
		firebase.database().ref('/').once('value', (data) => {
			return callback(data.val()[sheet])
	});
}
