import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import LoadingScreen from "./Screens/LoadingScreen";
import LoginScreen from "./Screens/LoginScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import Testing from "./Screens/Testing";
import * as firebase from "firebase";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const MyDrawerNavigator = createDrawerNavigator({
  Feed: {
    screen: DashboardScreen
  },
  Settings: {
    screen: Testing
  }
});
const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  DashboardScreen: MyDrawerNavigator
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
