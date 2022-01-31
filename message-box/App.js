import { StyleSheet, Text, View } from "react-native";
import React, { Component } from "react";
import ButtonComponent from "./src/components/Button";

class App extends Component {
  state = { msg: "Good Morning, Have a nice day. ", reply: "" };

  changeMessage = (text) => {
    this.setState({ rep: text });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Message box</Text>
        <View
          style={{
            justifyContent: "center",
            padding: 15,
            marginTop: 15,
            backgroundColor: "#f7f1e3",
          }}
        >
          <Text style={styles.msg}>{this.state.msg}</Text>
          <Text style={[styles.msg, { color: "#FC427B" }]}>
            {this.state.rep}
          </Text>
          <ButtonComponent changeMessage={this.changeMessage} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },

  msg: {
    fontSize: 15,
    marginVertical: 15,
  },
});

export default App;