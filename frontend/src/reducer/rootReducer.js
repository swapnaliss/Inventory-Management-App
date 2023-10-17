import { combineReducers } from 'redux';
import inventoryReducer from './inventoryReducer';
import salesReducer from './salesReducer';

const rootReducer = combineReducers({
  inventory: inventoryReducer,
  sales: salesReducer,
});

export default rootReducer;
