import React from 'react';
import {
  Alert,
  Image,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Colors, appImages, fontFamily} from '../Constant/Colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  capitalFirstLetter,
} from '../Constant/Functions';
import store from '../Redux/store';
import {commonStyles} from '../Constant/commonStyle';
import {useNavigation} from '@react-navigation/native';

export const EmptyMessage = props => {
  const {message, styles} = props;
  return (
    <View
      style={[
        {
          height: SCREEN_HEIGHT - 150,
          justifyContent: 'center',
          alignItems: 'center',
        },
        styles,
      ]}>
      <Text
        style={{
          fontSize: 23,
          alignSelf: 'center',
          color: 'black',
        }}>
        {message}
      </Text>
    </View>
  );
};

export const AddRemoveBtn = props => {
  const {title, style} = props;
  return (
    <TouchableOpacity {...props} style={[styles.button, style]}>
      <Text style={styles.buttonText}>
        {false ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </Text>
    </TouchableOpacity>
  );
};

export const CustomeButton = props => {
  const {btnText, onPress, style} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.touchStyle,
        {
          backgroundColor: Colors.black,
        },
        style,
      ]}>
      <Text
        style={[
          styles.touchText,
          {
            color: Colors.white,
          },
        ]}>
        {btnText}
      </Text>
    </TouchableOpacity>
  );
};

export const Input = props => {
  const {containerStyle} = props;
  const darkMode = useColorScheme() == 'dark';
  const {schemeColor} = store.getState().app;
  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor:
            darkMode && schemeColor === '#FFFFFF'
              ? Colors.white
              : schemeColor === '#FFFFFF'
              ? Colors.black
              : schemeColor,
        },
        containerStyle,
      ]}>
      <TextInput
        placeholderTextColor={Colors.black}
        style={styles.input}
        {...props}
      />
    </View>
  );
};
export const DropDown = props => {
  const {containerViewStyle} = props;
  return (
    <View
      style={[
        {
          // width:"80%",
          // marginHorizontal:30,
          alignSelf: 'center',
        },
        containerViewStyle,
      ]}>
      <RNPickerSelect
        {...props}
        //  placeholder = {{}}
        useNativeAndroidPickerStyle={false}
        fixAndroidTouchableBug={true}
        onDonePress={() => console.log('onDonePress')}
        onUpArrow={() => console.log('onUpArrow')}
        onDownArrow={() => console.log('onDownArrow')}
        style={{
          inputAndroid: commonStyles.rnPickerSelectStyle,
          inputIOS: commonStyles.rnPickerSelectStyle,
        }}
        textInputProps={commonStyles.pickerContainer}
        Icon={() => (
          <Image
            resizeMode="contain"
            style={commonStyles.rowIconStyle}
            source={appImages.arrow}
          />
        )}
      />
    </View>
  );
};

export const MsgInput = props => {
  const {containerStyle} = props;
  const darkMode = useColorScheme() == 'dark';
  const {schemeColor} = store.getState().app;
  return (
    <TextInput
      {...props}
      style={[
        {
          borderWidth: 1,
          borderColor:
            darkMode && schemeColor === '#FFFFFF'
              ? Colors.white
              : schemeColor === '#FFFFFF'
              ? Colors.black
              : schemeColor,
          alignSelf: 'center',
          textAlignVertical: 'top',
          // height:100,
          minHeight: 100,
          maxHeight: 200,
          paddingVertical: 10,
          paddingHorizontal: 15,
          marginVertical: 5,
          width: '85%',
          borderRadius: 5,
          // backgroundColor: schemeColor,
          // fontFamily: Fonts.RobotoRegular,
          fontSize: 13,
          // color: Colors.darkGray,
        },
        containerStyle,
      ]}
      multiline={true}
    />
  );
};

export const TitleText = props => {
  const {label, value} = props;

  return (
    <Text
      style={{
        fontSize: 17,
        color: Colors.linkBlue,
        fontWeight: 'bold',
      }}>
      {label} {'  :  '}
      <Text
        style={{
          fontSize: 16,
          color: Colors.lightCoral,
          fontWeight: '500',
        }}>
        {value}
      </Text>
    </Text>
  );
};

export const SeprateLine = props => {
  const {lineColor, icon} = props;
  return (
    <View style={{height: 0.5, width: '100%', backgroundColor: lineColor}} />
  );
};

export const TitleView = props => {
  const {title, darkMode} = props;
  return (
    <View
      style={{
        paddingHorizontal: 20,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        height: 30,
      }}>
      <Text
        style={{
          fontSize: 14,
          color: darkMode ? Colors.white : Colors.black,
          fontFamily: fontFamily.RobotoRegular,
        }}>
        {title}
      </Text>
    </View>
  );
};

