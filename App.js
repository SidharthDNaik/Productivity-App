import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
  Button
} from "react-native";
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator,
  DrawerItems
} from "react-navigation";
import LoadingScreen from "./Screens/LoadingScreen";
import LoginScreen from "./Screens/LoginScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import Chat from "./Screens/Chat";
import Profile from "./Screens/Profile";
import ChallengeDetailScreens from "./Screens/ChallengeDetailScreens";
import ClockScreens from "./Screens/ClockScreens";
import * as firebase from "firebase";
import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}

const DashboardStack = createStackNavigator({
  DashboardScreen: DashboardScreen,
  ChallengeDetailScreens: ChallengeDetailScreens,
  ClockScreens: ClockScreens
});

const CustomDrawerNav = props => (
  <SafeAreaView style={{ flex: 1 }}>
    <View
      style={{
        height: 150,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Image
        source={require("./assets/ProductivityAppLogo.png")}
        style={{ width: 120, height: 120, borderRadius: 30 }}
      />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
      <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
    </ScrollView>
  </SafeAreaView>
);

const MyDrawerNavigator = createDrawerNavigator(
  {
    Feed: DashboardStack,
    Chat: Chat,
    Profile: Profile
  },
  {
    contentComponent: CustomDrawerNav
  }
);
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
