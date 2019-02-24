/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import { Header, Left, Right, Icon, Body, Title } from "native-base";
import firebase from "firebase";

import moment from "moment";

function RoundButton({ title, color, background, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={() => !disabled && onPress()}
      style={[styles.button, { backgroundColor: background }]}
    >
      <Text style={[styles.buttonTitle, { color }]}>{title}</Text>
    </TouchableOpacity>
  );
}
function ButtonsRow({ children }) {
  return <View style={styles.buttonsRow}>{children}</View>;
}

export default class ClockScreens extends React.Component {
  state = {
    totalTime:
      60 * parseFloat(this.props.navigation.state.params.challengeClockH) +
      parseFloat(this.props.navigation.state.params.challengeClockM) + (parseFloat(this.props.navigation.state.params.challengeClockS)/60),
    challengeKey: this.props.navigation.state.params.challengeKey
  };
  constructor(props) {
    super(props);
    this.state = {
      currentTime: moment.duration(this.state.totalTime, "minutes"),
      pauseTime: moment.duration(0, "seconds"),
      timePassed: moment.duration(0, "seconds"),
      currentState: 0,
      decrease: 1,
      timer: null,
      timer2: null,
      timer3: null,
      num: 1
    };
    this.reduce = this.reduce.bind(this);
    this.pause = this.pause.bind(this);
    this.increase = this.increase.bind(this);
    this.up = this.up.bind(this);
  }

  leftPad = val => {
    if (val < 10) return "0" + val;

    return val;
  };

  start = () => {
    this.setState({
      decrease: 1,
      currentState: 1,
      timer: setInterval(this.reduce, 1000),
      timer3: setInterval(this.up, 1000)
    });
  };
  updateChallenge() {
    var key = firebase
      .database()
      .ref("/feed/")
      .push().key;
    firebase
      .database()
      .ref("/feed/")
      .child(key)
      .set({
        challenger: this.props.navigation.state.params.challenger,
        challengeType: this.props.navigation.state.params.challengeType,
        first_name: this.props.navigation.state.params.first_name,
        timeHours: this.state.timePassed.get("hours"),
        timeMinutes: this.state.timePassed.get("minutes"),
        timeSeconds: this.state.timePassed.get("seconds"),
        created_at: Date.now()
      });
  }
  deleteChallenge() {
    firebase
      .database()
      .ref("/feed/" + this.props.navigation.state.params.challengeKey)
      .remove();
  }
  up() {
    const tempTime2 = moment.duration(this.state.timePassed);
    tempTime2.add(this.state.decrease, "seconds");

    this.setState({
      timePassed: tempTime2
    });
  }

  reduce() {
    if (
      this.state.currentTime.get("hours") == 0 &&
      this.state.currentTime.get("minutes") == 0 &&
      this.state.currentTime.get("seconds") == 0
    ) {
      Alert.alert("Time is up!", "Great Job!");
      this.done();
      return;
    }

    const newTime = moment.duration(this.state.currentTime);
    newTime.subtract(this.state.decrease, "seconds");

    this.setState({
      currentTime: newTime
    });
  }

  pause = () => {
    Alert.alert(
      "Warning: ",
      "You can only pause once.",
      [{ text: "Pause", onPress: () => this.paused() }, { text: "Nevermind" }],
      { cancelable: false }
    );
  };

  paused() {
    this.setState({
      currentState: 2,
      decrease: 0,
      timer2: setInterval(this.increase, 1000)
    });
  }

  increase() {
    const addTime = moment.duration(this.state.pauseTime);
    addTime.add(this.state.num, "seconds");
    this.setState({
      pauseTime: addTime
    });

    if (this.state.pauseTime.get("minutes") == 3) {
      Alert.alert("Are you here?", "Make sure not to get distracted!");
    }
    if (this.state.pauseTime.get("minutes") == 5) {
      Alert.alert("Hey,", "Comeback!");
    }
  }

