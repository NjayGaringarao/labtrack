// components/signupSteps/FaceRegistrationForm.tsx
import React from "react";
import { Text, View } from "react-native";
import Button from "../Button";

interface IFaceRegistrationForm {
  onBack: () => void;
  onNext: () => void;
}

const FaceRegistrationForm = ({ onBack, onNext }: IFaceRegistrationForm) => {
  return (
    <>
      <View className="w-full h-96 bg-black rounded-md"></View>
      <View className="flex-row justify-center gap-4 mt-6">
        <Button
          title="Back"
          handlePress={() => onBack()}
          containerStyles="flex-1"
        />

        <Button
          title="Next"
          handlePress={() => onNext()}
          containerStyles="flex-1"
        />
      </View>
    </>
  );
};

export default FaceRegistrationForm;
