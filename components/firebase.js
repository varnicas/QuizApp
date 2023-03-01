import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import { Alert } from "react-native";
import { KEY, URL } from "@env";
const firebaseConfig = {
  apiKey: KEY,
  authDomain: "quizapp-67a14.firebaseapp.com",
  projectId: "quizapp-67a14",
  storageBucket: "quizapp-67a14.appspot.com",
  messagingSenderId: "74970529498",
  appId: "1:74970529498:web:34e52961cc88e53f35efe3",
  databaseURL: URL,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const db = getDatabase(app);

export { auth };

// signup function
export const handleSignUp = (email, password, name) => {
  get(ref(db, "users"))
    .then((snapshot) => {
      snapshot.forEach((userData) => {
        if (userData.val().username == name) {
          throw Error;
        }
      });
    })
    .then(() => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //write to db
          set(ref(db, "users/" + user.uid), {
            username: name,
            email: user.email,
          });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert("Invalid email", "Email is already in use", [
              {
                text: "Try again",
                style: "cancel",
              },
            ]);
          }
          if (error.code === "auth/invalid-email") {
            Alert.alert("Invalid email", "Your email is invalid", [
              {
                text: "Try again",
                style: "cancel",
              },
            ]);
          }
        });
    })
    .catch((error) => {
      console.log(error);
      Alert.alert("Invalid username", "Username is already in use", [
        {
          text: "Try again",
          style: "cancel",
        },
      ]);
    });
};

// sign in function
export const handleSignIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (error.code === "auth/invalid-email") {
        Alert.alert("Invalid email", "Your email is invalid", [
          {
            text: "Try again",
            style: "cancel",
          },
        ]);
      }
      if (error.code === "auth/wrong-password") {
        Alert.alert("Incorrect password", "Your password is incorrect", [
          {
            text: "Try again",
            style: "cancel",
          },
        ]);
      }
    });
};

//sign out function
export const handleSignout = () => {
  signOut(auth)
    .then(() => {
      console.log("signout");
    })
    .catch((error) => {
      console.log("error");
    });
};