export const Header = props => {
  const {title, onPress, isBack} = props;

  return (
    <View
      style={{
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
        width: '100%',
        backgroundColor: Colors.black,
      }}>
      <IconBtn
        iconStyle={{
          transform: [{rotate: isBack ? '180deg' : '0deg'}],
          tintColor: Colors.white,
          height: isBack ? 20 : 30,
          width: isBack ? 20 : 30,
        }}
        style={{
          height: 40,
          width: 40,
          backgroundColor: Colors.black,
        }}
        onPress={onPress}
        icon={isBack ? appImages.arrow : appImages.menu}
      />
      <Text
        style={{
          marginLeft: 13,
          fontSize: 18,
          fontFamily: fontFamily.RobotoBold,
          color: Colors.white,
        }}>
        {title}
      </Text>
    </View>
  );
};

export const AppHeader = props => {
  const navigation = useNavigation();
  const cartCount = store.getState().cart.data.length;
  console.log('cartCount-------', store.getState().cart.data);

  const {
    containerStyle,
    onPressMenu,
    isNeedback,
    headerTitle,
    itemCount,
    edit,
    onPressEdit,
  } = props;

  const height = 50;

  const onPressCart = () => {
    navigation.navigate('Cart');
  };

  return (
    <View
      style={[
        {
          height: height,
          flexDirection: 'row',
          alignSelf: 'center',
          backgroundColor: Colors.black,
          width: '100%',
          paddingHorizontal: 15,
        },
        containerStyle,
      ]}>
      <ImageButton
        onPress={onPressMenu}
        icon={isNeedback ? appImages.arrow : appImages.menu}
        iconStyle={
          isNeedback
            ? {height: 20, width: 20, transform: [{rotate: '180deg'}]}
            : {height: 30, width: 30}
        }
        containerStyle={{width: '10%', height: height}}
      />

      <View
        style={{
          height: height,
          justifyContent: 'center',
          backgroundColor: Colors.black,
          width: '60%',
        }}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{
            paddingRight: 15,
            fontSize: 18,
            marginLeft: 10,
            color: Colors.white,
          }}>
          {headerTitle}
        </Text>

        {itemCount != '' && itemCount != undefined && (
          <Text
            style={{
              fontSize: 10,
              marginLeft: 10,
              fontFamily: Fonts.RobotoBold,
              color: Colors.darkGray,
            }}>
            {itemCount}
          </Text>
        )}
      </View>

      <View
        style={{
          height: height,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          width: '30%',
        }}>
        <HeaderIconButton
          onPress={() => onPressCart()}
          count={cartCount}
          icon={{
            uri: 'https://static-00.iconduck.com/assets.00/shopping-cart-icon-2048x2047-gv68pvgw.png',
          }}
        />

        {edit && (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{
              padding: 5,
              marginBottom: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onPressEdit}>
            <Text
              style={{
                fontFamily: Fonts.RobotoBold,
                color: Colors.orange,
                fontSize: 16,
              }}>
              {'Edit'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export const HeaderIconButton = props => {
  const {count, icon, iconStyle, onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        marginRight: 5,
        width: 35,
        height: 40,
        // backgroundColor:"green",
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress}>
      <Image
        resizeMode="contain"
        source={icon}
        style={[{height: 22, tintColor: Colors.white, width: 22}, iconStyle]}
      />
      {count > 0 && (
        <View
          style={{
            height: 18,
            width: 18,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            borderRadius: 20,
            top: 3,
            right: 0,
            alignSelf: 'flex-end',
            position: 'absolute',
          }}>
          <Text
            style={{
              fontSize: 8,
              color: Colors.white,
            }}>
            {count > 99 ? '99+' : count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export const ImageButton = props => {
  const {iconStyle, icon, onPress, containerStyle} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.black,
          height: 45,
          borderRadius: 100,
          width: 45,
        },
        containerStyle,
      ]}>
      <Image
        resizeMode={'contain'}
        source={icon}
        style={[{height: 25, tintColor: 'white', width: 25}, iconStyle]}
      />
    </TouchableOpacity>
  );
};

export const IconBtn = props => {
  const {icon, onPress, darkMode, iconStyle, style} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        {
          borderRadius: 50,
          height: 55,
          width: 55,

          backgroundColor: Colors.white,
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      onPress={onPress}>
      <Image
        resizeMode="contain"
        style={[{height: 25, width: 25}, iconStyle]}
        source={icon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchStyle: {
    alignSelf: 'center',
    borderRadius: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '85%',
  },
  touchText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
    height: 55,
    width: '85%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  input: {
    paddingLeft: 15,
    color: 'black',
  },
  hideContainer: {
    alignSelf: 'flex-end',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
  },
  BtnVIew: {
    height: 70,
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "rgba(0,0,0,0.5)",
    // marginTop: -45,
    // flexDirection: "row",
  },
});
