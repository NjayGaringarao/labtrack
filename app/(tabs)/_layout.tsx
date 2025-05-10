import color from "@/constants/color";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text } from "react-native";

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
              <View className="items-center w-20">
                <MaterialIcons
                  name={"monitor"}
                  size={36}
                  color={focused ? color.background : color.uBlack}
                />
                <Text
                  className={`text-base font-semibold ${
                    focused ? "text-background" : "text-uBlack"
                  }`}
                >
                  Home
                </Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="me"
          options={{
            title: "Me",
            tabBarIcon: ({ focused }) => (
              <View className="items-center w-20">
                <FontAwesome
                  name={"user-circle-o"}
                  size={36}
                  color={focused ? color.background : color.uBlack}
                />
                <Text
                  className={`text-base font-semibold ${
                    focused ? "text-background" : "text-uBlack"
                  }`}
                >
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor={color.primary} style="auto" />
    </>
  );
};

export default layout;
