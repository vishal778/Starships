import React, {useEffect, useRef} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {Product} from '../../../domain/models/Product';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../../navigators/types';
import colors from '../../../dls/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSearchScreen} from './useSearchScreen';

type NavProp = BottomTabNavigationProp<RootTabParamList, 'Search'>;

const SearchScreen = () => {
  const navigation = useNavigation<NavProp>();
  const textInputRef = useRef<TextInput>(null);
  const {top} = useSafeAreaInsets();
  const {
    query,
    setQuery,
    filtered,
    loading,
    totalCartItems,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    getProductQuantity,
  } = useSearchScreen();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setTimeout(() => {
        textInputRef.current?.focus();
      }, 100);
    });

    return unsubscribe;
  }, [navigation]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <Text>{text}</Text>;
    }

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={styles.highlightedText}>
              {part}
            </Text>
          ) : (
            <Text key={index}>{part}</Text>
          ),
        )}
      </Text>
    );
  };

  const renderItem = ({item}: {item: Product}) => {
    const cartQty = getProductQuantity(item.id);

    return (
      <View style={styles.item}>
        <View style={styles.imageWrapper}>
          <Image source={item.images?.[0]} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={2}>
            {highlightText(item.name, query)}
          </Text>
          <View style={styles.priceButtonRow}>
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

  const renderEmpty = () => {
    if (loading) return null;

    if (query.trim() === '') {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={64} color={colors.greycc} />
          <Text style={styles.emptyText}>Search for starships</Text>
          <Text style={styles.emptySubtext}>Type a name to find starships</Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="sad-outline" size={64} color={colors.greycc} />
        <Text style={styles.emptyText}>No starships found</Text>
        <Text style={styles.emptySubtext}>Try a different search term</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, {paddingTop: top}]} edges={[]}>
      <Header title="Search Starships" />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="search"
            size={20}
            color={colors.grey66}
            style={styles.searchIcon}
          />
          <TextInput
            ref={textInputRef}
            placeholder="Type to search starships..."
            value={query}
            onChangeText={setQuery}
            style={styles.input}
            autoFocus
            placeholderTextColor={colors.grey66}
          />
          {query.length > 0 && !loading && (
            <TouchableOpacity
              onPress={() => setQuery('')}
              style={styles.clearIcon}>
              <Ionicons name="close-circle" size={20} color={colors.grey66} />
            </TouchableOpacity>
          )}
          {loading && (
            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={styles.loader}
            />
          )}
        </View>

        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.listContainer,
            totalCartItems > 0 && styles.listContainerWithButton,
          ]}
          ListEmptyComponent={renderEmpty}
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
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderColor: colors.greycc,
    borderWidth: 1,
    backgroundColor: colors.whitef5,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.grey333,
  },
  clearIcon: {
    marginLeft: 8,
    padding: 2,
  },
  loader: {
    marginLeft: 8,
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  item: {
    backgroundColor: colors.white,
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.greyeee,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    backgroundColor: colors.whitef9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.greyeee,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.grey333,
    lineHeight: 18,
    marginBottom: 6,
  },
  highlightedText: {
    fontWeight: 'bold',
    color: colors.warning,
  },
  priceButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    color: colors.grey333,
    fontWeight: '700',
    fontSize: 15,
    flex: 1,
  },
  addButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 16,
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
    paddingHorizontal: 4,
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
    marginHorizontal: 10,
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    minWidth: 12,
    textAlign: 'center',
  },
  listContainerWithButton: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.grey333,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.grey66,
    marginTop: 8,
  },
});

export default SearchScreen;
