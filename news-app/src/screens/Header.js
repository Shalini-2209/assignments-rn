import React, { Component } from "react";
import { Text, View } from "react-native";

class Header extends Component {
  render() {
    return (
      <Text
        style={{
          color: "#f7f1e3",
          backgroundColor: "#2c2c54",
          padding: 10,
          fontSize: 20,
          width: "auto",
        }}
      >
        Instant News
      </Text>
    );
  }
}

export default Header;
