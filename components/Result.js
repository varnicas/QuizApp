import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  _View,
  ImageBackground,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { Stars } from "react-native-fiesta";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase";
import { query } from "firebase/database";
const Result = ({ route, navigation }) => {
  const { result } = route.params;
  const [rezultat, setRezultat] = useState(0);
  useEffect(() => {
    //Finding how many results are better than current
    onValue(query(ref(db, "users")), (snapshot) => {
      let user = [];
      snapshot.forEach((child) => {
        if (child.hasChild("score")) {
          user.push(Object.values(child.val().score));
        }
      });

      let counter = 0;
      user.forEach((elem) => {
        for (let i = 0; i < elem.length; i++) {
          if (elem[i] > result) {
            counter++;
          }
        }
      });
      setRezultat(counter);
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/background1.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.main}>
        <Stars spacing="10" />

        <Image
          style={styles.mainImage}
          source={require("../assets/logo2.png")}
        />
        <Text style={styles.title}>Your result</Text>
        <Text style={styles.text}>{JSON.stringify(result)}/10</Text>
        <Text style={styles.text2}>
          {"You achieved " + rezultat + ". result"}
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.buttonText}>Play again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>Logout</Text>
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

  bottomContainer: {
    marginBottom: 10,
  },

  title: {
    fontSize: 50,
    fontWeight: "700",
    color: "#faedcd",
  },

  mainImage: {
    height: 320,
    width: 200,
  },

  text: {
    fontSize: 45,
    fontWeight: "900",
    color: "#faedcd",
    borderBottomColor: "#588157",
    borderBottomWidth: 3,
  },

  text2: {
    fontSize: 30,
    fontWeight: "900",
    color: "#faedcd",
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
    minWidth: "65%",
  },

  buttonText: {
    fontSize: 22,
    color: "#588157",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default Result;
