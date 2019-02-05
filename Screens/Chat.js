import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Header, Left, Right, Icon, Body, Title } from "native-base";
import { LinearGradient } from "expo";
import { Dimensions } from "react-native";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

class Chat extends Component {
  static navigationOptions = {
    header: null,
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-chatbubbles" style={{ fontSize: 24, color: tintColor }} />
    )
  };
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
            <Title style={{ color: "#00614b" }}>Chat</Title>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
