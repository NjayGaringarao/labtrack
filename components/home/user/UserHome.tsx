import { View, Text } from "react-native";
import React from "react";
import ProfilePicture from "../../ProfilePicture";
import { useGlobalContext } from "@/context/GlobalProvider";
import LogDevice from "./LogDevice";
import Timer from "./Timer";
import Toast from "react-native-toast-message";
import Button from "@/components/Button";
import { FontAwesome } from "@expo/vector-icons";

const UserHome = () => {
  const { userInfo, refreshUserRecord } = useGlobalContext();

  const refreshHandle = async () => {
    try {
      refreshUserRecord({ info: true });
    } catch {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "There was an error refreshing this page.",
        visibilityTime: 5000,
      });
    }
  };
  return (
    <View className="flex-1 m-4 gap-4">
      <View className="flex-row gap-2 items-center">
        <ProfilePicture userInfo={userInfo} />
        <View className="flex-1">
          <Text
            className="text-xl font-semibold text-uGray"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {`${userInfo.name[0]} ${userInfo.name[2]} `}
          </Text>
          <Text className="text-sm font-medium">{userInfo.id}</Text>
        </View>
        <View className="items-end">
          <Button handlePress={refreshHandle}>
            <FontAwesome name="refresh" size={24} color="white" />
          </Button>
        </View>
      </View>
      <View className="w-full my-8">
        <Text className="text-5xl text-gray-800 font-semibold">WELCOME</Text>
        <Text className="text-5xl text-gray-800 font-semibold">RAMONIAN!</Text>
        <Text className="text-lg text-gray-600" style={{ lineHeight: 20 }}>
          Hello {userInfo.name[0]}, welcome! You are required use this app to
          record your desktop/laptop usage, helping both of us to efficiently
          track and manage resource utilization.
        </Text>
      </View>

      {userInfo.device_session ? <Timer /> : <LogDevice />}
    </View>
  );
};

export default UserHome;
