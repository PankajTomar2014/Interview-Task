import React from 'react';
import {View} from 'react-native';
import {CustomeButton} from '../Components/All';

const HomeScreen: React.FC<{navigation: any}> = props => {
  return (
    <View style={{flex: 1}}>
      <CustomeButton
        onPress={() => props.navigation.navigate('CreatePost')}
        btnText={'Create Post'}
      />
      <CustomeButton
        onPress={() => props.navigation.navigate('PostList')}
        btnText={'For you'}
      />
    </View>
  );
};

export default HomeScreen;
