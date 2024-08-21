import React, {useRef, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TextInput,
} from 'react-native';
import VideoPlayer from '../component/VideoPlayer';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ReelsFeedScreen = () => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [commentModal, setCommentModal] = useState(false);
  const [input, setInput] = useState('');
  const [pause, setPause] = useState(true);
  const [arrayData, setArrayData] = useState([
    {
      url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      id: 0,
      like: false,
      comment: [{data: 'Hello, world'}],
    },
    {
      url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      id: 1,
      like: false,
      comment: [],
    },
    {
      url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      id: 2,
      like: false,
      comment: [],
    },
    {
      url: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      id: 3,
      like: false,
      comment: [],
    },
  ]);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  const flatListRef = useRef(null);

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0]; // Get the first visible item
      setPlayingIndex(visibleItem.index); // Set the playing index to the visible item
    }
  });

  const likeFn = () => {
    let like = arrayData[playingIndex]?.like;
    let array = [...arrayData];

    array[playingIndex] = {...array[playingIndex], like: !like};

    setArrayData(array);
  };

  const commentFn = () => {
    let comment = arrayData[playingIndex]?.comment;
    comment.push({data: input});
    setInput('');
  };

  const renderItem = ({item, index}) => (
    <View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => setPause(!pause)}>
          <VideoPlayer source={item} onPlay={pause && index === playingIndex} />
        </TouchableOpacity>
      </View>
      <View style={{zIndex: 5, position: 'absolute', bottom: 100, right: 20}}>
        <TouchableOpacity onPress={() => likeFn()}>
          <AntDesign
            name={'heart'}
            size={35}
            color={arrayData[playingIndex]?.like ? 'red' : 'green'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCommentModal(true);
            setPause(false);
          }}>
          <AntDesign name={'comment-o'} size={35} color={'green'} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={arrayData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        pagingEnabled
      />
      {commentModal && (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={commentModal}
            onRequestClose={() => {
              setPause(true);
              setCommentModal(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{color: 'green', alignSelf: 'center', fontSize: 20}}>
                  Comments
                </Text>
                <FlatList
                  data={arrayData[playingIndex]?.comment}
                  scrollEnabled
                  renderItem={({item, index}) => {
                    return (
                      <View>
                        <Text style={{color: '#000'}}>
                          {index + 1 + ' ' + item?.data}
                        </Text>
                      </View>
                    );
                  }}
                />
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="Comment here..."
                    placeholderTextColor={'#aaa'}
                    value={input}
                    onChangeText={text => setInput(text)}
                    onSubmitEditing={() => commentFn()}
                    style={{color: '#000'}}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#000000aa',
  },
  modalView: {
    marginTop: 245,
    backgroundColor: 'white',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '70%',
    padding: 20,
  },
  inputView: {
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#555',
    marginBottom: 10,
  },
});
export default ReelsFeedScreen;
