import {Product} from '../../domain/models/Product';
import {Dispatch} from 'redux';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart =
  (product: Product, quantity: number) => (dispatch: Dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {product, quantity},
    });
  };

export const removeFromCart = (productId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productId,
  });
};

export const increaseQuantity = (productId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: INCREASE_QUANTITY,
    payload: productId,
  });
};

export const decreaseQuantity = (productId: string) => (dispatch: Dispatch) => {
  dispatch({
    type: DECREASE_QUANTITY,
    payload: productId,
  });
};

export const clearCart = () => (dispatch: Dispatch) => {
  dispatch({type: CLEAR_CART});
};
