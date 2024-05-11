import React, {useRef, useState} from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import {useDispatch} from 'react-redux';

import {
  AppHeader,
  CustomeButton,
  DateTimeView,
  DownloadBtn,
  ImageView,
  Input,
  MediaBtn,
} from '../Components/All';
import {Colors} from '../Constant/Colors';
import {SCREEN_WIDTH, genrateRandomNumber} from '../Constant/Functions';
import {addPost} from '../Redux/postSlice';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';

const CreatePost = (props: any) => {
  const dispatch = useDispatch();
  const richText = useRef<RichEditor>(null);

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [postImages, setImage] = useState<string[]>([]);
  const [docs, setDocs] = useState<DocumentPickerResponse | null>(null);
  const [editorContent, setEditorContent] = useState<{
    title: string;
    date: Date | string;
    announcement: string;
  }>({
    title: '',
    date: '',
    announcement: '',
  });

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setEditorContent({...editorContent, date});
    hideDatePicker();
  };

  const handleEditorChange = (newContent: string) => {
    setEditorContent(prevState => ({...prevState, announcement: newContent}));
  };

  const selectDocs = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });

      console.log('dox', res);

      setDocs(res[0]);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        Alert.alert('Oops!', 'Canceled from single doc picker');
      } else {
        Alert.alert('Error: ', (error as Error).message);
      }
    }
  };

  const createNewPost = () => {
    try {
      const {title, date, announcement} = editorContent;
      if (title == '') {
        Alert.alert('Hold on!', 'Please enter name');
      } else if (date == '') {
        Alert.alert('Hold on!', 'Please select date');
      } else if (announcement == '') {
        Alert.alert('Hold on!', 'Please enter announcement');
      } else if (postImages.length == 0) {
        Alert.alert('Hold on!', 'Please select atleast one image');
      } else {
        const dumyPost = {
          id: genrateRandomNumber(),
          title: title,
          date: date,
          announcement: announcement,
          file: {
            name: docs?.name,
            path: docs?.uri,
          },
          images: postImages,
        };

        dispatch(addPost(dumyPost));
        Alert.alert('Congratulation', 'Post created successfully', [
          {text: 'OK', onPress: () => props.navigation.navigate('PostList')},
        ]);
      }
    } catch (error) {
      Alert.alert('Error: ', (error as Error).message);
    }
  };

  const getImageFromGallry = (type: 'replace' | 'new', index?: number) => {
    try {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      }).then(image => {
        const imageData = image.path;
        console.log(imageData);
        if (type == 'replace') {
          const newImages = [...postImages];
          newImages.splice(index, 1, imageData);
          setImage(newImages);
        } else {
          setImage([...postImages, imageData]);
        }
      });
    } catch (error) {
      Alert.alert('Error: ', (error as Error).message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader
        onPressMenu={() => props.navigation.goBack()}
        isNeedback
        headerTitle={'Create Post'}
      />
      <ScrollView>
        <Input
          containerStyle={{marginTop: 30}}
          onChangeText={text =>
            setEditorContent({...editorContent, title: text})
          }
          placeholder={'Post title'}
        />
        <DateTimeView
          date={editorContent.date}
          onPress={() => setDatePickerVisible(true)}
        />

        <View style={styles.editorContainer}>
          <RichEditor
            usecontainer={true}
            style={styles.editor}
            ref={richText}
            initialHeight={500}
            editorStyle={{
              placeholderColor: Colors.black,
              color: Colors.black,
            }}
            // initialContentHTML={editorContent?.announcement}
            placeholder={'Announcement'}
            onChange={text =>
              setEditorContent({...editorContent, announcement: text})
            }
          />
          <Text
            style={{
              position: 'absolute',
              textAlign: 'right',
              right: 5,
              bottom: 5,
              color: Colors.black,
              fontSize: 10,
            }}>
            {4000 - editorContent?.announcement?.length}
          </Text>
        </View>
        <RichToolbar
          style={styles.toolbar}
          editor={richText}
          onPressAddImage={() => console.log('onPressAddImage')}
        />

        <DownloadBtn
          fileName={docs ? docs.name : 'Select document (Pdf only)'}
          cross={docs}
          onPressCross={() => setDocs(null)}
          style={{width: SCREEN_WIDTH - 62}}
        />

        <FlatList
          data={postImages}
          scrollEnabled={false}
          renderItem={({item, index}) => {
            console.log('item----', item);
            return (
              <ImageView
                onPress={() => getImageFromGallry('replace', index)}
                isUploaded={item}
                cross={true}
                onPressCross={() => {
                  if (postImages.length == 1) {
                    setImage([]);
                  } else {
                    postImages.splice(index, 1);
                    setImage([...postImages]);
                  }
                }}
                btnText={'Image'}
              />
            );
          }}
          ListEmptyComponent={() => (
            <ImageView
              onPress={() => getImageFromGallry('new')}
              btnText={'Add Image'}
            />
          )}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          maximumDate={new Date(Date.now())}
          date={
            editorContent.date != ''
              ? new Date(editorContent.date)
              : new Date(Date.now())
          }
          mode="datetime"
          onConfirm={date => handleConfirm(date)}
          onCancel={() => hideDatePicker()}
        />

        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <MediaBtn onPress={() => selectDocs()} title={'Files'} />
          {postImages.length < 5 && (
            <MediaBtn
              onPress={() => getImageFromGallry('new')}
              title={'Media'}
            />
          )}
        </View>

        <CustomeButton
          style={{marginVertical: 20}}
          onPress={() => createNewPost()}
          btnText={'Post'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
export default CreatePost;

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: Colors.black,
    marginHorizontal: 32,
    marginVertical: 5,
    height: 50,
  },
  editorContainer: {
    borderWidth: 1,
    borderColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    minHeight: 80,
    maxHeight: 100,
    marginVertical: 5,
    width: '85%',
    borderRadius: 5,
  },
  editor: {
    color: Colors.black,
    alignSelf: 'center',
    textAlignVertical: 'top',
    minHeight: 80,
    maxHeight: 100,
    marginVertical: 1,
    width: '100%',
  },
});
