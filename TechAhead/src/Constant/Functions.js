import moment from 'moment';
import {Alert, Dimensions, Linking, Platform} from 'react-native';

export const IS_IOS = Platform.OS == 'ios';
export const Is_ANDROID = Platform.OS == 'android';
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const dummyImage = [
  'https://www.pakainfo.com/wp-content/uploads/2021/09/image-url-for-testing.jpg',
  'https://samplelib.com/lib/preview/png/sample-hut-400x300.png',
  'https://samplelib.com/lib/preview/png/sample-boat-400x300.png',
  'https://api3.foslighting.in/storage/fos-92q0451kf2bbh58/small.png',
  'https://api3.foslighting.in/storage/1054f0d1-471e-472f-8310-9278a00efc4a/small.png',
  'https://api3.foslighting.in/storage/55fb6cf2-2e55-4226-b8c7-4c524977fb8f/small.png',
];

export const position = {
  center: 'center',
  top: 'top',
  bottom: 'bottom',
};

export const getTimeDifference = previousTime => {
  const currentTime = moment();
  const previousMoment = moment(previousTime);

  const timeDifference = moment.duration(currentTime.diff(previousMoment));

  const days = timeDifference.days();
  const hours = timeDifference.hours();
  const minutes = timeDifference.minutes();

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else {
    return 'Just now';
  }
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
