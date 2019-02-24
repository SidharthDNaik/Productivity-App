import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Header, Left, Right, Icon, Body, Title } from "native-base";
import { LinearGradient } from "expo";
import { Dimensions } from "react-native";
import {GiftedChat} from "react-native-gifted-chat";
import chatBackend from "./chatBackend";
import firebase from "firebase";

var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height

class Chat extends Component {
  state = {
    messages: []
  };
  static navigationOptions = {
    header: null,
    drawerIcon: ({ tintColor }) => (
      <Icon name="ios-chatbubbles" style={{ fontSize: 24, color: tintColor }} />
    )
  };
  user= firebase.auth().currentUser;

  componentWillMount() {

  }

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
            <Title style={{ color: "#FFC30F" }}>Chat</Title>
          </Body>
          <Right />
        </Header>
          <View style={styles.yawYeet}>
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => {
                  chatBackend.sendMessage(message);
                }}
                user={{
                  _id: this.user.uid,
                  name: this.user.displayName,
                }}
            />
          </View>
      </View>
    );
  }

  componentDidMount() {
    chatBackend.loadMessages((message) =>{
      this.setState((previousState) =>{
        return {
          messages: GiftedChat.append(previousState.messages,message),
        };
      });
    });
  }

  componentWillUnmount() {
    chatBackend.closeChat();
  }
}
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  yawYeet: {
    flex: 1
  }
});
