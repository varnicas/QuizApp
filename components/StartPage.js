import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

const StartPage = ({ navigation }) => {
  return (
    <View style={styles.main}>
      <ImageBackground
        source={require("../assets/background1.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.firstContainer}>
          <Text style={styles.title}>Welcome to</Text>
          <Image
            style={styles.mainImage}
            source={require("../assets/logo2.png")}
          />
        </View>

        <View style={styles.secondContainer}>
          <Text style={styles.text}>Already played?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("LogIn");
            }}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={styles.text}>First time playing?</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignContent: "space-between",
  },

  mainImage: {
    height: 350,
    width: 250,
    marginTop: -25,
  },

  firstContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    color: "#fff",
  },

  secondContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    marginTop: -40,
  },

  text: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },

  title: {
    fontSize: 45,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 20,
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#faedcd",
    padding: 15,
    borderRadius: 10,
    margin: 8,
    width: "40%",
  },

  buttonText: {
    fontSize: 22,
    color: "#588157",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default StartPage;
