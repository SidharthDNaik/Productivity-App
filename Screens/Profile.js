import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity
} from "react-native";
import { Header, Left, Right, Icon, Body, Title } from "native-base";
import { LinearGradient } from "expo";
import { Dimensions } from "react-native";
import UserAvatar from "react-native-user-avatar";
import firebase from "firebase";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

class Profile extends Component {
  static navigationOptions = {
    header: null,
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-person" style={{ fontSize: 24, color: tintColor }} />
    )
  };
  user = firebase.auth().currentUser;
  emptyList() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      email: this.user.email,
      name: this.user.displayName
    };
    console.log(this.state.email);
  }
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: "black",
        height: 0.5,
        width: width,
        justifyContent: "center",
        alignItems: "center"
      }}
    />
  );
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
              name="md-menu"
              onPress={() => this.props.navigation.openDrawer()}
              style={{ marginLeft: 10, color: "#FFC30F" }}
            />
          </Left>
          <Body>
            <Title style={{ color: "#FFC30F" }}>Profile</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 10,
              paddingBottom: 10
            }}
          >
            <UserAvatar size="75" name={this.state.name} color="#FFC30F" />
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {this.state.name}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column"
            }}
          >
            <View style={styles.separator2} />
            <View style={styles.inputView}>
              <Text style={styles.text}>Name</Text>
              <TextInput
                autoCorrect={false}
                selectionColor="#00ebb6"
                style={styles.inputText}
                value={this.state.name}
              />
            </View>
            <View style={styles.separator} />
            <View style={styles.inputView}>
              <Text style={styles.text}>Email</Text>
              <TextInput
                autoCorrect={false}
                selectionColor="#00ebb6"
                style={styles.inputText}
                value={this.state.email}
              />
            </View>
            <View style={styles.separator2} />
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.updateBox}
                onPress={() => {
                  this.props.navigation.navigate("DashboardScreen");
                }}
              >
                <Text style={{ fontSize: 20, padding: 10, color: "#FFC30F" }}>
                  Go to Feed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {
    height: 0.3,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#581845"
  },
  separator2: {
    height: 0.3,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#581845"
  },
  inputView: {
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20
  },
  inputText: {
    fontSize: 20,
    paddingLeft: 20,
    color: "#FFC30F"
  },
  text: {
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold"
  },
  updateBox: {
    width: width - 50,
    backgroundColor: "#581845",
    marginVertical: 25,
    borderRadius: 5,
    paddingVertical: 0,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    alignItems: "center"
  }
});
