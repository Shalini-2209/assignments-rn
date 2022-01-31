import React, { Component } from "react";
import { API_KEY } from "../../config";
import { Text, ScrollView, Image, Linking, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native-web";
import Header from "./Header";

class Home extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    const url =
      "https://newsapi.org/v2/everything?q=tesla&from=2021-12-29&sortBy=publishedAt&apiKey=" +
      API_KEY;
    fetch(url)
      .then((response) => response.json())
      .then((news) => {
        console.log(news.articles);
        this.setState({ articles: news.articles });
      });
  }

  openArticle = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  render() {
    return (
      <>
        <Header />
        <ScrollView style={styles.container}>
          {this.state.articles.map((item, index) => {
            return (
              <View key={index} style={styles.newsItem}>
                <Text style={styles.heading} numberOfLines={1}>
                  <Entypo
                    name="newsletter"
                    size={20}
                    color="white"
                    style={styles.icon}
                  />
                  {item.title}
                </Text>
                <Text style={styles.extraInfo}>
                  {item.author && "Author:"} {item.author} | {item.publishedAt}
                </Text>
                <Image
                  source={{
                    uri: item.urlToImage,
                  }}
                  style={styles.newsImage}
                />
                <Text>{item.content}</Text>
                <Text
                  style={[
                    styles.extraInfo,
                    {
                      textAlign: "right",
                    },
                  ]}
                  onPress={() => this.openArticle(item.url)}
                >
                  Read More...
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, margin: 10 },
  icon: {
    marginRight: 10,
    marginTop: 5,
    backgroundColor: "#2c2c54",
    borderRadius: "50%",
    padding: 5,
  },
  newsItem: {
    marginBottom: 10,
    backgroundColor: "#f1f2f6",
    padding: 10,
  },
  newsImage: { height: 100, marginVertical: 5 },

  heading: { fontSize: 17, fontWeight: "bold" },

  extraInfo: { color: "grey", fontSize: 13, marginTop: 3 },
});

export default Home;
