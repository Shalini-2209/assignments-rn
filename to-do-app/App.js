import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";

class App extends Component {
  state = {
    list: [{ name: "Meeting at 10", status: false }],
    newActivity: "",
    showForm: false,
  };

  saveInput = (e) => {
    this.setState({ newActivity: e.target.value });
  };

  addTask = () => {
    if (this.state.newActivity !== "") {
      const newTask = { name: this.state.newActivity, status: false };
      this.setState({ list: [...this.state.list, newTask] });
      this.setState({ newActivity: "" });
    } else alert("This field cannot be empty..");
  };

  setCompleted = (task) => {
    const updatedTasks = [];
    for (let item of this.state.list) {
      if (item.name !== task.name) updatedTasks.push(item);
      else updatedTasks.push({ ...item, status: true });
    }
    this.setState({ list: updatedTasks });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 15,
          }}
        >
          <Text style={styles.heading}>To Do List</Text>
          <Pressable
            style={[
              styles.button,
              this.state.showForm
                ? { backgroundColor: "#b33939" }
                : { backgroundColor: "black" },
            ]}
            onPress={() => this.setState({ showForm: !this.state.showForm })}
          >
            <Text style={{ color: "white" }}>
              {this.state.showForm ? "Close" : "Add"}
            </Text>
          </Pressable>
        </View>

        {this.state.showForm && (
          <>
            <TextInput
              style={styles.textBox}
              placeholder="Type to add an task!"
              onChange={this.saveInput}
              value={this.state.newActivity}
            />

            <Button
              title="Add Task"
              color="black"
              onPress={this.addTask}
              style={{ margin: 15 }}
            />
          </>
        )}

        <View>
          {this.state.list.map((task) => {
            return (
              <View
                style={[
                  styles.taskItem,
                  { borderLeftColor: task.status ? "#b33939" : "#44bd32" },
                ]}
                key={task.name}
              >
                <Text
                  style={[
                    styles.taskName,
                    {
                      color: task.status ? "#b33939" : "#44bd32",
                    },
                  ]}
                >
                  {task.name}
                </Text>
                <AntDesign
                  name={task.status ? "minuscircle" : "checkcircle"}
                  size={24}
                  color={task.status ? "#b33939" : "#44bd32"}
                  style={{
                    marginTop: 3,
                    marginRight: 10,
                  }}
                  onPress={() => this.setCompleted(task)}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 15,
  },
  textBox: {
    height: 50,
    borderWidth: 2,
    borderColor: "black",
    marginVertical: 15,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "#f5f6fa",
  },
  taskName: {
    padding: 10,
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginTop: 3,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: 15,
  },
});

export default App;
