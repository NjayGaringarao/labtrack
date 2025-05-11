import Button from "@/components/Button";
import ProfilePicture from "@/components/ProfilePicture";
import color from "@/constants/color";
import { Session } from "@/services/types/model";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { Modal, View, Text } from "react-native";

interface IModalSessionInfo {
  session: Session;
  setIsModalVisible: (param: boolean) => void;
}
export function ModalSessionInfo({
  setIsModalVisible,
  session,
}: IModalSessionInfo) {
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <>
        <View className="absolute h-full w-full bg-black opacity-80" />
        <View className="h-full w-full justify-end">
          <View className="bg-gray-100 p-6 rounded-t-lg w-full">
            <View className="flex-row justify-between pb-2">
              <Text className="text-2xl font-bold mb-4">Session Details</Text>
              <Button handlePress={() => setIsModalVisible(false)}>
                <Entypo name="cross" size={25} color={color.white} />
              </Button>
            </View>
            <View className=" flex-row justify-around items-center border border-secondary py-2 rounded-lg">
              {session.user && (
                <View className="items-center">
                  <ProfilePicture
                    userInfo={session.user}
                    containerStyle="h-24 w-24 rounded-lg"
                  />
                </View>
              )}
              <Entypo name="cross" size={48} color="black" />
              {session.device && (
                <View className="items-center bg-primary rounded-lg p-2">
                  <FontAwesome6
                    name={
                      session?.device?.location === "HYBRID"
                        ? "laptop"
                        : "computer"
                    }
                    size={42}
                    color="white"
                  />
                  <Text className="text-lg text-white">
                    {session?.device?.alias}
                  </Text>
                </View>
              )}
            </View>
            <Text className="text-xl mt-2 font-medium text-uBlack">
              User Information
            </Text>

            {session.user && (
              <View className="ml-8">
                <Text className="mb-2">
                  User Name: {session.user.name.join(" ")}
                </Text>
                {session.user.dep_prog && (
                  <Text className="mb-2">
                    Department/Program: {session.user.dep_prog}
                  </Text>
                )}
                {session.user.year_level && (
                  <Text className="mb-2">
                    Year Level: {session.user.year_level}
                  </Text>
                )}
              </View>
            )}
            <Text className="text-xl mt-2 font-medium text-uBlack">
              Device Information
            </Text>
            {session.device && (
              <View className="ml-8">
                <Text className="mb-2">
                  Device Alias: {session.device.alias}
                </Text>
                <Text className="mb-2">
                  Location:{" "}
                  {session.device.location == "HYBRID"
                    ? "Hybrid Room"
                    : "Computer Laboratory"}
                </Text>
              </View>
            )}
            <Text className="text-xl mt-2 font-medium text-uBlack">
              Time Started: {new Date(session.created_at).toLocaleString()}
            </Text>
          </View>
        </View>
      </>
    </Modal>
  );
}
