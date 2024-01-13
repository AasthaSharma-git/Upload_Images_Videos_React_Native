import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  SafeAreaView,
  Platform,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import firebase from 'firebase';

import { Video, AVPlaybackStatus } from 'expo-av';

export default class ShowMedia extends React.Component {
  render() {
    var mediaUrl = this.props.navigation.getParam('url');
    var type = this.props.navigation.getParam('type');

    return (
      <View style={styles.Container}>
        <SafeAreaView style={styles.AndroidSafeArea} />
        {type == 'video' ? (
          <Video
            style={styles.video}
            source={{
              uri: mediaUrl,
            }}
            resizeMode="contain"
            useNativeControls={true}
          />
        ) : (
          <Image
            source={{ uri: mediaUrl }}
            style={{ alignSelf: 'center', width: 400, height: 400 }}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  AndroidSafeArea: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },

  Container: {
    flex: 1,
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
});
