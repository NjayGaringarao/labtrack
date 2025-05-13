import { View } from "react-native";

export const FaceGuideOverlay = () => {
  return (
    <View className="absolute top-0 left-0 w-full h-full justify-center items-center pointer-events-none">
      <View className="h-56 w-48 rounded-full border-8 border-white/70" />
    </View>
  );
};
