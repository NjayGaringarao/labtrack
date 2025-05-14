import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title?: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isDisabled?: boolean;
  children?: ReactNode;
  isSecondary?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title = "",
  handlePress,
  containerStyles,
  textStyles,
  isDisabled = false,
  isSecondary = false,
  children,
}) => {
  return (
    <View
      className={`${
        isSecondary ? "bg-background border border-uBlack" : "bg-uBlack "
      } h-10 rounded-lg overflow-hidden px-4 ${containerStyles} ${
        isDisabled ? "opacity-50" : "opacity-100"
      }`}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isDisabled}
        className="flex-1 flex-row space-x-2 justify-center items-center"
      >
        {children}
        <Text
          className={`${
            isSecondary ? "text-uBlack" : "text-white"
          } text-center font-semibold text-lg ${textStyles} ${
            title ? "visible" : "hidden"
          }`}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
