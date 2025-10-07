import {combineReducers} from 'redux';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  productState: productReducer,
  cartState: cartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
