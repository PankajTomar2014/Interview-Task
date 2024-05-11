import React, {useState} from 'react';
import {Button, FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {AppHeader, EmptyMessage, PostCard} from '../Components/All';
import {Colors} from '../Constant/Colors';

const POSTS_PER_PAGE = 5;

const PostList: React.FC<{navigation: any}> = props => {
  const post = useSelector((state: any) => state.post.data);

  const [data, setData] = useState(post.slice(0, POSTS_PER_PAGE));
  const [currentIndex, setCurrentIndex] = useState(POSTS_PER_PAGE);

  const loadMoreData = () => {
    const newData = post.slice(currentIndex, currentIndex + POSTS_PER_PAGE);
    setData(prevData => [...prevData, ...newData]);
    setCurrentIndex(prevIndex => prevIndex + POSTS_PER_PAGE);
  };

  console.log('how post----', post.length);

  const renderItem = ({item}: {item: any}) => {
    return <PostCard item={item} />;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <AppHeader
        onPressMenu={() => props.navigation.goBack()}
        isNeedback
        headerTitle={'For you'}
      />
      <FlatList
        data={data.reverse()}
        renderItem={renderItem}
        scrollEnabled={post.length > 0}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={5}
        ListEmptyComponent={() => <EmptyMessage message={'No post found!'} />}
        ListFooterComponent={() => {
          return data.length === 0 ? null : currentIndex >= post.length &&
            post.length > 5 ? (
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                color: Colors.red,
                marginVertical: 20,
              }}>
              {'No more data'}
            </Text>
          ) : (
            post.length !== 0 &&
            post.length > 5 && (
              <Button title="Next Page" onPress={loadMoreData} />
            )
          );
        }}
      />
    </SafeAreaView>
  );
};

export default PostList;
