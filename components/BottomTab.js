import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import MyProfile from "./MyProfile";
import StartGame from "./StartGame";
import MyResults from "./MyResults";
import Users from "./Users";
const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: "#588157",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: {
          margin: 2,
        },
        tabBarStyle: {
          position: "relative",
          backgroundColor: "#faedcd",
          height: 50,
        },
        tabBarLabelPosition: "below-icon",
      }}
    >
      <Tab.Screen
        name="Play"
        component={StartGame}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="flag-checkered"
                size={size}
                color="black"
              ></MaterialCommunityIcons>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="My Results"
        component={MyResults}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="chart-box-outline"
                size={size}
                color="black"
              ></MaterialCommunityIcons>
            );
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Leaderboard"
        component={Users}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return <Entypo name="users" size={size} color="black"></Entypo>;
          },
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Logout"
        component={MyProfile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="logout-variant"
                size={size}
                color="black"
              ></MaterialCommunityIcons>
            );
          },
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTab;
