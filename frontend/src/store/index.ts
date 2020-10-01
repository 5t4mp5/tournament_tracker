import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//reducers
import { userStore, User } from './user';
import { tournamentReducer, Tournament } from './tournament';

export interface State {
  user: User;
  tournament: Tournament;
}

const reducer = combineReducers({
  user: userStore,
  tournament: tournamentReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
