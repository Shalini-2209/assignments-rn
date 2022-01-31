import { POSTS } from "./data/data";
import { FontAwesome, AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import React, { Component } from "react";

class App extends Component {
  state = {
    posts: POSTS,
    newComment: "",
  };

  increaseLikes = (index) => {
    const tempPosts = [...this.state.posts];
    tempPosts[index].likes += 1;
    this.setState({ posts: tempPosts });
  };

  slideComments = (index) => {
    const temp = [...this.state.posts];
    temp[index].slideComments = !temp[index].slideComments;
    this.setState({ posts: temp });
  };

  handleNewComment = (post) => {
    const temp = [...this.state.posts];
    const index = post.id - 1;
    temp[index].comments.push(this.state.newComment);
    this.setState({ newComment: "" });
    this.setState({ posts: temp });
  };

  renderItem = ({ item }) => (
    <View style={{ flex: 1, marginTop: 5 }}>
      <Image
        source={{ uri: item.image }}
        style={{ height: 200, resizeMode: "stretch" }}
      />

      <Text
        style={{
          marginVertical: 10,
          marginLeft: 5,
          fontWeight: "bold",
          color: "#222f3e",
        }}
      >
        <FontAwesome name="user-circle-o" size={15} color="#222f3e" />{" "}
        {item.user} {"  "}
        <Text style={{ fontWeight: "normal" }}>{item.description}</Text>
      </Text>

      <View style={{ flexDirection: "row" }}>
        <AntDesign
          name="heart"
          size={24}
          color="#ED4C67"
          onPress={() => this.increaseLikes(item.id - 1)}
          style={{ marginHorizontal: 3 }}
        />
        <Text style={styles.attractions}>{item.likes}</Text>
        <MaterialIcons
          name="messenger-outline"
          size={24}
          color="#ED4C67"
          style={{ marginLeft: 10 }}
          onPress={() => this.slideComments(item.id - 1)}
        />
        <Text style={styles.attractions}>{item.comments.length}</Text>
      </View>

      {item.slideComments && (
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <TextInput
            value={this.state.newComment}
            placeholder="Type a comment.."
            onChange={(e) => this.setState({ newComment: e.target.value })}
            style={{ borderBottomColor: "grey" }}
          />
          <AntDesign
            name="caretright"
            size={20}
            color="#0984e3"
            style={{ marginRight: 10 }}
            onPress={() => this.handleNewComment(item)}
          />
        </View>
      )}

      {item.slideComments &&
        item.comments &&
        item.comments.map((comment, idx) => (
          <View style={[styles.row, { marginVertical: 3 }]} key={idx}>
            <FontAwesome
              name="user-circle"
              size={15}
              color="#ED4C67"
              style={{ marginRight: 5 }}
            />
            <Text>{comment}</Text>
          </View>
        ))}
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <AntDesign
            name="instagram"
            size={24}
            color="#ED4C67"
            style={{ marginTop: 7, marginLeft: 5 }}
          />
          <Text
            style={{
              fontStyle: "italic",
              fontWeight: "bold",
              margin: 10,
              fontSize: 20,
            }}
          >
            Instagram
          </Text>
        </View>
        <FlatList
          data={this.state.posts}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  attractions: {
    marginTop: 3,
    marginLeft: 3,
    color: "#2d3436",
  },
});
