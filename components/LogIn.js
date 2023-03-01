import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  _View,
  ImageBackground,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { handleSignIn } from "./firebase";

const LogIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLog = () => {
    if (email === "") {
      Alert.alert("Insert email", "You cant leave email field empty", [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    } else if (password === "") {
      Alert.alert("Insert password", "You cant leave password field empty", [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    } else {
      handleSignIn(email, password);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background1.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.main}>
        <Text style={styles.text}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fff"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleLog();
          }}
        >
          <Text style={styles.buttonText}>Log In</Text>
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

  text: {
    fontSize: 50,
    fontWeight: "700",
    color: "#faedcd",
    borderBottomColor: "#588157",
    borderBottomWidth: 1,
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
    margin: 5,
    width: "40%",
  },

  input: {
    width: "65%",
    padding: 10,
    margin: 12,
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "#fff",
    fontSize: 17,
  },

  buttonText: {
    fontSize: 22,
    color: "#588157",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default LogIn;
