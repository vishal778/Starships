import {Product} from '../domain/models/Product';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  ProductDetails: {product: Product};
  CartReview: undefined;
  Confirmation: undefined;
};
