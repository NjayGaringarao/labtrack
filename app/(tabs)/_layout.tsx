import color from "@/constants/color";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: color.primary,
            height: 64,
          },
          tabBarShowLabel: false,
          tabBarIconStyle: {
            height: 42,
            width: 42,
            margin: 8,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                size={36}
                color={color.secondary}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="me"
          options={{
            title: "Me",
            tabBarIcon: ({ focused }) => (
              <FontAwesome5
                name={focused ? "user-alt" : "user"}
                size={36}
                color={color.secondary}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor={color.primary} style="auto" />
    </>
  );
};

export default layout;
