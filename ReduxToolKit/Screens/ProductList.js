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
import {AppHeader} from '../Components/All';

// Sample product data
const products = [
  {id: 1, name: 'Product 1', price: '$10'},
  {id: 2, name: 'Product 2', price: '$20'},
  {id: 3, name: 'Product 3', price: '$30'},
  {id: 4, name: 'Product 4', price: '$40'},
  {id: 5, name: 'Product 5', price: '$50'},
];

const ProductList = props => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = () => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(json => {
        // console.log('json-------', json);
        setProducts(json);
      });
  };

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
      <AppHeader headerTitle={'Product List'} />
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
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

export default ProductList;
