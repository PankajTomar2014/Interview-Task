import {StyleSheet, I18nManager, Platform, Dimensions} from 'react-native';
import {Colors, fontFamily} from './Colors';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen');
const IS_ANDROID = Platform.OS === 'android';
const IS_IOS = Platform.OS === 'ios';

// common styles which can be used anywhere
export const commonStyles = StyleSheet.create({
  rnPickerSelectStyle: {
    width: '100%',
    paddingLeft: 11,

    fontSize: 12,
    color: Colors.black,
  },
  pickerContainer: {
    marginVertical: 10,
    fontSize: 17,
    color: Colors.darkGray,
    // backgroundColor: 'red',
    paddingLeft: 15,
    width: SCREEN_WIDTH - 55,
    borderWidth: 1,
    borderColor: Colors.black,
    height: 55,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
  },
  rowIconStyle: {
    height: 18,
    width: 18,
    top: 30,
    transform: [{rotate: '90deg'}],
    end: IS_ANDROID ? 30 : 20,
  },
  toastStyle: {
    backgroundColor: Colors.black,
    paddingLeft: 15,
    paddingRight: 15,
  },
  toastTextStyle: {
    fontSize: 15,
    fontFamily: fontFamily.RobotoRegular,
    color: Colors.white,
  },
});
