import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AddRemoveBtn, AppHeader, EmptyMessage} from '../Components/All';
import {removeCart} from '../Redux/cartSlice';

const Cart = props => {
  const cartData = useSelector(state => state.cart.data);
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(cartData);
  }, [cartData]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('ProductDetails', {product: item})
      }
      activeOpacity={0.7}
      style={styles.item}>
      <View style={{width: '30%'}}>
        <Image
          source={{uri: item?.image}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={{width: '60%'}}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {item?.title}
        </Text>

        <Text style={styles.price}>₹{item?.price}</Text>
        <AddRemoveBtn
          onPress={() => dispatch(removeCart(item?.id))}
          title={'Remove from cart'}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <AppHeader
        onPressMenu={() => props.navigation.goBack()}
        isNeedback
        headerTitle={'Cart List'}
      />
      <FlatList
        data={products}
        renderItem={renderItem}
        ListEmptyComponent={() => <EmptyMessage message={'Cart is empty!'} />}
        keyExtractor={(item, index) => index.toString()}
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
    width: 120,
    height: 120,
  },
});

export default Cart;
