import react, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  _View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { onValue, ref } from "firebase/database";
import { db, auth } from "./firebase";

import { query, orderByValue } from "firebase/database";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyResults = () => {
  const [scores, setScores] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    onValue(
      query(
        ref(db, `users/${auth.currentUser.uid}/score`),
        orderByValue("$id")
      ),
      (snapshot) => {
        if (snapshot.hasChildren()) {
          setScores(Object.values(snapshot.val()).sort((a, b) => b - a));
        }
      },
      (error) => {
        console.log(error);
      }
    );
    onValue(ref(db, `/users/${auth.currentUser.uid}`), (snapshot) => {
      if (snapshot.hasChild("username")) {
        setUsername(snapshot.val().username);
      }
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/background1.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>My results</Text>
        <Text style={styles.user}>{username}</Text>
        <ScrollView style={styles.scrollView}>
          {scores.length == 0 ? (
            <View style={styles.noResult}>
              <Text style={styles.text}>
                You don't have any results, play first
              </Text>
            </View>
          ) : (
            scores?.map((item, index) => (
              <View style={styles.row}>
                <Text style={styles.number} key={item}>
                  {index == 0 ? (
                    <MaterialCommunityIcons name="medal" style={styles.first} />
                  ) : index == 1 ? (
                    <MaterialCommunityIcons
                      name="medal"
                      style={styles.second}
                    />
                  ) : index == 2 ? (
                    <MaterialCommunityIcons name="medal" style={styles.third} />
                  ) : (
                    index + 1 + "."
                  )}
                </Text>
                {index == 0 ? (
                  <Text style={styles.firstNumber}>{item + ` points`}</Text>
                ) : index == 1 ? (
                  <Text style={styles.secondNumber}>{item + ` points`}</Text>
                ) : index == 2 ? (
                  <Text style={styles.thirdNumber}>{item + ` points`}</Text>
                ) : (
                  <Text style={styles.score}>{item + ` points`}</Text>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>
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

  noResult: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollView: {
    width: "100%",
  },

  first: {
    color: "#ffc300",
    fontSize: 27,
    fontWeight: "600",
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  firstNumber: {
    color: "#ffc300",
    fontSize: 30,
    fontWeight: "900",
    padding: 10,
  },
  second: {
    color: "#dee2e6",
    fontSize: 27,
    fontWeight: "600",
  },
  secondNumber: {
    color: "#dee2e6",
    fontSize: 30,
    fontWeight: "900",
    padding: 10,
  },
  third: { color: "#d8832f", fontSize: 27, fontWeight: "600" },
  thirdNumber: {
    color: "#d8832f",
    fontSize: 30,
    fontWeight: "900",
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    margin: 3,
    padding: 3,
    borderColor: "white",
    borderBottomWidth: 1,
  },

  number: {
    color: "#faedcd",
    fontSize: 30,
    fontWeight: "600",
    padding: 10,
    marginRight: 60,
  },

  score: {
    color: "#faedcd",
    fontSize: 30,
    fontWeight: "400",
    padding: 10,
  },

  title: {
    fontSize: 50,
    fontWeight: "700",
    color: "#faedcd",
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderColor: "#588157",
    marginTop: 15,
    padding: 6,
  },

  user: {
    fontSize: 45,
    fontWeight: "700",
    color: "#faedcd",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#588157",
  },

  text: {
    fontSize: 30,
    fontWeight: "900",
    color: "#d00000",
    marginTop: 35,
  },
});

export default MyResults;
