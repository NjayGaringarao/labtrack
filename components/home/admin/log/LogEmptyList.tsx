import { View, Text } from "react-native";
import React from "react";

const LogEmptyList = () => {
  return (
    <View className="h-96 w-full justify-center items-center">
      <Text className="text-xl text-primary mt-4">No recorded log</Text>
    </View>
  );
};

export default LogEmptyList;
