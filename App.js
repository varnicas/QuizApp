import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartPage from "./components/StartPage";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import { useState, useEffect } from "react";
import { auth } from "./components/firebase";
import StartGame from "./components/StartGame";
import Game from "./components/Game";
import BottomTab from "./components/BottomTab";
import MyProfile from "./components/MyProfile";
import Result from "./components/Result";
import MyResults from "./components/MyResults";
import Users from "./components/Users";
const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Tab"
              component={BottomTab}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="StartGame"
              component={StartGame}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Game"
              component={Game}
              options={{ headerShown: false, gestureEnabled: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Result"
              component={Result}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Profile"
              component={MyProfile}
              options={{
                title: "Back",
                headerTintColor: "#faedcd",
                headerTitleStyle: {
                  color: "#faedcd",
                },
                headerStyle: {
                  backgroundColor: "#588157",
                },
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="MyResults"
              component={MyResults}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Users"
              component={Users}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="StartPage"
              component={StartPage}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="LogIn"
              component={LogIn}
              options={{
                title: "Back",
                headerTintColor: "#faedcd",
                headerTitleStyle: {
                  color: "#faedcd",
                },
                headerStyle: {
                  backgroundColor: "#588157",
                  color: "#faedcd",
                },
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: "Back",
                headerTintColor: "#faedcd",
                headerTitleStyle: {
                  color: "#faedcd",
                },
                headerStyle: {
                  backgroundColor: "#588157",
                },
              }}
            ></Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
