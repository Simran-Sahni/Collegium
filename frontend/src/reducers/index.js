import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import groups from './groups'

export const reducers = combineReducers({ auth, groups, posts });
