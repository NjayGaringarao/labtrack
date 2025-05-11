import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ProfilePicture from "@/components/ProfilePicture";
import { useGlobalContext } from "@/context/GlobalProvider";
import Button from "@/components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

const AdminHome = () => {
  const { userInfo, refreshUserRecord } = useGlobalContext();
  return (
    <View className="flex-1 p-4">
      <View className="flex-row gap-2 items-center">
        <ProfilePicture userInfo={userInfo} />
        <View className="gap-0">
          <Text
            className="text-2xl font-semibold text-uGray"
            adjustsFontSizeToFit
            numberOfLines={1}
          >
            {`${userInfo.name[0].toUpperCase()} ${userInfo.name[2].toUpperCase()} `}
          </Text>
          <Text className="text-sm font-medium">{userInfo.id}</Text>
        </View>
        <View className="flex-1 items-end">
          <Button handlePress={() => refreshUserRecord({ info: true })}>
            <FontAwesome name="refresh" size={24} color="white" />
          </Button>
        </View>
      </View>
      <View className="w-full my-8">
        <Text className="text-6xl text-gray-800 font-semibold">HELLO</Text>
        <Text className="text-6xl text-gray-800 font-semibold">ADMIN!</Text>
        <Text className="text-lg text-gray-600" style={{ lineHeight: 20 }}>
          Hello {userInfo.name[0]}, welcome! This app will help you monitor,
          manage and track the usage of the computer devices on both Hybrid Room
          and Computer Laboratory..
        </Text>
      </View>
      <View className="flex-1 gap-4">
        <Text className="text-2xl font-medium">Menu</Text>

        {/** View active session */}
        <TouchableOpacity
          onPress={() => {
            router.push("/manageSession");
          }}
          className="flex-1 bg-primary rounded-xl flex-row p-2 gap-2"
        >
          <View className="flex-1 bg-white rounded-lg items-center justify-center">
            <Text className="text-primary font-semibold text-2xl">SESSION</Text>
          </View>
          <View className="w-32 items-center justify-center">
            <Text className="text-xl font-normal text-white">
              View Active Session
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/manageDevice");
          }}
          className="flex-1 bg-primary rounded-xl flex-row p-2 gap-2"
        >
          <View className="w-32 items-center justify-center">
            <Text className="text-xl font-normal text-white">
              Manage Devices
            </Text>
          </View>
          <View className="flex-1 bg-white rounded-lg items-center justify-center">
            <Text className="text-primary font-semibold text-2xl">DEVICE</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("/viewLogs");
          }}
          className="flex-1 bg-primary rounded-xl flex-row p-2 gap-2"
        >
          <View className="flex-1 bg-white rounded-lg items-center justify-center">
            <Text className="text-primary font-semibold text-2xl">LOGS</Text>
          </View>
          <View className="w-32 items-center justify-center">
            <Text className="text-xl font-normal text-white">
              View Usage History
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminHome;
