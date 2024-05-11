import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppHeader, EmptyMessage, ProductCard} from '../Components/All';
import {Colors} from '../Constant/Colors';
import {fetchProductApi} from '../Redux/apiCall';

const ProductByApi = props => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const {products, error, status} = useSelector(state => state.apiProducts);

  useEffect(() => {
    dispatch(fetchProductApi());
  }, [dispatch]);

  const renderItem = ({item}) => {
    return <ProductCard item={item} />;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? Colors.dimGray : Colors.white,
      }}>
      <AppHeader
        onPressMenu={() => props.navigation.goBack()}
        isNeedback
        headerTitle={'Product List'}
      />
      {status == 'loading' ? (
        <EmptyMessage message={'Loading'} />
      ) : status == 'failed' ? (
        <EmptyMessage message={error} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <EmptyMessage message={'Product not found!'} />
          )}
        />
      )}
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

export default ProductByApi;
