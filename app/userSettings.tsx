import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Personal from "@/components/settings/Personal";
import Role from "@/components/settings/Role";
import LoginCredentials from "@/components/settings/LoginCredentials";
import DeleteAccount from "@/components/settings/DeleteAccount";
import Button from "@/components/Button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const userSettings = () => {
  return (
    <View className="flex-1">
      {/* Header */}
      <View className="h-16 w-full flex-row items-center bg-primary pr-4">
        <TouchableOpacity className="px-4 py-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </TouchableOpacity>

        <View>
          <Text className="text-2xl font-bold text-white">
            Account Settings
          </Text>
        </View>
      </View>
      <ScrollView
        className="flex-1 px-2 py-4 bg-background"
        contentContainerStyle={{
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <Personal />
        <Role />
        <LoginCredentials />
        <View className="w-full mb-8">
          <DeleteAccount />
        </View>
      </ScrollView>
    </View>
  );
};

export default userSettings;
