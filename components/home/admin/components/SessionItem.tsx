import { ModalSessionInfo } from "./ModalSessionInfo";
import { View, Text, Modal, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Session } from "@/services/types/model";
import ProfilePicture from "@/components/ProfilePicture";
import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import Button from "@/components/Button";
import color from "@/constants/color";
import { confirmAction } from "@/util/common";
import { deleteSession } from "@/services/logging";
import { useGlobalContext } from "@/context/GlobalProvider";
import Toast from "react-native-toast-message";

interface ISessionItem {
  session: Session;
  handleRefreshSessionList: () => Promise<void>;
}

const SessionItem = ({ session, handleRefreshSessionList }: ISessionItem) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLogout = async () => {
    try {
      if (
        !(await confirmAction(
          "Confirm Logout",
          "This device will be available to others upon logout. Do you want to continue?"
        ))
      ) {
        return;
      }

      setIsLoading(true);
      await deleteSession(session.id);
      await handleRefreshSessionList();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to Logout",
        text2: `There was an error Deleting this session`,
        visibilityTime: 5000,
      });
    } finally {
      await handleRefreshSessionList();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const startTime = new Date(session.created_at).getTime();
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      setElapsedTime(Math.floor((currentTime - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [session]);
  return (
    <>
      <View className="w-full p-4 bg-secondary rounded-lg gap-4">
        <View className=" flex-row justify-around items-center">
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
                  session?.device?.location === "HYBRID" ? "laptop" : "computer"
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
        <View className="justify-between items-center flex-row border-t border-uGray pt-4">
          <Text className="text-white text-xl">
            Session Time: {formatTime(elapsedTime)}
          </Text>
          <View className="flex-row gap-2">
            <Button handlePress={() => setIsModalVisible(true)}>
              <FontAwesome
                name="info-circle"
                size={20}
                color={color.uGrayLight}
              />
            </Button>
            <Button handlePress={handleLogout} isDisabled={isLoading}>
              <FontAwesome
                name="power-off"
                size={20}
                color={color.uGrayLight}
              />
            </Button>
          </View>
        </View>
      </View>

      {isModalVisible && (
        <ModalSessionInfo
          setIsModalVisible={setIsModalVisible}
          session={session}
        />
      )}
    </>
  );
};

export default SessionItem;
