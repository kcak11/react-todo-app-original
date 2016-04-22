import firebaseRef, {getUserRef} from 'database/firebase';
import moment from 'moment';

var todo = {
  text: 'Something to do',
  completed: false,
  createdAt: moment().unix(),
  completedAt: null
};

export const email = 'test@example.com';
export const unusedEmail = 'test2@example.com';
export const password = 'password123!';
export const badPassword = 'password123@';

export var login = () => {
  return firebaseRef.createUser({email, password}).then(() => {
    return firebaseRef.authWithPassword({email, password});
  }).then(function (authData) {
    var todoRef = getUserRef(authData.uid).child('todos').push(todo);
    return todoRef.then(() => {
      return Promise.resolve({
        todoId: todoRef.key(),
        uid: authData.uid
      });
    });
  });
};

export var createUser = () => {
  return firebaseRef.createUser({email, password}).catch((e) => {});
};

export var wipeUser = () => {
  var authData = firebaseRef.getAuth();

  if (authData) {
    return getUserRef(authData.uid).remove();
  } else {
    return Promise.resolve();
  }
}

export var reset = () => {
  var authData = firebaseRef.getAuth();

  return wipeUser().then(() => {
    return firebaseRef.removeUser({email, password})
  }) .then(() => {
    return firebaseRef.unauth();
  })
  .catch((e) => {});
};
