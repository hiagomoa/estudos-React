import {createStore} from 'redux'
import auth from './modules/auth/reducer';
import { Data } from './modules/auth/types';
import rootReducer from './modules/rootReducer';

export interface IState{
    auth: Data
}

const store = createStore(rootReducer);

export default store;