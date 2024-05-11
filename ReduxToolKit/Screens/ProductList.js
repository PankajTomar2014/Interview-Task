import React from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AppHeader, CustomeButton, ProductCard} from '../Components/All';
import {Colors} from '../Constant/Colors';
import {SCREEN_HEIGHT} from '../Constant/Functions';

const ProductList = props => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const products = useSelector(state => state.products.data);

  const renderItem = ({item}) => {
    return <ProductCard item={item} />;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? Colors.dimGray : Colors.white,
      }}>
      <AppHeader isNeedAddNewProduct headerTitle={'Product List'} />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <CustomeButton
            style={{marginTop: SCREEN_HEIGHT / 2.7}}
            onPress={() => props.navigation.navigate('AddNewProduct')}
            btnText={'Add New Product!'}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 110,
    height: 120,
  },
});

export default ProductList;
