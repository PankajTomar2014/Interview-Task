import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  Text,
  useColorScheme,
} from 'react-native';
import {
  CustomButton,
  Header,
  ImageView,
  SCREEN_WIDTH,
  TitleText,
  genrateRandomNumber,
} from '../Components/All';
import Colors from '../Components/Colors';
import {getImageSize} from '../Components/DynamicSize';

var offset = 0;
var dataFinished = false;

export default ImageListScreen = props => {
  const isDarkMode = useColorScheme() == 'dark';
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);

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

      const response = await axios.request(config);
      const data = response.data;

      if (data && data.status === 'success') {
        if (data.images.length == 0) {
          dataFinished = true;
        }

        if (page == 0) {
          const newImage = await handleImageSize(data.images);

          setImages(newImage);
        } else {
          const newImage = await handleImageSize([...images, ...data.images]);

          setImages(newImage);
        }

        setLoading(false);
      }
    } catch (error) {
      Alert.alert('Error : ', error.message);
      setLoading(false);
    }
  };

  const handleImageSize = async images => {
    try {
      const newImagePromises = images.map(item =>
        getImageSize(item.xt_image)
          .then(size => ({
            height: size.height,
            aspectRatio: size.aspectRatio,
            xt_image: item.xt_image,
            id: genrateRandomNumber(),
            width: size.width,
          }))
          .catch(error => {
            return error;
          }),
      );
      const results = await Promise.allSettled(newImagePromises);

      const newImages = results
        .filter(result => result.status === 'fulfilled' && !result.value.error)
        .map(result => result.value);

      return newImages;
    } catch (error) {
      return [];
    }
  };

  const loadMore = () => {
    setLoading(true);
    offset += 1;
    fetchData(offset);
  };

  const footerComponent = () => {
    console.log('re-rendering---', isLoading + ' dataFinished--', dataFinished);

    if (isLoading) {
      return <TitleText title={'Data loading...'} />;
    } else if (dataFinished) {
      return <TitleText title={'Data finished...'} />;
    } else {
      return (
        <CustomButton title="Click here to load more" onPressBtn={loadMore} />
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? Colors.black : Colors.white,
      }}>
      <Header title={'Home Screen'} />
      {console.log('isloading------', isLoading)}
      <>
        <FlatList
          data={images}
          renderItem={({item, index}) => <ImageView item={item} />}
          ListFooterComponent={footerComponent}
          // ListFooterComponent={() =>
          //   !dataFinished ? (
          //     <CustomButton
          //       title="Click here to load more"
          //       onPressBtn={loadMore}
          //     />
          //   ) : dataFinished ? (
          //     <TitleText title={'Data finished'} />
          //   ) : isLoading ? (
          //     <TitleText title={'Loading...'} />
          //   ) : null
          // }
          // keyExtractor={(item, index) => index.toString()}
          initialNumToRender={10}
          onEndReachedThreshold={0.1}
        />
      </>
    </SafeAreaView>
  );
};
