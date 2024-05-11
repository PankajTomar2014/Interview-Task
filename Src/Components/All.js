import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Colors from './Colors';
import {useNavigation} from '@react-navigation/native';
import {dynamicSize, getFontSize} from './DynamicSize';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const genrateRandomNumber = () => {
  try {
    return Math.floor(Math.random() * 9000000000) + 1;
  } catch (error) {
    console.log('error------', error.message);
  }
};

export const ImageView = ({item}) => {
  const navigation = useNavigation();
  // console.log('ImageView------', item.height, item.width, item.aspectRatio);
  return (
    <TouchableOpacity
      style={{marginVertical: 10}}
      key={item.id}
      onPress={() => navigation.navigate('DetailScreen', {item: item})}>
      <Image
        key={item.id}
        source={{
          uri: item.xt_image
            ? item.xt_image
            : 'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png',
        }}
        resizeMode="stretch"
        style={{
          // width: dynamicSize(item.width) ? dynamicSize(item.width) : 300,
          // height: dynamicSize(item.height) ? dynamicSize(item.height) : 400,

          height: 400,
          backgroundColor: 'red',
          width: '100%',

          // height: item.height,
          // width: item.width,
          // aspectRatio: item.aspectRatio,
        }}
      />
    </TouchableOpacity>
  );
};

export const CustomButton = props => {
  const isDarkMode = useColorScheme() == 'dark';
  const {title, titleTextStyle, onPressBtn, containerStyle} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.buttonView,
        {backgroundColor: isDarkMode ? Colors.white : Colors.black},
        containerStyle,
      ]}
      onPress={onPressBtn}>
      <Text
        style={[
          styles.customBtnTextStyle,
          {color: isDarkMode ? Colors.black : Colors.white},
          titleTextStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const Header = props => {
  const isDarkMode = useColorScheme() == 'dark';
  const backgroundColor = isDarkMode ? Colors.black : Colors.white;

  const navigation = useNavigation();
  const {title, isBack} = props;
  const height = dynamicSize(45);

  return (
    <View
      style={{
        height: height,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        width: '100%',
        paddingLeft: 15,
      }}>
      {isBack && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={{
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            width: '10%',
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png',
            }}
            style={[
              styles.headerIconStyle,
              {tintColor: isDarkMode ? Colors.white : Colors.black},
            ]}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}

      <Text
        style={{
          marginLeft: 10,
          fontWeight: 'bold',
          color: isDarkMode ? Colors.white : Colors.black,
          fontSize: getFontSize(18),
        }}>
        {title}
      </Text>
    </View>
  );
};

export const Input = props => {
  const isDarkMode = useColorScheme() == 'dark';

  const backgroundColor = isDarkMode ? Colors.black : Colors.white;
  const textColor = isDarkMode ? Colors.white : Colors.black;
  return (
    <View>
      <View style={styles.inputContainer}>
        <View
          style={{
            width: '45%',
            height: dynamicSize(50),
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: getFontSize(18),
              color: textColor,
              fontWeight: 'bold',
            }}
            {...props}>
            {props.lable}
          </Text>
        </View>
        <View
          style={[
            styles.inputStyle,
            {
              borderColor: isDarkMode ? Colors.white : Colors.black,
              backgroundColor: backgroundColor,
            },
          ]}>
          <TextInput
            cursorColor={isDarkMode ? Colors.white : Colors.black}
            style={{
              height: dynamicSize(50),
              color: isDarkMode ? Colors.white : Colors.black,
            }}
            {...props}
          />
        </View>
      </View>
      {props.error && (
        <Text
          style={{
            textAlign: 'left',
            marginLeft: SCREEN_WIDTH / 2.1,
            color: isDarkMode ? Colors.white : Colors.red,
            fontSize: getFontSize(11),
          }}>
          {props.error}
        </Text>
      )}
    </View>
  );
};

export const TitleText = props => {
  const {title} = props;
  return (
    <Text
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 25,
        color: 'green',
      }}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    borderRadius: 15,
    height: dynamicSize(50),
    // alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    justifyContent: 'center',

    height: dynamicSize(50),
    color: Colors.black,
    width: '50%',
  },

  buttonView: {
    height: dynamicSize(45),
    paddingHorizontal: 30,
    marginVertical: 10,
    alignSelf: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },
  customBtnTextStyle: {
    fontSize: getFontSize(16),

    fontWeight: 'bold',
  },

  headerIconStyle: {
    height: dynamicSize(25),
    width: dynamicSize(25),
  },
});
