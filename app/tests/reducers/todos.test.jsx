import expect from 'expect';
import df from 'deep-freeze-strict';
import todos from 'reducers/todos'

describe('Todos Reducer', () => {

  it('should add new todo', () => {
    var action = {
      type: 'ADD_TODO',
      todo: {
        id: '123',
        text: 'Something',
        completed: true,
        createdAt: 123,
        completedAt: 125
      }
    };
    var res = todos(df([]), df(action));

    expect(res.length).toEqual(1);
    expect(res[0].text).toEqual(action.todo.text);
  });

  it('should toggle todo', () => {
    var currentState = [{
      id: '123',
      text: 'Something',
      completed: true,
      createdAt: 123,
      completedAt: 125
    }];
    var action = {
      type: 'UPDATE_TODO',
      id: '123',
      updates: {
        completed: false
      }
    };
    var res = todos(df(currentState), df(action));

    expect(res[0].completed).toEqual(false);
  });

  it('should add existing todos', () => {
    var action = {
      type: 'ADD_TODOS',
      todos: [{
        id: '111',
        text: 'anything',
        completed: false,
        completedAt: undefined,
        createdAt: 33000
      }]
    };
    var res = todos(df([]), df(action));

    expect(res.length).toEqual(1);
    expect(res[0]).toEqual(action.todos[0]);
  });

});
