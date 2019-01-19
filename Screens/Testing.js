import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Header, Left, Right, Icon } from "native-base";
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
        </Header>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>DashboardScreen</Text>
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
