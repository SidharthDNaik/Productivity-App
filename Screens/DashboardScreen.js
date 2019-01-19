import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import firebase from "firebase";
import { Header, Left, Right, Icon } from "native-base";

class DashboardScreen extends Component {
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
        </Header>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>DashboardScreen</Text>
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
