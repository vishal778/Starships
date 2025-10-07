import {CartItem} from '../../domain/models/Cart';

export const calculateOrderSummary = (cart: CartItem[]) => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  return {subtotal, tax, total};
};

export const debounce = (func: Function, delay: number) => {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export * from './cartUtils';
export * from './textUtils';
