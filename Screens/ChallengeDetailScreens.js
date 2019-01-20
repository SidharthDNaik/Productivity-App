import React from "react";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Picker
} from "react-native";

import { Actions } from "react-native-router-flux";

export default class ChallengeDetailScreens extends React.Component {
  state = {
    challenger: "",
    challengeType: "",
    challengeClockH: "0",
    challengeClockM: "0"
  };

  updateClockH = challengeClockH => {
    this.setState({ challengeClockH: challengeClockH });
  };

  updateClockM = challengeClockM => {
    this.setState({ challengeClockM: challengeClockM });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            Enter challenger's email or public for no challenger
          </Text>

          <TextInput
            style={styles.nameInput}
            placeholderTextColor="gray"
            placeholder="Ex: mingun@example.com"
            onChangeText={text => {
              this.setState({
                challenger: text
              });
            }}
            value={this.state.challenger}
          />

          <Text style={styles.title}>Enter activity</Text>

          <TextInput
            style={styles.nameInput}
            placeholderTextColor="gray"
            placeholder="Ex: Gym"
            onChangeText={text => {
              this.setState({
                challengeType: text
              });
            }}
            value={this.state.challengeType}
          />

          <Text style={styles.title}>Enter time amount</Text>

          <View style={styles.pickerRow}>
            <Picker
              selectedValue={this.state.challengeClockH}
              style={{ height: 50, width: 125, borderColor: "black" }}
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
              style={{ height: 50, width: 50, borderColor: "black" }}
            >
              <Picker.Item label="Hr(s)" value="Hr(s)" />
            </Picker>

            <Picker
              selectedValue={this.state.challengeClockM}
              style={{ height: 50, width: 110, borderColor: "black" }}
              onValueChange={itemValue => this.updateClockM(itemValue)}
            >
              <Picker.Item label="0" value="0" />
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
              style={{ height: 50, width: 80, borderColor: "black" }}
            >
              <Picker.Item label="Min(s)" value="Min(s)" />
            </Picker>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              onPress={() => {
                // navigate to the second screen, and pass the name of the user
                this.props.navigation.navigate("ClockScreens", {
                  challenger: this.state.challenger,
                  challengeType: this.state.challengeType,
                  challengeClockH: this.state.challengeClockH,
                  challengeClockM: this.state.challengeClockM
                });
              }}
              style={styles.buttonContainer}
            >
              <Text style={styles.text}>Go!</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginTop: 20,
    marginLeft: 20,
    fontSize: 12,
    color: "#00614B",
    fontWeight: "bold"
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

  pickerRow: { flexDirection: "row" },

  buttonRow: {
    marginTop: 200,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
