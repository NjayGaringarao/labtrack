import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Button from "./Button";
import TextBox from "./TextBox";
import image from "@/constants/image";
import { signIn } from "@/services/auth";
import { useGlobalContext } from "@/context/GlobalProvider";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { regex } from "@/constants/regex";

const LoginForm = () => {
  const { initializeGlobalState } = useGlobalContext();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUpHandle = async () => {
    try {
      setIsSubmitting(true);

      await signIn(identifier, password, initializeGlobalState);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: `${error}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="flex-1 w-11/12 items-center justify-center mt-8">
      <View className="w-full items-center justify-center gap-4">
        <View className="w-full flex-row gap-2 items-center mb-4">
          <View className="w-16 h-16 bg-secondary rounded-lg p-2">
            <Image source={image.labrack} className="w-full h-full" />
          </View>
          <Text className="w-full text-6xl font-bold text-uBlack mt-2 flex-1">
            Sign In
          </Text>
        </View>

        <TextBox
          title="Student ID / Employee ID"
          textValue={identifier}
          handleChangeText={(e) => setIdentifier(e)}
          placeholder="xx-x-x-xxxx"
          containerStyles="w-full"
        />
        <TextBox
          title="Password"
          textValue={password}
          handleChangeText={(e) => setPassword(e)}
          placeholder="Labtrack@Now"
          containerStyles="w-full"
          isPassword
        />

        <Button
          title="Continue"
          containerStyles="h-12 w-full mt-4"
          handlePress={signUpHandle}
          isDisabled={
            isSubmitting ||
            regex.password.test(password) ||
            identifier.length < 10
          }
        />
        <Text
          className="text-lg font-semibold text-uBlack -mt-1 underline"
          onPress={() => router.replace("/(auth)/sign_up")}
        >
          No Account? Create One!
        </Text>
      </View>
    </View>
  );
};

export default LoginForm;
