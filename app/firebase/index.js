import firebase from 'firebase';

try {
  var config = {
    apiKey: "AIzaSyD_9fsTH8TiSdhYGD_4mzGbzwDxA7vW5w0",
    authDomain: "mead-todo-app-23821.firebaseapp.com",
    databaseURL: "https://mead-todo-app-23821.firebaseio.com",
    storageBucket: "mead-todo-app-23821.appspot.com",
  };

  firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref();
export default firebase;
