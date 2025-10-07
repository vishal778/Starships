import {Dispatch} from 'redux';
import {Product} from '../../domain/models/Product';
import {fetchStarships} from '../../service/api/starwarsApi';

export const LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export const APPEND_PRODUCTS = 'APPEND_PRODUCTS';
export const SET_LOADING = 'SET_LOADING';
export const SET_HAS_MORE = 'SET_HAS_MORE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

interface LoadProductsAction {
  type: typeof LOAD_PRODUCTS;
  payload: Product[];
}

interface AppendProductsAction {
  type: typeof APPEND_PRODUCTS;
  payload: Product[];
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetHasMoreAction {
  type: typeof SET_HAS_MORE;
  payload: boolean;
}

interface SetCurrentPageAction {
  type: typeof SET_CURRENT_PAGE;
  payload: number;
}

export type ProductActionTypes =
  | LoadProductsAction
  | AppendProductsAction
  | SetLoadingAction
  | SetHasMoreAction
  | SetCurrentPageAction;

export const loadProducts = (page: number = 1) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({type: SET_LOADING, payload: true});
      const {products, hasMore} = await fetchStarships(page);

      if (page === 1) {
        dispatch({type: LOAD_PRODUCTS, payload: products});
      } else {
        dispatch({type: APPEND_PRODUCTS, payload: products});
      }

      dispatch({type: SET_HAS_MORE, payload: hasMore});
      dispatch({type: SET_CURRENT_PAGE, payload: page});
      dispatch({type: SET_LOADING, payload: false});
    } catch (error) {
      dispatch({type: SET_LOADING, payload: false});
      throw error;
    }
  };
};
