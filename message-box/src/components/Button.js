import React, { Component } from "react";
import { Button } from "react-native";

class ButtonComponent extends Component {
  state = {};
  render() {
    return (
      <Button
        title="Get Next Message"
        color="#c44569"
        onPress={() => this.props.changeMessage("Hope you too have the same.")}
      />
    );
  }
}

export default ButtonComponent;