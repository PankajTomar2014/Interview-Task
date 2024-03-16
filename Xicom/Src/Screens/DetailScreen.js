import {useState} from 'react';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {CustomButton, Header, Input} from '../Components/All';

import {
  TouchableOpacity,
  View,
  Button,
  Image,
  TextInput,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validateName,
  validatePhoneNo,
  validateSpace,
} from '../Components/Validation';
import {dynamicSize} from '../Components/DynamicSize';

export default DetailScreen = props => {
  const {item} = props.route.params;
  console.log('props------', item);
  const [firstName, setFirstName] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const submitForm = async () => {
    if (firstName == '') {
      setFirstNameError('Please enter firstname');
    }
    if (validateFirstName(firstName).status == false) {
      setFirstNameError('Please enter valid firstname');
    }
    if (lastName == '') {
      setLastNameError('Please enter lastname');
    }
    if (validateLastName(lastName).status == false) {
      setLastNameError('Please enter valid lastname');
    }
    if (email == '') {
      setEmailError('Please enter email');
    }
    if (validateEmail(email).status == false) {
      setEmailError('Please enter valid email');
    }
    if (phone == '') {
      setPhoneError('Please enter phone');
    }
    if (validatePhoneNo(phone).status == false) {
      setPhoneError('Please enter valid phone');
    } else {
      convertImageIntoMultipart();
    }
  };

  const convertImageIntoMultipart = () => {
    try {
      const imageUrl = item.xt_image;
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch('GET', imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const formData = new FormData();
          formData.append('first_name', firstName);
          formData.append('last_name', lastName);
          formData.append('phone', phone);
          formData.append('email', email);
          formData.append('user_image', {
            uri: Platform.OS === 'android' ? `file://${blob._ref}` : blob,
            name: 'image.jpg',
            type: 'image/jpeg',
          });

          saveDataApi(formData);
        })
        .catch(error => {
          alert(error.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const saveDataApi = formData => {
    try {
      let config = {
        method: 'post',
        url: 'https://dev3.xicom.us/xttest/savedata.php',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };

      axios
        .request(config)
        .then(response => {
          if (response.data && response.data.status == 'success') {
            alert(response.data.message);
          }
        })
        .catch(error => {
          alert(error.message);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const validateFirstNameFun = fName => {
    setFirstName(fName);
    setFirstNameError('');
  };
  const validateLastNameFun = lName => {
    setLastName(lName);
    setLastNameError('');
  };

  const validateEmailFun = email => {
    setEmail(email);
    setEmailError('');
  };
  const validatePhoneFun = number => {
    setPhone(number);
    setPhoneError('');
  };

  return (
    <SafeAreaView>
      <Header isBack title={'Detail Screen'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{uri: item.xt_image}}
          resizeMode="contain"
          // style={{width: '100%', aspectRatio: 1}}
          style={{
            width: dynamicSize(350),
            height: dynamicSize(300),
          }}
        />

        <Input
          lable="First Name"
          value={firstName}
          onChangeText={validateFirstNameFun}
          error={firstNameError}
        />
        <Input
          lable="Last Name"
          value={lastName}
          onChangeText={validateLastNameFun}
          error={lastNameError}
        />
        <Input
          lable="Email"
          value={email}
          onChangeText={validateEmailFun}
          error={emailError}
          keyboardType={'email-address'}
        />
        <Input
          lable="Phone Number"
          maxLength={10}
          value={phone}
          onChangeText={validatePhoneFun}
          keyboardType={'phone-pad'}
          error={phoneError}
        />

        <CustomButton
          containerStyle={{alignSelf: 'flex-end', marginRight: 10}}
          title="Submit"
          onPressBtn={submitForm}
        />
        <View style={{height: 80}} />
      </ScrollView>
    </SafeAreaView>
  );
};
