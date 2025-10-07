import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Product} from '../../../domain/models/Product';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../../navigators/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import colors from '../../../dls/colors';
import {useHomeScreen} from './useHomeScreen';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

type HomeNav = BottomTabNavigationProp<RootTabParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNav>();
  const {top} = useSafeAreaInsets();
  const {
    products,
    loading,
    loadingMore,
    totalCartItems,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleLoadMore,
    getProductQuantity,
  } = useHomeScreen();

  const renderProduct = ({item}: {item: Product}) => {
    const cartQty = getProductQuantity(item.id);

    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image source={item.images?.[0]} style={styles.image} />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>AED {item.price}</Text>
            {cartQty === 0 ? (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleIncreaseQuantity(item)}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => handleDecreaseQuantity(item.id)}>
                  <Ionicons name="remove" size={14} color={colors.primary} />
                </TouchableOpacity>

                <Text style={styles.qtyText}>{cartQty}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => handleIncreaseQuantity(item)}>
                  <Ionicons name="add" size={14} color={colors.primary} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!loadingMore) {
      return null;
    }
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  if (loading && products.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading Starships...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, {paddingTop: top}]} edges={[]}>
      <Header title="Starships Store" />
      <View style={styles.container}>
        <View style={styles.searchWrapper}>
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={18} color={colors.grey66} />
            <Text style={styles.searchPlaceholder}>Search starships...</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderProduct}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={[
            styles.scrollContainer,
            totalCartItems > 0 && styles.scrollContainerWithButton,
          ]}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />

        {totalCartItems > 0 && (
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() => navigation.navigate('Cart')}>
            <Ionicons name="cart" size={20} color={colors.white} />
            <Text style={styles.cartButtonText}>Cart ({totalCartItems})</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  container: {flex: 1, backgroundColor: '#ffffff'},
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.grey66,
  },
  scrollContainer: {paddingBottom: 20, paddingTop: 8},
  searchWrapper: {paddingHorizontal: 12, paddingVertical: 8},
  searchBar: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.greyeee,
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchPlaceholder: {
    marginLeft: 8,
    color: colors.grey66,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.white,
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.greyeee,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 12,
    marginBottom: 4,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: colors.whitef9,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.whitef5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 10,
  },
  name: {
    fontWeight: '600',
    fontSize: 13,
    color: colors.grey333,
    lineHeight: 16,
    marginBottom: 6,
    minHeight: 32,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
  },
  price: {
    color: colors.grey333,
    fontWeight: '700',
    fontSize: 14,
    flex: 1,
  },
  addButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 2,
    paddingVertical: 4,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  qtyBtn: {
    padding: 2,
  },
  qtyText: {
    marginHorizontal: 6,
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    minWidth: 12,
    textAlign: 'center',
  },
  scrollContainerWithButton: {
    paddingBottom: 80,
  },
  viewCartButton: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{translateX: -60}],
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 6,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cartButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default HomeScreen;
