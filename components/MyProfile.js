import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { db } from "./firebase";
import { ref, onValue } from "firebase/database";
import { auth, handleSignout } from "./firebase";
import { useState, useEffect } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyProfile = () => {
  const [username, setUsername] = useState("");

  const signOut = () => {
    handleSignout();
  };
  useEffect(() => {
    onValue(
      ref(db, `/users/${auth.currentUser.uid}`),
      (snapshot) => {
        setUsername(snapshot.val().username);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

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
        <Text style={styles.title}>{username}</Text>
        <Text style={styles.icon}>
          <MaterialCommunityIcons
            name="human-greeting-variant"
            size={65}
          ></MaterialCommunityIcons>
        </Text>

        <TouchableOpacity style={styles.button} onPress={signOut}>
          <MaterialCommunityIcons
            name="logout-variant"
            size={45}
          ></MaterialCommunityIcons>
          <Text style={styles.buttonText}>Log out</Text>
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

  mainImage: {
    height: 350,
    width: 250,
  },

  text: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },

  icon: {
    padding: 8,
    marginBottom: 25,
    marginTop: 10,
    color: "#faedcd",
    borderWidth: 2,
    borderColor: "#588157",
    borderRadius: 50,
  },

  title: {
    fontSize: 45,
    color: "#faedcd",
    fontWeight: "bold",
    marginTop: -65,
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  button: {
    alignItems: "center",
    backgroundColor: "#faedcd",
    padding: 7,
    borderRadius: 10,
    margin: 5,
    width: "23%",
    marginBottom: 55,
  },

  buttonText: {
    fontSize: 17,
    color: "#588157",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default MyProfile;
