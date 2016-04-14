var Firebase = require('firebase');
var firebaseRef = new Firebase('https://mead-firebase-exampl.firebaseio.com/');

export var getUserRef = (uid) => {
    return firebaseRef.child(`users/${uid}`);
}

export default firebaseRef;
