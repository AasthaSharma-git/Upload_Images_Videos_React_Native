import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import firebase from "firebase";
import {firebaseConfig} from "./config"
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import Home from './screens/Home'
import Gallery from './screens/Gallery'
import ShowMedia from './screens/ShowMedia'



if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
else{
  firebase.app()
}

const StackNavigator = createStackNavigator({

  HomeScreen:{
    screen:Home,
    navigationOptions:{headerShown:false}
  },
  GalleryScreen:{
     screen:Gallery,
    navigationOptions:{headerShown:false}
  },
  MediaScreen:{
     screen:ShowMedia,
    navigationOptions:{headerShown:false}
  },
   

  
})

const AppContainer = createAppContainer(StackNavigator)




export default class App extends React.Component{
  render(){
    return(
      <AppContainer/>
    )
  }
}