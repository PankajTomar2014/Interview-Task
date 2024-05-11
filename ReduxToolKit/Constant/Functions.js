import {Alert, Dimensions, Linking, Platform} from 'react-native';

export const IS_IOS = Platform.OS == 'ios';
export const Is_ANDROID = Platform.OS == 'android';
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const position = {
  center: 'center',
  top: 'top',
  bottom: 'bottom',
};

export const capitalFirstLetter = letter => {
  try {
    const capitalized =
      letter[0].toUpperCase() + letter.slice(1, letter.length);
    return capitalized;
  } catch (error) {
    console.log('capitalFirstLetter--error------', error.message);
  }
};

export const genrateRandomNumber = () => {
  try {
    return Math.floor(Math.random() * 9000000000) + 1;
  } catch (error) {
    console.log('error------', error.message);
  }
};
