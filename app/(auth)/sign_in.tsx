import React from "react";
import { Text, View, Image } from "react-native";
import image from "@/constants/image";
import SignInForm from "@/components/SignInForm";

const sign_in = () => {
  return (
    <View className="flex-1 justify-center items-center bg-background ">
      <SignInForm />

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

export default sign_in;
