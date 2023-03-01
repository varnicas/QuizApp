import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";

const StartGame = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background1.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.main}>
        <Image
          style={styles.mainImage}
          source={require("../assets/logo2.png")}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Game")}
        >
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 45,
    color: "#faedcd",
    fontWeight: "bold",
    marginTop: -10,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#faedcd",
    padding: 10,
    borderRadius: 10,
    width: "40%",
    height: 70,
  },

  mainImage: {
    height: 380,
    width: 240,
  },

  buttonText: {
    fontSize: 34,
    color: "#588157",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default StartGame;
