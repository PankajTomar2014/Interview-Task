import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {AppHeader, EmptyMessage} from '../Components/All';
import {useSelector} from 'react-redux';

const Cart = props => {
  const cartData = useSelector(state => state.cart.data);
  console.log('cart Data----', cartData);
  const [products, setProducts] = useState([]);

  // 1st way to do multiple api
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const promises = cartData.map(id =>
          fetch(`https://fakestoreapi.com/products/${id}`).then(response =>
            response.json(),
          ),
        );
        const productsData = await Promise.all(promises);
        setProducts(productsData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, [cartData]);

  // 2nd way to do multiple api
  // useEffect(() => {
  //   for (let index = 0; index < cartData.length; index++) {
  //     const id = cartData[index];
  //     setTimeout(() => {
  //       fetchCartProduct(id);
  //     }, 200);
  //   }
  // }, []);

  // const fetchCartProduct = async id => {
  //   console.log('Iddddddd-----', id);
  //   try {
  //     const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  //     const json = await response.json();
  //     setProducts(prev => [...prev, json]);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('ProductDetails', {product: item})
      }
      activeOpacity={0.7}
      style={styles.item}>
      <View style={{width: '30%'}}>
        <Image
          source={{uri: item.image}}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={{width: '60%'}}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {item.title}
        </Text>

        <Text style={styles.price}>₹{item.price}</Text>
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
        keyExtractor={item => item.id}
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
