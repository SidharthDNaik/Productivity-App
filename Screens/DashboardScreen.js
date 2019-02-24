import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator
} from "react-native";
import firebase from "firebase";
import { Header, Left, Right, Icon, Body, Title } from "native-base";
import { LinearGradient } from "expo";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
var data = [];

class DashboardScreen extends Component {
  static navigationOptions = {
    header: null
  };

  user = firebase.auth().currentUser;

  state = {
    challenger: "",
    challengeType: "",
    challengeClockH: 1,
    challengeClockM: 0,
    challengeKey: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      listViewData: data
    };
  }
  componentDidMount() {
    var that = this;
    firebase
      .database()
      .ref("/feed")
      .on("child_added", function(data) {
        var newData = [...that.state.listViewData];
        newData.push(data);
        that.setState({ listViewData: newData.reverse() });
      });
  }
  emptyList() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
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
              name="md-menu"
              onPress={() => this.props.navigation.openDrawer()}
              style={{ marginLeft: 10, color: "#00614b" }}
            />
          </Left>
          <Body>
            <Title style={{ color: "#00614b" }}>Activity Feed</Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <FlatList
            ListEmptyComponent={this.emptyList()}
            data={this.state.listViewData}
            renderItem={({ item }) => (
              <View
                style={{
                  width: width - 10,
                  height: 75,
                  backgroundColor: "#ffb53b",
                  marginTop: 10,
                  alignItems: "flex-start",
                  justifyContent: "center",
                  borderRadius: 5
                }}
              >
                <LinearGradient
                  colors={["#ffb53b", "#ffb53b"]}
                  style={{
                    padding: 20,
                    alignItems: "flex-start",
                    borderRadius: 5,
                    width: width - 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row"
                    }}
                  >
                    <View>
                      <Text>
                        {item.val().first_name} challenged{" "}
                        {item.val().challenger}
                      </Text>
                      <Text>
                        {item.val().challengeType} for {item.val().timeHours}{" "}
                        hours {item.val().timeMinutes} minutes and{" "}
                        {item.val().timeSeconds} seconds
                      </Text>
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
                      right: 10,
                      bottom: 15
                    }}
                    onPress={() => {
                      this.setState(
                        {
                          challenger: item.val().challenger,
                          challengeType: item.val().challengeType,
                          challengeClockH: item.val().timeHours,
                          challengeClockM: item.val().timeMinutes,
                          challengeKey: item.val().challengeKey
                        },
                        function() {
                          this.props.navigation.navigate("ClockScreens", {
                            challenger: this.state.challenger,
                            challengeType: this.state.challengeType,
                            challengeClockH: this.state.challengeClockH,
                            challengeClockM: this.state.challengeClockM,
                            challengeKey: this.state.challengeKey,
                            first_name: this.user.displayName
                          });
                        }
                      );
                    }}
                  >
                    <LinearGradient
                      colors={["#dd0023", "#ffb53b"]}
                      style={{
                        padding: 15,
                        borderRadius: 75,
                        width: 50,
                        height: 50,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Image
                        source={require("../assets/flag.png")}
                        style={{ width: 35, height: 35 }}
                      />
                    </LinearGradient>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            )}
          />
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
            onPress={() =>
              this.props.navigation.navigate("ChallengeDetailScreens")
            }
          >
            <LinearGradient
              colors={["#dd0023", "#dd0023"]}
              style={{
                padding: 15,
                borderRadius: 100,
                width: 75,
                height: 75,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={require("../assets/flag.png")}
                style={{ width: 50, height: 50 }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
