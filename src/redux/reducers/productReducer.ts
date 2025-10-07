import {Product} from '../../domain/models/Product';
import {
  ProductActionTypes,
  LOAD_PRODUCTS,
  APPEND_PRODUCTS,
  SET_LOADING,
  SET_HAS_MORE,
  SET_CURRENT_PAGE,
} from '../actions/productActions';

interface ProductState {
  products: Product[];
  loading: boolean;
  hasMore: boolean;
  currentPage: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  hasMore: true,
  currentPage: 0,
};

const productReducer = (
  state = initialState,
  action: ProductActionTypes,
): ProductState => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {...state, products: action.payload};
    case APPEND_PRODUCTS:
      return {...state, products: [...state.products, ...action.payload]};
    case SET_LOADING:
      return {...state, loading: action.payload};
    case SET_HAS_MORE:
      return {...state, hasMore: action.payload};
    case SET_CURRENT_PAGE:
      return {...state, currentPage: action.payload};
    default:
      return state;
  }
};

export default productReducer;
