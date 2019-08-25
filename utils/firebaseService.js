import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

if (!firebase.apps.length) {
	const firebaseConfig = {
		apiKey: 'AIzaSyAG8oczsvq1eb-s1jcoPkzLVnlqRYH5V6c',
		authDomain: 'test-98b6d.firebaseapp.com',
		databaseURL: 'https://test-98b6d.firebaseio.com',
		projectId: 'test-98b6d',
		storageBucket: 'test-98b6d.appspot.com',
		messagingSenderId: '235497381978',
		appId: '1:235497381978:web:5980e6f8745a427c'
	};

	firebase.initializeApp(config);
	// firebase.firestore().settings({ timestampsInSnapshots: true });
}

const fireDb = firebase.firestore();
const fireAuth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const FBProvider = new firebase.auth.FacebookAuthProvider();

export { fireDb, fireAuth, googleProvider, FBProvider };
