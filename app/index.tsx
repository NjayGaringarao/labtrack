import { router } from "expo-router";
import { Text, View, Image } from "react-native";
import image from "@/constants/image";
import Button from "@/components/Button";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center bg-background ">
      <View className="flex-1 w-full items-center justify-center mt-8">
        <View className="w-full items-center justify-center gap-8">
          <Image
            source={image.labtrack_brand}
            className="w-11/12 h-auto max-h-32 bg-secondary rounded-lg"
            resizeMode="contain"
          />
          <Button
            title="Get Started"
            containerStyles="h-12 w-11/12"
            handlePress={() => router.navigate("/(auth)/sign_in")}
          />
        </View>
      </View>
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
}
