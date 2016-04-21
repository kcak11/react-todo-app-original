import firebaseRef, {getUserRef} from 'firebaseRef';
import moment from 'moment';

var todo = {
  text: 'Something to do',
  completed: false,
  createdAt: moment().unix(),
  completedAt: null
};

export const email = 'test@example.com';
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
  return firebaseRef.createUser({email, password});
};

export var reset = (done) => {
  return firebaseRef.removeUser({email, password}).then(() => {
    return firebaseRef.unauth();
  });
};
