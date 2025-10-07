import {CartItem} from '../../domain/models/Cart';

export const getQuantityInCart = (
  cart: CartItem[],
  productId: string
): number => {
  const cartItem = cart.find(item => item.product.id === productId);
  return cartItem ? cartItem.quantity : 0;
};

export const getTotalCartItems = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

