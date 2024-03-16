import {
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
} from 'react-native';
import Colors from './Colors';
import {useNavigation} from '@react-navigation/native';
import {dynamicSize, getFontSize} from './DynamicSize';
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

export const CustomButton = props => {
  const {title, titleTextStyle, onPressBtn, containerStyle} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.buttonView, containerStyle]}
      onPress={onPressBtn}>
      <Text style={[styles.customBtnTextStyle, titleTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export const Header = props => {
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
        backgroundColor: Colors.white,
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
            backgroundColor: Colors.white,
            width: '10%',
          }}>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3114/3114883.png',
            }}
            style={styles.headerIconStyle}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}

      <Text
        style={{
          marginLeft: 10,
          fontWeight: 'bold',
          color: Colors.darkGray,
          fontSize: getFontSize(18),
        }}>
        {title}
      </Text>
    </View>
  );
};

export const Input = props => {
  return (
    <View style={styles.inputContainer}>
      <View
        style={{
          width: '45%',
          height: dynamicSize(45),
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: getFontSize(18),
            color: Colors.black,
            fontWeight: 'bold',
          }}
          {...props}>
          {props.lable}
        </Text>
      </View>
      <View style={styles.inputStyle}>
        <TextInput {...props} />
        {props.error && (
          <Text style={{color: 'red', fontSize: getFontSize(11)}}>
            {props.error}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    borderRadius: 15,
    height: dynamicSize(45),
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: Colors.black,
    height: dynamicSize(35),
    color: Colors.black,
    width: '50%',
  },

  buttonView: {
    height: dynamicSize(45),
    width: '40%',
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customBtnTextStyle: {
    fontSize: getFontSize(16),
    color: Colors.white,
    fontWeight: 'bold',
  },

  headerIconStyle: {
    height: dynamicSize(25),
    width: dynamicSize(25),
  },
});