  end = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to quit?",
      [{ text: "Yes", onPress: () => this.done() }, { text: "No" }],
      { cancelable: false }
    );
  };

  resume = () => {
    this.setState({
      currentState: 4,
      decrease: 1,
      num: 0
    });
  };

  done() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    this.setState({
      currentState: 3,
      decrease: 0,
      currentTime: moment.duration(0, "seconds")
    });
    var key = firebase
      .database()
      .ref("/feed/")
      .push().key;
    firebase
      .database()
      .ref("/feed/")
      .child(key)
      .set({
        challenger: this.props.navigation.state.params.challenger,
        challengeType: this.props.navigation.state.params.challengeType,
        first_name: this.props.navigation.state.params.first_name,
        timeHours: this.state.timePassed.get("hours"),
        timeMinutes: this.state.timePassed.get("minutes"),
        timeSeconds: this.state.timePassed.get("seconds"),
        created_at: Date.now()
      });
  }
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          style={{
            backgroundColor: "#581845"
          }}
        >
          <Left>
            <Icon
              name="ios-arrow-back"
              onPress={() => this.props.navigation.navigate("DashboardScreen")}
              style={{ marginLeft: 10, color: "#FFC30F" }}
            />
          </Left>

          <Body>
            <Title style={{ color: "#FFC30F" }}>Progress</Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "#fff",
            paddingHorizontal: 20
          }}
        >
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>
              {this.leftPad(this.state.currentTime.get("hours"))}:{" "}
            </Text>
            <Text style={styles.timer}>
              {this.leftPad(this.state.currentTime.get("minutes"))}:{" "}
            </Text>
            <Text style={styles.timer}>
              {this.leftPad(this.state.currentTime.get("seconds"))}{" "}
            </Text>
          </View>
        </View>

        {this.state.currentState == 0 && (
          <ButtonsRow>
            <RoundButton title="Pause" color="#FFC30F" background="#581845" />
            <RoundButton
              title="Start"
              color="#FFC30F"
              background="#581845"
              onPress={this.start}
            />
          </ButtonsRow>
        )}
        {this.state.currentState == 1 && (
          <ButtonsRow>
            <RoundButton
              title="Pause"
              color="#FFC30F"
              background="#581845"
              onPress={this.pause}
            />
            <RoundButton
              title="End"
              color="#FFC30F"
              background="#581845"
              onPress={this.end}
            />
          </ButtonsRow>
        )}
        {this.state.currentState == 2 && (
          <ButtonsRow>
            <RoundButton
              title="Resume"
              color="#FFC30F"
              background="#581845"
              onPress={this.resume}
            />
            <RoundButton
              title="End"
              color="#FFC30F"
              background="#581845"
              onPress={this.end}
            />
          </ButtonsRow>
        )}
        {this.state.currentState == 2 && (
          <View>
            <View style={styles.row2}>
              <Text style={styles.words}>
                {"You have paused the timer for: "}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.words}>
                {this.leftPad(this.state.pauseTime.get("hours"))}:{" "}
              </Text>
              <Text style={styles.words}>
                {this.leftPad(this.state.pauseTime.get("minutes"))}:{" "}
              </Text>
              <Text style={styles.words}>
                {this.leftPad(this.state.pauseTime.get("seconds"))}{" "}
              </Text>
            </View>
          </View>
        )}

        {this.state.currentState == 3 && (
          <View>
            <Text>{"You ended early\n"}</Text>
            <View style={styles.row}>
              <Text style={{ fontSize: 20 }}>{"You worked for: "}</Text>
              <Text style={styles.words}>
                {this.leftPad(this.state.timePassed.get("hours"))}:{" "}
              </Text>
              <Text style={styles.words}>
                {this.leftPad(this.state.timePassed.get("minutes"))}:{" "}
              </Text>
              <Text style={styles.words}>
                {this.leftPad(this.state.timePassed.get("seconds"))}{" "}
              </Text>
            </View>
          </View>
        )}
        {this.state.currentState == 4 && (
          <ButtonsRow>
            <RoundButton
              title="End"
              color="#FFC30F"
              background="#ff9f00"
              onPress={this.end}
            />
          </ButtonsRow>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  timer: {
    color: "#0D0D0D",
    fontSize: 76,
    fontWeight: "200",
    width: 110
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonTitle: {
    fontSize: 18
  },
  oneButtonRow: {
    marginBottom: 300,
    alignItems: "center"
  },

  buttonsRow: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginBottom: 300,
    margin: 20
  },
  timerContainer: {
    flexDirection: "row",
    marginTop: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  words: {
    fontSize: 20
  },
  row: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: -60
  },

  row2: {
    marginTop: 10
  }
});
