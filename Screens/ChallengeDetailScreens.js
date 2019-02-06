import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker,
  Image
} from "react-native";
import { Header, Left, Right, Icon, Body, Title } from "native-base";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo";
import firebase from "firebase";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

export default class ChallengeDetailScreens extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    challenger: "",
    challengeType: "",
    challengeClockH: "0",
    challengeClockM: "0"
  };
  user = firebase.auth().currentUser;
  updateClockH = challengeClockH => {
    this.setState({ challengeClockH: challengeClockH });
  };

  updateClockM = challengeClockM => {
    this.setState({ challengeClockM: challengeClockM });
  };
  addChallenge() {
    var key = firebase
      .database()
      .ref("/feed")
      .push().key;
    firebase
      .database()
      .ref("/feed")
      .child(key)
      .set({
        challenger: this.state.challenger,
        challengeType: this.state.challengeType,
        first_name: this.user.displayName,
        timeHours: this.state.challengeClockH,
        timeMinutes: this.state.challengeClockM,
        created_at: Date.now()
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          style={{
            backgroundColor: "#00ebb6"
          }}
        >
          <Left>
            <Icon
              name="ios-arrow-back"
              onPress={() => this.props.navigation.goBack()}
              style={{ marginLeft: 10, color: "#00614b" }}
            />
          </Left>
          <Body>
            <Title style={{ color: "#00614b" }}>Challenge!</Title>
          </Body>
          <Right />
        </Header>
        <View>
          <TextInput
            style={styles.nameInput}
            placeholderTextColor="gray"
            placeholder="Challenger's Name"
            onChangeText={text => {
              this.setState({
                challenger: text
              });
            }}
            value={this.state.challenger}
          />
          <TextInput
            style={styles.nameInput}
            placeholderTextColor="gray"
            placeholder="Enter Activity"
            onChangeText={text => {
              this.setState({
                challengeType: text
              });
            }}
            value={this.state.challengeType}
          />
          <Text style={styles.title}>Challenge Time</Text>
          <View style={styles.pickerRow}>
            <Picker
              selectedValue={this.state.challengeClockH}
              style={{ height: 50, width: 125, borderColor: "#ff9f00" }}
              onValueChange={itemValue => this.updateClockH(itemValue)}
            >
              <Picker.Item label="0" value="0" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
            </Picker>
            <Picker
              selectedValue={this.state.language}
              style={{ height: 50, width: 60, borderColor: "#ff9f00" }}
            >
              <Picker.Item label="Hours" value="Hr(s)" />
            </Picker>
            <Picker
              selectedValue={this.state.challengeClockM}
              style={{ height: 50, width: 110, borderColor: "#ff9f00" }}
              onValueChange={itemValue => this.updateClockM(itemValue)}
            >
              <Picker.Item label="0" value="0" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="15" value="15" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="25" value="25" />
              <Picker.Item label="30" value="30" />
              <Picker.Item label="35" value="35" />
              <Picker.Item label="40" value="40" />
              <Picker.Item label="45" value="45" />
              <Picker.Item label="50" value="50" />
              <Picker.Item label="55" value="55" />
            </Picker>
            <Picker
              selectedValue={this.state.language}
              style={{ height: 50, width: 80, borderColor: "#ff9f00" }}
            >
              <Picker.Item label="Mins" value="Min(s)" />
            </Picker>
          </View>
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            shadowOffset: { width: 0, height: 1 },
            shadowColor: "#00000",
            shadowOpacity: 0.7,
            right: 30,
            bottom: 30
          }}
          onPress={() => {
            // navigate to the second screen, and pass the name of the user
            this.addChallenge();
            this.props.navigation.navigate("ClockScreens", {
              challenger: this.state.challenger,
              challengeType: this.state.challengeType,
              challengeClockH: this.state.challengeClockH,
              challengeClockM: this.state.challengeClockM
            });
          }}
        >
          <LinearGradient
            colors={["#dd0023", "#f83958"]}
            style={{
              padding: 15,
              borderRadius: 100,
              width: 100,
              height: 100,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Image
              source={require("../assets/flag.png")}
              style={{ width: 75, height: 75 }}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}
/*
In the code block above I created what the user sees as
the homepage for my app. The way I am able to add style to the
page is through style= .
 */

var styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    padding: 5,
    margin: 20
  },

  container: {
    flex: 1,
    backgroundColor: "white"
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#009688"
  },

  title: {
    marginTop: 5,
    fontSize: 25,
    color: "#00614B",
    fontWeight: "bold",
    alignSelf: "center",
    justifyContent: "center"
  },

  nameInput: {
    padding: 5,
    height: 40,
    borderWidth: 2,
    borderColor: "#FF9F00",
    margin: 20,
    color: "gray"
  },

  text: {
    fontSize: 17,
    fontWeight: "bold"
  },

  pickerRow: { flexDirection: "row", width: width - 50, alignItems: "center" },

  buttonRow: {
    marginTop: 200,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
