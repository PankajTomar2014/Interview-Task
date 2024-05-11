import moment from 'moment';
import React from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import RNFetchBlob from 'rn-fetch-blob';
import {Colors, appImages} from '../Constant/Colors';
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  dummyImage,
  getTimeDifference,
} from '../Constant/Functions';
import {commonStyles} from '../Constant/commonStyle';
import RenderHtml from 'react-native-render-html';

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

export const CustomeButton = props => {
  const {btnText, style} = props;

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
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
export const PostCard = props => {
  const {item} = props;

  const checkPermission = async (file, fileName) => {
    console.log('file---', file);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadPdf(file, fileName);
      } else {
        Alert.alert('Error: ', 'Storage permission denied');
      }
    } catch (error) {
      Alert.alert('Error: ', error.message);
    }
  };

  const downloadPdf = (uri, filename) => {
    try {
      const randomImage =
        dummyImage[Math.floor(Math.random() * dummyImage.length)];

      RNFetchBlob.config({
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: RNFetchBlob.fs.dirs.DownloadDir + '/' + filename,
          description: 'File downloading...',
        },
      })
        .fetch('GET', randomImage, {})
        .then(res => {
          console.log('File downloaded to:', res.path());
          Alert.alert('File downloaded: ', res.path());
        })
        .catch(error => {
          Alert.alert('Error: ', error.message);
        });
    } catch (error) {
      Alert.alert('Error: ', error.message);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => null}
      activeOpacity={1}
      style={styles.item}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '16%', margin: 2}}>
          <Image
            source={{
              uri: 'https://www.vhv.rs/dpng/d/15-155087_dummy-image-of-user-hd-png-download.png',
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={{width: '76%'}}>
          <Text style={styles.name} numberOfLines={2}>
            {item.title}
            {' posted on announcement on '}
            {moment(item.date).format('DD-MMM-YYYY , hh:mm A')}
          </Text>
          <Text style={styles.name} numberOfLines={2}>
            {getTimeDifference(item.date)}
          </Text>

          <RenderHtml
            source={{
              html: `<p style="color: black">
                    <span>
                   ${item.announcement}
                    </span>
              </p>`,
            }}
          />

          {/* <Text
            style={[
              styles.name,
              {textTransform: 'capitalize', marginVertical: 10},
            ]}>
            {item.announcement}
          </Text> */}
          <DownloadBtn
            fileName={item.file.name}
            isDownload={true}
            onPressDownload={() =>
              checkPermission(item.file.path, item.file.name)
            }
          />
          {item.images.map((item, key) => (
            <ImageView
              key={key}
              isUploaded={item}
              style={{width: SCREEN_WIDTH - 110}}
              btnText={'Image'}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const MediaBtn = props => {
  const {title, style} = props;
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.9}
      style={[
        {
          alignSelf: 'center',
          flexDirection: 'row',
          marginVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          height: 45,
          width: '40%',
        },
        style,
      ]}>
      <Text style={{color: Colors.black, fontSize: 13}} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const DownloadBtn = props => {
  const {fileName, onPressCross, cross, onPressDownload, isDownload, style} =
    props;
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.9}
      style={[
        {
          alignSelf: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
          marginVertical: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1,
          height: 45,
          width: SCREEN_WIDTH - 110,
        },
        style,
      ]}>
      <Image
        resizeMode={'contain'}
        source={{
          uri: 'https://img.icons8.com/?size=100&id=11204&format=png',
        }}
        style={{height: 25, width: 25}}
      />
      <Text style={{color: Colors.black, fontSize: 13}} numberOfLines={2}>
        {fileName}
      </Text>

      {isDownload ? (
        <IconBtn
          style={{
            height: 30,
            width: 30,
          }}
          icon={{
            uri: 'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-download-arrow-vector-icon-white-transparent-background-png-image_1978018.jpg',
          }}
          onPress={onPressDownload}
        />
      ) : cross ? (
        <IconBtn
          style={{
            height: 30,
            width: 30,
          }}
          icon={appImages.cross}
          onPress={onPressCross}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export const ImageView = props => {
  const {btnText, cross, onPressCross, isUploaded, style} = props;

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[
        {
          borderWidth: 1,
          alignSelf: 'center',
          borderRadius: 10,
          marginVertical: 10,
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
          width: '85%',
        },
        style,
      ]}>
      {isUploaded ? (
        <Image
          {...props}
          source={{uri: isUploaded}}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            height: 98,
            width: '99.5%',
          }}
          resizeMode={'stretch'}
        />
      ) : (
        <Text
          style={[
            {
              fontSize: 14,
              color: Colors.black,
            },
          ]}>
          {btnText}
        </Text>
      )}
      {cross && (
        <TouchableOpacity
          onPress={onPressCross}
          activeOpacity={0.8}
          style={{
            alignSelf: 'flex-end',
            right: -15,
            top: -20,
            height: 40,
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: 40,
          }}>
          <Image
            resizeMode={'contain'}
            source={appImages.cross}
            style={{height: 35, width: 35}}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export const DateTimeView = props => {
  const {date} = props;

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={{
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 5,
        justifyContent: 'center',
        paddingLeft: 12,
        height: 50,
        width: '85%',
      }}>
      <Text
        style={[
          {
            fontSize: 13,
            color: Colors.black,
          },
        ]}>
        {date
          ? moment(date).format('DD-MMM-YYYY , hh:mm A')
          : 'Select data and time'}
      </Text>
    </TouchableOpacity>
  );
};

export const Input = props => {
  const {containerStyle} = props;
  const darkMode = useColorScheme() == 'dark';
  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: Colors.black,
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
  const {} = props;

  return (
    <TextInput
      {...props}
      placeholderTextColor={Colors.black}
      style={{
        borderWidth: 1,
        borderColor: Colors.black,
        color: Colors.black,
        alignSelf: 'center',
        textAlignVertical: 'top',
        minHeight: 80,
        maxHeight: 100,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 5,
        width: '85%',
        borderRadius: 5,
        fontSize: 13,
      }}
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
          color: Colors.white,
        }}>
        {title}
      </Text>
    </View>
  );
};

export const AppHeader = props => {
  const {containerStyle, onPressMenu, isNeedback, headerTitle} = props;
  const height = 50;
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
          alignItems: 'center',
          backgroundColor: Colors.black,
          width: '80%',
        }}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: Colors.white,
          }}>
          {headerTitle}
        </Text>
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
  const {icon, onPress, iconStyle, style} = props;
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
  item: {
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 13,
    color: Colors.black,
    marginVertical: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Colors.dimGray,
    width: 50,
    height: 50,
  },
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
    justifyContent: 'center',
    alignItems: 'center',
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
