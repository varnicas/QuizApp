import { useState, useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "./firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { query } from "firebase/database";
import {
  StyleSheet,
  Text,
  View,
  _View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from "react-native";

const Users = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    //Highscore of every user
    onValue(query(ref(db, "users")), (snapshot) => {
      let user = [];
      snapshot.forEach((child) => {
        if (child.hasChild("score")) {
          let scores = Object.values(child.val().score);
          let score = Math.max.apply(Math, scores);

          let user1 = {
            user: child.val().username,
            score: score,
          };

          user.push(user1);
        }
      });
      user.sort((a, b) => b.score - a.score);
      setUsers(user);
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/background1.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <SafeAreaView style={styles.main}>
        <Text style={styles.title}>Leaderboard</Text>

        <ScrollView style={styles.scrollView}>
          {users?.map((item, index) => (
            <View style={styles.row}>
              <Text style={styles.number} key={item}>
                {index == 0 ? (
                  <MaterialCommunityIcons name="medal" style={styles.first} />
                ) : index == 1 ? (
                  <MaterialCommunityIcons name="medal" style={styles.second} />
                ) : index == 2 ? (
                  <MaterialCommunityIcons name="medal" style={styles.third} />
                ) : (
                  index + 1 + "."
                )}
              </Text>
              {index == 0 ? (
                <Text style={styles.firstNumber}>
                  {item.user + " - " + item.score}
                </Text>
              ) : index == 1 ? (
                <Text style={styles.secondNumber}>
                  {item.user + " - " + item.score}
                </Text>
              ) : index == 2 ? (
                <Text style={styles.thirdNumber}>
                  {item.user + " - " + item.score}
                </Text>
              ) : (
                <Text style={styles.score}>
                  {item.user + " - " + item.score}
                </Text>
              )}
            </View>
          ))}
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

  text: {
    fontSize: 30,
    fontWeight: "900",
    color: "#d00000",
    marginTop: 35,
  },
});

export default Users;
