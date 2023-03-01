import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { handleSignUp } from "./firebase";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSign = () => {
    if (username === "") {
      Alert.alert("Invalid input", "You cant leave username field empty", [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    } else if (email === "") {
      Alert.alert("Invalid input", "You cant leave email field empty", [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    } else if (password === "") {
      Alert.alert("Invalid input", "You cant leave password field empty", [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    } else {
      handleSignUp(email, password, username);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background1.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.main}>
        <Text style={styles.text}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#fff"
          onChangeText={(text) => setUsername(text)}
        />
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
            handleSign();
          }}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
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

export default SignUp;
