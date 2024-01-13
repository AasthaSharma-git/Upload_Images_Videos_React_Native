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
  ToastAndroid,
} from 'react-native';
import firebase from 'firebase';

import * as ImagePicker from 'expo-image-picker';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      ComplaintNo: 0,
      Media: '',
      MediaType:''
    };
  }
  componentDidMount() {
    firebase
      .database()
      .ref('/complaints/')
      .on('value', (snapshot) => {
        if (snapshot.val() == null) {
          //console.log('This executed')
          this.setState({ ComplaintNo: 1 });
        } else {
          var len = Object.keys(snapshot.val()).length;

          this.setState({
            ComplaintNo: len + 1,
          });
        }
      });
  }

  uploadComplaint = async () => {
    const { ComplaintNo ,Media,MediaType} = this.state;
    var folderName=MediaType=='video'?'UploadedVideos':'UploadedImages'
    var imageUrl;
    let imageRef = await firebase
      .storage()
      .ref(folderName+'/'+MediaType+ ComplaintNo);
    await imageRef.getDownloadURL().then((url) => {
      imageUrl = url;
    });
    firebase
      .database()
      .ref('/complaints/' + '/' +MediaType+'/'+ ComplaintNo)
      .update({
        Media: imageUrl,
      })
      .then((response) => {
        ToastAndroid.show('Media uploaded in realtime database!',ToastAndroid.LONG)
      })

      .catch((Error) => console.log(Error));
  };

  UploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
      this.setState({
        MediaType:result.type
      })

    if (!result.cancelled) {
      this.setState({ Media: result.uri });
      const uri = result.uri;
      var folderName=result.type=='image'?'UploadedImages':'UploadedVideos'
      const response = await fetch(uri);
      try{
         const blob = await response.blob();
      var ref = firebase
        .storage()
        .ref(folderName)
        .child(result.type+this.state.ComplaintNo)
        return ref.put(blob);
      }
    catch(e){
      console.log(e)
    }
     
    } else {
      console.log('Cancelled');
    }
  };

  render() {
    //console.log(this.state.ComplaintNo)
    return (
      <View style={styles.Container}>
        <SafeAreaView style={styles.AndroidSafeArea} />

        <TouchableOpacity style={styles.SubmitBut} onPress={this.UploadImage}>
          <Text>Upload Image or Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.SubmitBut}
          onPress={this.uploadComplaint}>
          <Text>SUBMIT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.SubmitBut}
          onPress={()=>this.props.navigation.navigate('GalleryScreen')}>
          <Text>Gallery</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  SubmitBut: {
    borderWidth: 5,
    height: 30,
    width: 65,
    alignSelf: 'center',
    marginTop: 50,
    color: 'white',
    borderColor: 'cyan',
    borderRadius: 15,
  },

  AndroidSafeArea: {
    marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },

  Container: {
    flex: 1,
  },
});
