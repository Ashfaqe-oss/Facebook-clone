// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyDkFNAZk19GaIQBNnIKXnW75LApHl3NwmE',
	authDomain: 'facebook-clone-3380b.firebaseapp.com',
	databaseURL: 'https://facebook-clone-3380b.firebaseio.com',
	projectId: 'facebook-clone-3380b',
	storageBucket: 'facebook-clone-3380b.appspot.com',
	messagingSenderId: '644591332549',
	appId: '1:644591332549:web:622a7a0dd5b0102b5994ac',
	measurementId: 'G-0EYB1B649Y'
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
//const provider = new firebase.auth.GoogleAuthProvider();
//const provider = new firebase.auth.FacebookAuthProvider();
var provider = new firebase.auth.FacebookAuthProvider();

export { auth, provider, storage };
export default db;
