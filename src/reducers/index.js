import {combineReducers} from 'redux';
import noteReducers from './noteReducers';
import userReducers from './userReducers';
import loadingReducers from './loadingReducers';

const rootReducer = combineReducers({
    notes:noteReducers,
    users:userReducers,
    loading:loadingReducers
})

export default rootReducer;