import SignUpForm from "@/components/sign-up/SignUpForm";
import image from "@/constants/image";
import React from "react";
import { Text, View, Image } from "react-native";

const sign_up = () => {
  return (
    <View className="flex-1 justify-center items-center bg-background ">
      <SignUpForm />

      <View className="flex w-full p-4 bg-primary flex-row items-center gap-2">
        <Image source={image.prmsu} className="w-14 h-14" />
        <Image source={image.ccit} className="w-14 h-14" />
        <Text className="flex-1 text-background text-left flex-wrap">
          LABTRACK is a Computer Unit Reservation System of PRMSU - Castillejos
          Campus
        </Text>
      </View>
    </View>
  );
};

export default sign_up;
