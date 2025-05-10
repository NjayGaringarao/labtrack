import { View, Text } from "react-native";
import React from "react";
import { UserInfo } from "@/services/types/model";
import { useEffect, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import Button from "@/components/Button";
import { confirmAction } from "@/util/common";

interface ITimer {
  userInfo: UserInfo;
}
const Timer = ({ userInfo }: ITimer) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!userInfo.device_session) return;
    const startTime = new Date(userInfo.device_session.created_at).getTime();
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const offsetTime = currentTime + 8 * 60 * 60 * 1000;
      setElapsedTime(Math.floor((offsetTime - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [userInfo.device_session]);

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
      }
    } catch (error) {}
  };

  return (
    <View className="flex-1 gap-4">
      <Text className="text-2xl font-medium">Currently Utilizing:</Text>
      <View className="bg-primary p-4 rounded-xl">
        <View className="flex-row items-center justify-between gap-2">
          <View className="flex-row items-center gap-2">
            <FontAwesome6
              name={
                userInfo.device_session?.device.location === "HYBRID"
                  ? "laptop"
                  : "computer"
              }
              size={48}
              color="white"
            />
            <Text className="text-3xl text-white">
              {userInfo.device_session?.device?.alias}
            </Text>
          </View>
          <Button containerStyles="bg-pirmary" handlePress={handleLogout}>
            <FontAwesome6 name="power-off" size={24} color="white" />
          </Button>
        </View>
        <View className="w-full items-center py-4">
          <Text className="text-background text-6xl">
            {formatTime(elapsedTime)}
          </Text>
          <Text className="text-secondary -mb-4">Session Time</Text>
        </View>
      </View>
    </View>
  );
};

export default Timer;
