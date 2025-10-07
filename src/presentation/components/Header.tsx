import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../dls/colors';

interface HeaderProps {
  title: string;
  showBack?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, showBack = false}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header]}>
      {showBack ? (
        <TouchableOpacity
          style={styles.side}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
      ) : (
        <View style={styles.side} />
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.side} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: colors.whiteff,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.greycc,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.grey333,
    textAlign: 'center',
  },
  side: {
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
