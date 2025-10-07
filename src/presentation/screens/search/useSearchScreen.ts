import {useState, useEffect, useMemo} from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/reducers';
import {Product} from '../../../domain/models/Product';
import {
  debounce,
  getQuantityInCart,
  getTotalCartItems,
  filterByName,
} from '../../../service/utils';
import {searchStarships} from '../../../service/api/starwarsApi';
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
} from '../../../redux/actions/cartActions';
import {MAX_QUANTITY_PER_ITEM} from '../../../redux/reducers/cartReducer';

export const useSearchScreen = () => {
  const dispatch = useDispatch<any>();
  const cart = useSelector((state: RootState) => state.cartState);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (text: string) => {
        const keyword = text.trim();
        if (keyword === '') {
          setFiltered([]);
          setLoading(false);
          return;
        }

        setLoading(true);
        try {
          const results = await searchStarships(keyword);
          const filteredResults = filterByName(results, keyword);
          setFiltered(filteredResults);
        } catch (error) {
          console.error('Search error:', error);
          Alert.alert('Error', 'Failed to search starships. Please try again.');
        } finally {
          setLoading(false);
        }
      }, 500),
    [],
  );

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
    }
    debouncedSearch(query);
  }, [query, debouncedSearch]);

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

  const getProductQuantity = (productId: string) => {
    return getQuantityInCart(cart, productId);
  };

  const totalCartItems = getTotalCartItems(cart);

  return {
    query,
    setQuery,
    filtered,
    loading,
    totalCartItems,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    getProductQuantity,
  };
};
