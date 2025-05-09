import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  title?: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isDisabled?: boolean;
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title = "",
  handlePress,
  containerStyles,
  textStyles,
  isDisabled = false,
  children,
}) => {
  return (
    <View
      className={`h-10 bg-uBlack rounded-lg overflow-hidden px-4 ${containerStyles} ${
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
          className={`text-white text-center font-semibold text-lg ${textStyles} ${
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
