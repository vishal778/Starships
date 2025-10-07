import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {loadProducts} from '../../../redux/actions/productActions';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from '../../../redux/actions/cartActions';
import {Product} from '../../../domain/models/Product';
import {MAX_QUANTITY_PER_ITEM} from '../../../redux/reducers/cartReducer';
import {getQuantityInCart, getTotalCartItems} from '../../../service/utils';

export const useHomeScreen = () => {
  const dispatch = useDispatch<any>();
  const {products, loading, hasMore, currentPage} = useSelector(
    (state: RootState) => state.productState,
  );
  const cart = useSelector((state: RootState) => state.cartState);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    dispatch(loadProducts(1));
  }, [dispatch]);

  const handleIncreaseQuantity = (product: Product) => {
    const currentCartQty = getQuantityInCart(cart, product.id);

    if (currentCartQty >= MAX_QUANTITY_PER_ITEM) {
      Alert.alert(
        'Cart Limit Reached',
        `Maximum ${MAX_QUANTITY_PER_ITEM} units allowed per item.`,
      );
      return;
    }

    if (currentCartQty === 0) {
      dispatch(addToCart(product, 1));
    } else {
      dispatch(increaseQuantity(product.id));
    }
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity(productId));
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !loading) {
      setLoadingMore(true);
      dispatch(loadProducts(currentPage + 1)).finally(() => {
        setLoadingMore(false);
      });
    }
  };

  const getProductQuantity = (productId: string) => {
    return getQuantityInCart(cart, productId);
  };

  const totalCartItems = getTotalCartItems(cart);

  return {
    products,
    loading,
    loadingMore,
    totalCartItems,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleLoadMore,
    getProductQuantity,
  };
};
