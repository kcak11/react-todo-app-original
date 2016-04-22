import Firebase from 'firebase'

if (!window.firebaseRef) {
  window.firebaseRef = new Firebase('https://mead-firebase-exampl.firebaseio.com/');
}

export var getUserRef = (uid) => {
    return window.firebaseRef.child(`users/${uid}`);
}

export default window.firebaseRef;
