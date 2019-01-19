import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Header, Left, Right, Icon, Body, Title } from "native-base";
import { LinearGradient } from "expo";
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
import firebase from "firebase";

class Testing extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Left>
            <Icon
              name="ios-menu"
              onPress={() => this.props.navigation.openDrawer()}
            />
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ backgroundColor: "#00ebb6", flex: 1 }}>
          <LinearGradient
            colors={["#a5bdb8", "#009775"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: height
            }}
          />
          <Button title="Sign Out" onPress={() => firebase.auth().signOut()} />
        </View>
      </View>
    );
  }
}
export default Testing;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
