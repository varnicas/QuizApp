import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  Image,
  BackHandler,
} from "react-native";
import axios from "axios";
import { ref, get, update, push, set } from "firebase/database";
import { useState, useEffect } from "react";
import { db, auth } from "./firebase";

const Game = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true
    );
    return () => backHandler.remove();
  }, []);

  async function fetchQuestions() {
    try {
      const response = await axios.get(
        "https://opentdb.com/api.php?amount=10&category=21"
      );
      setQuestions(response.data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function shuffleAnswers(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  const saveAnswer = (answer) => {
    if (answer == questions[questionIndex].correct_answer) {
      setScore(score + 1);
    }
    setUserAnswer(answer);
    setLocked(true);
    if (questionIndex != questions.length - 1) {
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (questionIndex == questions.length - 1 && userAnswer != null) {
        //saving
        get(ref(db, `users/${auth.currentUser.uid}`))
          .then((snapshot) => {
            let userResults = {};
            userResults[snapshot.val().username] = score;

            if (snapshot.val().score) {
              //only save if this score is not in database
              // if (!Object.values(snapshot.val().score).includes(score)) {
              push(ref(db, `users/${auth.currentUser.uid}/score`), score);
              update(ref(db, "users/scores"), userResults);
              // }
            } else {
              const pushRef = push(ref(db));
              const pushID = pushRef.key;
              let obj = {};
              obj[pushID] = score;
              update(ref(db, `users/${auth.currentUser.uid}/score`), obj);
              get(ref(db, "users/scores")).then((snapshot) => {
                if (!snapshot.exists()) {
                  set(ref(db, "users/scores"), userResults);
                } else {
                  update(ref(db, "users/scores"), userResults);
                }
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });

        navigation.navigate("Result", { result: score });
      }
    }, 1100);
  }, [locked]);

  useEffect(() => {
    setLocked(false);
    setUserAnswer(null);

    if (questions.length != 0) {
      let answers = shuffleAnswers([
        ...questions[questionIndex].incorrect_answers,
        questions[questionIndex].correct_answer,
      ]);
      setShuffledAnswers(answers);
    }
  }, [questionIndex, questions]);

  return loading ? (
    <ImageBackground
      source={require("../assets/background1.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.main}>
        <ActivityIndicator size="large" />
      </View>
    </ImageBackground>
  ) : (
    <ImageBackground
      source={require("../assets/background1.jpg")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.main}>
        <View style={styles.topContainer}>
          <Image
            style={styles.mainImage}
            source={require("../assets/logo2.png")}
          />
          <Text style={styles.text}>Question number</Text>
          <Text style={styles.text}>
            {questionIndex + 1 + " of " + questions.length}
          </Text>
        </View>

        <View style={styles.answersContainer}>
          <Text style={styles.question}>
            {questions[questionIndex].question}
          </Text>
          {shuffledAnswers.map((item) => (
            <TouchableOpacity
              disabled={locked}
              key={item}
              style={[
                styles.button,
                {
                  backgroundColor:
                    userAnswer == item &&
                    userAnswer == questions[questionIndex].correct_answer
                      ? "#06d6a0"
                      : userAnswer == item &&
                        userAnswer != questions[questionIndex].correct_answer
                      ? "#ae2012"
                      : "white",
                },
              ]}
              onPress={() => saveAnswer(item)}
            >
              <Text styles={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.text}>{"Score:" + score}</Text>
        </View>
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

  question: {
    fontSize: 22,
    fontWeight: "800",
    color: "white",
    borderBottomColor: "#588157",
    borderBottomWidth: 2,
  },

  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 50,
  },
  mainImage: {
    height: 200,
    width: 250,
  },

  answersContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },

  text: {
    fontSize: 32,
    fontWeight: "900",
    color: "#faedcd",
    borderBottomColor: "#588157",
    borderBottomWidth: 3,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  button: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    margin: 5,
    minWidth: "70%",
  },

  buttonText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default Game;
