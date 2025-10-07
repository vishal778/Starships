import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../../../redux/actions/cartActions';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RootTabParamList} from '../../../navigators/types';
import Header from '../../components/Header';
import colors from '../../../dls/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MAX_QUANTITY_PER_ITEM} from '../../../redux/reducers/cartReducer';
import {useCartScreen} from './useCartScreen';

type NavigationProp = BottomTabNavigationProp<RootTabParamList, 'Cart'>;

const CartScreen = () => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<NavigationProp>();
  const {top} = useSafeAreaInsets();
  const {
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
  } = useCartScreen();

  const renderItem = ({item}: any) => (
    <View style={styles.item}>
      <View style={styles.imageContainer}>
        <Image source={item.product.images[0]} style={styles.image} />
      </View>
      <View style={styles.details}>
        <View style={styles.topSection}>
          <View style={styles.nameSection}>
            <Text style={styles.name} numberOfLines={2}>
              {item.product.name}
            </Text>
            <Text style={styles.price}>AED {item.product.price}</Text>
          </View>
          <TouchableOpacity
            onPress={() => dispatch(removeFromCart(item.product.id))}
            style={styles.removeBtn}>
            <Ionicons name="trash-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={() => handleDecreaseQuantity(item.product.id)}
              style={styles.qtyBtn}>
              <Ionicons name="remove" size={16} color={colors.primary} />
            </TouchableOpacity>

            <Text style={styles.qty}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={() =>
                handleIncreaseQuantity(item.product.id, item.quantity)
              }
              style={styles.qtyBtn}
              disabled={item.quantity >= MAX_QUANTITY_PER_ITEM}>
              <Ionicons
                name="add"
                size={16}
                color={
                  item.quantity >= MAX_QUANTITY_PER_ITEM
                    ? colors.greycc
                    : colors.primary
                }
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.itemTotal}>
            AED {(item.product.price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyBox}>
      <Ionicons name="cart-outline" size={80} color={colors.greycc} />
      <Text style={styles.emptyText}>Your cart is empty</Text>
      <Text style={styles.emptySubtext}>
        Add some starships to get started!
      </Text>
      <TouchableOpacity
        style={styles.goHomeBtn}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.goHomeText}>Browse Starships</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, {paddingTop: top}]} edges={[]}>
      <Header title="Your Cart" />
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={item => item.product.id}
        contentContainerStyle={[
          styles.listContent,
          cart.length > 0 && styles.listContentWithCart,
        ]}
        ListEmptyComponent={renderEmpty}
      />

      {cart.length > 0 && (
        <View style={styles.summary}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Ionicons
                name="receipt-outline"
                size={20}
                color={colors.grey333}
              />
              <Text style={styles.summaryHeaderText}>Order Summary</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>AED {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (10%)</Text>
              <Text style={styles.summaryValue}>AED {tax.toFixed(2)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>AED {total.toFixed(2)}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.paymentSelector}
            onPress={() => setShowPaymentModal(true)}>
            <View style={styles.paymentIconWrapper}>
              <Ionicons name="card-outline" size={22} color={colors.primary} />
            </View>
            <View style={styles.paymentTexts}>
              <Text style={styles.paymentLabel}>Payment Method</Text>
              <Text style={styles.paymentValue}>{paymentMethod}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.grey66} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handlePlaceOrder}
            style={styles.checkoutBtn}>
            <Text style={styles.checkoutText}>Place Order</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      )}

      {/* Payment Method Selection Modal */}
      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Payment</Text>
              <TouchableOpacity
                onPress={() => setShowPaymentModal(false)}
                style={styles.modalCloseIcon}>
                <Ionicons name="close" size={24} color={colors.grey333} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'Debit/Credit Card' &&
                  styles.paymentOptionSelected,
              ]}
              onPress={() => {
                setPaymentMethod('Debit/Credit Card');
                setShowPaymentModal(false);
              }}>
              <View style={styles.paymentOptionLeft}>
                <View
                  style={[
                    styles.paymentIconCircle,
                    paymentMethod === 'Debit/Credit Card' &&
                      styles.paymentIconCircleSelected,
                  ]}>
                  <Ionicons
                    name="card"
                    size={24}
                    color={
                      paymentMethod === 'Debit/Credit Card'
                        ? colors.white
                        : colors.primary
                    }
                  />
                </View>
                <View style={styles.paymentOptionText}>
                  <Text style={styles.paymentOptionTitle}>
                    Debit/Credit Card
                  </Text>
                  <Text style={styles.paymentOptionDesc}>
                    Visa, Mastercard, Amex
                  </Text>
                </View>
              </View>
              <Ionicons
                name={
                  paymentMethod === 'Debit/Credit Card'
                    ? 'checkmark-circle'
                    : 'ellipse-outline'
                }
                size={24}
                color={
                  paymentMethod === 'Debit/Credit Card'
                    ? colors.success
                    : colors.greycc
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.paymentOption,
                paymentMethod === 'Net Banking' && styles.paymentOptionSelected,
              ]}
              onPress={() => {
                setPaymentMethod('Net Banking');
                setShowPaymentModal(false);
              }}>
              <View style={styles.paymentOptionLeft}>
                <View
                  style={[
                    styles.paymentIconCircle,
                    paymentMethod === 'Net Banking' &&
                      styles.paymentIconCircleSelected,
                  ]}>
                  <Ionicons
                    name="business"
                    size={24}
                    color={
                      paymentMethod === 'Net Banking'
                        ? colors.white
                        : colors.primary
                    }
                  />
                </View>
                <View style={styles.paymentOptionText}>
                  <Text style={styles.paymentOptionTitle}>Net Banking</Text>
                  <Text style={styles.paymentOptionDesc}>
                    All major banks supported
                  </Text>
                </View>
              </View>
              <Ionicons
                name={
                  paymentMethod === 'Net Banking'
                    ? 'checkmark-circle'
                    : 'ellipse-outline'
                }
                size={24}
                color={
                  paymentMethod === 'Net Banking'
                    ? colors.success
                    : colors.greycc
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowSuccessModal(false);
          navigation.navigate('Home');
        }}>
        <View style={styles.modalOverlay}>
          <View style={styles.successModalContent}>
            <View style={styles.successIcon}>
              <Ionicons
                name="checkmark-circle"
                size={80}
                color={colors.success}
              />
            </View>
            <Text style={styles.successTitle}>Order Placed!</Text>
            <Text style={styles.successMessage}>
              Your order has been successfully placed.{'\n'}
              May the Force be with you!
            </Text>
            <TouchableOpacity
              style={styles.successBtn}
              onPress={() => {
                setShowSuccessModal(false);
                navigation.navigate('Home');
              }}>
              <Text style={styles.successBtnText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContent: {
    flexGrow: 1,
    paddingTop: 8,
  },
  listContentWithCart: {
    paddingBottom: 300,
  },
  item: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginBottom: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.greyeee,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: colors.whitef9,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nameSection: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.grey333,
    marginBottom: 4,
    lineHeight: 18,
  },
  price: {
    color: colors.grey555,
    fontWeight: '600',
    fontSize: 13,
  },
  removeBtn: {
    padding: 4,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  qtyBtn: {
    padding: 2,
  },
  qty: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grey333,
  },
  summary: {
    backgroundColor: colors.white,
    padding: 16,
    borderTopWidth: 1,
    borderColor: colors.greyeee,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    elevation: 8,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryCard: {
    backgroundColor: colors.whitef9,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.greyeee,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyeee,
  },
  summaryHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grey333,
    marginLeft: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.grey555,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.grey333,
  },
  divider: {
    height: 1,
    backgroundColor: colors.greycc,
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.grey111,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  paymentSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.greyeee,
    elevation: 1,
  },
  paymentIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentTexts: {
    flex: 1,
    marginLeft: 12,
  },
  paymentLabel: {
    fontSize: 12,
    color: colors.grey66,
    marginBottom: 2,
  },
  paymentValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.grey333,
  },
  checkoutBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  checkoutText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  emptyBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.grey333,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.grey66,
    marginTop: 8,
    marginBottom: 24,
  },
  goHomeBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    elevation: 2,
  },
  goHomeText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyeee,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.grey333,
  },
  modalCloseIcon: {
    padding: 4,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.whitef9,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.greyeee,
  },
  paymentOptionSelected: {
    borderColor: colors.success,
    backgroundColor: colors.white,
    elevation: 2,
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIconCircleSelected: {
    backgroundColor: colors.primary,
  },
  paymentOptionText: {
    marginLeft: 12,
    flex: 1,
  },
  paymentOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.grey333,
  },
  paymentOptionDesc: {
    fontSize: 13,
    color: colors.grey66,
    marginTop: 2,
  },
  successModalContent: {
    backgroundColor: colors.white,
    margin: 20,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.grey333,
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 15,
    color: colors.grey66,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  successBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
    elevation: 2,
  },
  successBtnText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CartScreen;
