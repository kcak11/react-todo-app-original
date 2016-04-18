// I want a logged in userref, with exisitng todos,
// Logged out user ref
import firebaseRef, {getUserRef} from 'firebaseRef';

export var ref = firebaseRef;

export var generateUser = (cb) => {
  var email = 'test@example.com';
  var password = 'password123!';
  var ref;

  return firebaseRef.createUser({
    email,
    password
  }).then(() => {
    return firebaseRef.authWithPassword({
      email,
      password
    });
  }).then((authData) => {
    ref = getUserRef(authData.uid);

    return {
      email,
      password,
      ref
    }
  })
};

export var reset = (cb) => {
  return firebaseRef.unauth();
};

// export var userOneEmail = 'text@example.com';
// export var userOnePassword = 'password123!';
// export var userOneRef;
// export var loggedInUserWithTodos = () => {
//
// }
