import {useEffect, useState} from 'react';
import axios from 'axios';
import {Header} from '../Components/All';
import {
  TouchableOpacity,
  Button,
  Image,
  FlatList,
  SafeAreaView,
  Text,
  Dimensions,
} from 'react-native';
import {dynamicSize} from '../Components/DynamicSize';

var offset = 0;
var dataFinished = false;

export default ImageListScreen = props => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchData(offset);
  }, []);

  const fetchData = async page => {
    try {
      let formData = new FormData();
      formData.append('user_id', '108');
      formData.append('offset', page);
      formData.append('type', 'popular');

      let config = {
        method: 'post',
        url: 'https://dev3.xicom.us/xttest/getdata.php',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
      };
      console.log('formData---', formData);

      const response = await axios.request(config);
      const data = response.data;
      console.log('images---', data.images);
      if (data && data.status === 'success') {
        if (data.images.length == 0) {
          dataFinished = true;
        }
        if (page == 0) {
          setImages(data.images);
        } else {
          setImages([...images, ...data.images]);
        }
      }
    } catch (error) {
      console.log('catch err---', error);
    }
  };

  const loadMore = () => {
    offset += 1;
    console.log(offset);
    fetchData(offset);
  };

  const renderImages = ({item}) => {
    return (
      <TouchableOpacity
        style={{marginVertical: 10}}
        key={item.id}
        onPress={() => props.navigation.navigate('DetailScreen', {item: item})}>
        <Image
          source={{
            uri: item.xt_image
              ? item.xt_image
              : 'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png',
          }}
          resizeMode="contain"
          // style={{width: '100%', aspectRatio: 1}}
          style={{
            width: dynamicSize(350),
            height: dynamicSize(300),
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
      <Header title={'Home Screen'} />
      <>
        <FlatList
          data={images}
          renderItem={renderImages}
          ListFooterComponent={() =>
            !dataFinished ? (
              <Button title="Click here to load more" onPress={loadMore} />
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginVertical: 10,
                  fontSize: 25,
                  color: 'green',
                }}>
                {'Data finished'}
              </Text>
            )
          }
          keyExtractor={item => item.id}
          initialNumToRender={10}
          onEndReachedThreshold={0.1}
        />
      </>
    </SafeAreaView>
  );
};
