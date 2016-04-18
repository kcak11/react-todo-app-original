import expect from 'expect';
import df from 'deep-freeze-strict';
import searchText from 'reducers/search-text';

describe('Search Text Reducer', () => {

  it('should set search text', () => {
    var action = {
      type: 'SET_SEARCH_TEXT',
      searchText: 'Search text here'
    };
    var currentState = 'Current search text';
    var res = searchText(currentState, df(action));

    expect(res).toEqual(action.searchText);
  });

  it('should clear search text', () => {
    var action = {
      type: 'CLEAR_SEARCH_TEXT'
    };
    var currentState = 'Current search text';
    var res = searchText(currentState, df(action));

    expect(res).toEqual('');
  });

});
