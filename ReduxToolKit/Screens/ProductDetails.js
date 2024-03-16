import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {AddRemoveBtn, AppHeader} from '../Components/All';
import {useDispatch, useSelector} from 'react-redux';
import {addCart} from '../Redux/cartSlice';

const ProductItem = props => {
  const dispatch = useDispatch();
  const {product} = props.route.params;
  const cartData = useSelector(state => state.cart.data);
  // console.log('product----------', product);

  const addtoCart = product => {
    console.log('pro id----', cartData);
    if (!cartData.includes(product.id)) {
      dispatch(addCart(product.id));
    } else {
      Alert.alert('Warning!', 'Product already exist in cart');
    }
    // dispatch(addCart(product.id));
  };

  return (
    <SafeAreaView>
      <AppHeader
        onPressMenu={() => props.navigation.goBack()}
        isNeedback
        headerTitle={'Product Details'}
      />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: product.image}}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={{}}>
          <Text selectable style={styles.description}>
            Product _id : {product.id}
          </Text>
          <Text selectable style={styles.name}>
            {product.title}
          </Text>
          <Text selectable style={styles.category}>
            {product.category}
          </Text>
          <Text selectable style={styles.description}>
            {product.description}
          </Text>
          <Text style={styles.price}>₹{product.price}</Text>

          <View style={styles.buttonsContainer}>
            <AddRemoveBtn
              title={'Add to Cart'}
              style={styles.addToCartButton}
              onPress={() => addtoCart(product)}
            />
          </View>
        </View>
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 3,
  },
  image: {
    width: 200,
    height: 200,
  },
  details: {
    flex: 1,
    padding: 10,
  },
  name: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  category: {
    color: 'black',
    fontSize: 15,
    marginVertical: 5,
  },
  description: {
    color: 'black',
    fontSize: 15,
    marginVertical: 10,
  },

  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addToCartButton: {
    backgroundColor: '#28a745',
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductItem;
