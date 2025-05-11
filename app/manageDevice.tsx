import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const manageDevice = () => {
  return (
    <View className="flex-1">
      {/* Header */}
      <View className="h-16 w-full flex-row items-center bg-primary pr-4">
        <TouchableOpacity className="px-4 py-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </TouchableOpacity>

        <View>
          <Text className="text-2xl font-bold text-white">Manage Devices</Text>
        </View>
      </View>
    </View>
  );
};

export default manageDevice;
