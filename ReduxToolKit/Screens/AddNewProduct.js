import React, {useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {
  AppHeader,
  CustomeButton,
  DropDown,
  ImageView,
  Input,
} from '../Components/All';
import {Colors} from '../Constant/Colors';
import {genrateRandomNumber} from '../Constant/Functions';
import {maritalStatusOptions} from '../Constant/Json';
import {addProduct} from '../Redux/productSlice';

const AddNewProduct = props => {
  const dispatch = useDispatch();
  const [product, setProducts] = useState({
    price: '',
    image: '',
    category: '',
    description: '',
    title: '',
  });

  // export const dummyProduct2 = {
  //   category: "men's clothing",
  //   description:
  //     'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
  //   id: 1,
  //   image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  //   price: 109.95,
  //   rating: {count: 120, rate: 3.9},
  //   title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  // };

  const _addNewProduct = () => {
    try {
      const {price, image, category, description, title} = product;
      console.log('product-----', product);
      if (title == '') {
        Alert.alert('Hold on!', 'Please enter name');
      } else if (price == '') {
        Alert.alert('Hold on!', 'Please enter price');
      } else if (description == '') {
        Alert.alert('Hold on!', 'Please enter description');
      } else if (category == '') {
        Alert.alert('Hold on!', 'Please select category');
      } else if (image == '') {
        Alert.alert('Hold on!', 'Please select image');
      } else {
        dispatch(
          addProduct({
            price,
            image,
            id: genrateRandomNumber(),
            category,
            description,
            title,
          }),
        );
        Alert.alert('Congratulation', 'Product added successfully', [
          {text: 'OK', onPress: () => props.navigation.goBack()},
        ]);
      }
    } catch (error) {
      console.log('error-----', error.message);
    }
  };

  const getImageFromGallry = () => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      }).then(image => {
        const imageData = image.path;
        console.log(imageData);
        setProducts({...product, image: imageData});
      });
    } catch (error) {
      console.log('error-----', error.message);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader
        onPressMenu={() => props.navigation.goBack()}
        isNeedback
        headerTitle={'Add New Product'}
      />
      <Input
        containerStyle={{marginTop: 30}}
        onChangeText={text => setProducts({...product, title: text})}
        placeholder={'Name'}
      />
      <Input
        onChangeText={text => setProducts({...product, price: text})}
        placeholder={'Price'}
        keyboardType={'numeric'}
      />
      <Input
        onChangeText={text => setProducts({...product, description: text})}
        placeholder={'Description'}
      />
      <DropDown
        onValueChange={value => setProducts({...product, category: value})}
        placeholder={{label: 'Select Category', value: 'Select Category'}}
        value={product?.category}
        items={maritalStatusOptions}
      />

      <ImageView
        onPress={() => getImageFromGallry()}
        isUploaded={product?.image}
        btnText={'Image'}
      />

      <CustomeButton
        style={{marginVertical: 40}}
        onPress={() => _addNewProduct()}
        btnText={'Add New Product!'}
      />
      <CustomeButton
        onPress={() => props.navigation.navigate('ProductByApi')}
        btnText={'Product list!'}
      />
    </SafeAreaView>
  );
};
export default AddNewProduct;
