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
} from 'react-native';
import firebase from 'firebase';

import * as ImagePicker from 'expo-image-picker';

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      ComplaintNo: 0,
      images: [],
      videos:[]
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref('/complaints/')
      .on('value', (snapshot) => {
        let imgs = [];
        let vids=[];
        let images=snapshot.val().image;
        let videos=snapshot.val().video;
        Object.keys(images).forEach(function(key){
          imgs.push(images[key].Media)
        })
        Object.keys(videos).forEach(function(key){
          vids.push(videos[key].Media)
        })
        this.setState({
          videos:vids,
          images:imgs
        })
        
      });
  }
  showImages = ({ item, index }) => {
    
    return (
      <View style={{ marginTop: 50, borderWidth: 2 }}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('MediaScreen',{'url':item,'type':'image'})}>
          <Text>{'Image ' + index}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  showVideos = ({ item, index }) => {
    
    return (
      <View style={{ marginTop: 50, borderWidth: 2 }}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('MediaScreen',{'url':item,'type':'video'})}>
          <Text>{'Video ' + index}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.Container}>
        <SafeAreaView style={styles.AndroidSafeArea} />
        <FlatList data={this.state.images} renderItem={this.showImages} />
        <FlatList data={this.state.videos} renderItem={this.showVideos} />
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
});
