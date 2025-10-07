import {useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../../../redux/actions/cartActions';
import {calculateOrderSummary} from '../../../service/utils';
import {MAX_QUANTITY_PER_ITEM} from '../../../redux/reducers/cartReducer';

export type PaymentMethod = 'Debit/Credit Card' | 'Net Banking';

export const useCartScreen = () => {
  const dispatch = useDispatch<any>();
  const cart = useSelector((state: RootState) => state.cartState);
  const {subtotal, tax, total} = calculateOrderSummary(cart);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('Debit/Credit Card');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleIncreaseQuantity = (
    productId: string,
    currentQuantity: number,
  ) => {
    if (currentQuantity >= MAX_QUANTITY_PER_ITEM) {
      Alert.alert(
        'Cart Limit Reached',
        `Maximum ${MAX_QUANTITY_PER_ITEM} units allowed per item.`,
      );
      return;
    }
    dispatch(increaseQuantity(productId));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const handlePlaceOrder = () => {
    Alert.alert(
      'Confirm Order',
      `Place order for AED ${total.toFixed(2)} using ${paymentMethod}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: () => {
            dispatch(clearCart());
            setShowSuccessModal(true);
          },
        },
      ],
    );
  };

  return {
    cart,
    subtotal,
    tax,
    total,
    paymentMethod,
    setPaymentMethod,
    showPaymentModal,
    setShowPaymentModal,
    showSuccessModal,
    setShowSuccessModal,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handlePlaceOrder,
  };
};
