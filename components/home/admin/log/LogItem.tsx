import { View, Text, TouchableOpacity, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { Log } from "@/services/types/model";
import ProfilePicture from "@/components/ProfilePicture";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import color from "@/constants/color";
import Button from "@/components/Button";

interface ILogItem {
  log: Log;
}

const LogItem = ({ log }: ILogItem) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const _duration =
      (new Date(log.end).getTime() - new Date(log.start).getTime()) / 1000 / 60;
    setDuration(
      `${Math.floor(_duration)} ${
        Math.floor(_duration) > 1 ? "minutes" : "minute"
      }`
    );
  }, [log]);
  return (
    <>
      <View className="p-4 border border-secondary flex-row items-center gap-2">
        {log.user_name ? (
          <ProfilePicture userInfo={log.user} containerStyle="h-11 w-11" />
        ) : (
          <View className="border-4 border-primary rounded-full bg-primary shadow-md shadow-black items-center justify-center w-11 h-11 overflow-hidden">
            <FontAwesome name="user-circle" size={31} color={color.uBlack} />
          </View>
        )}

        <View className="flex-1">
          <Text className="text-lg text-uBlack -mt-1">{log.user_name}</Text>
          <Text className="text-sm text-uGray -mt-1">
            {new Date(log.start).toLocaleDateString()}
            {" at "}
            {new Date(log.start).toLocaleTimeString()}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <MaterialIcons name="info" size={24} color={color.uBlack} />
        </TouchableOpacity>
      </View>

      {isModalVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View className="h-full w-full bg-black opacity-80" />
          <View className="absolute h-full w-full justify-center items-center ">
            <View className="bg-background p-6 rounded-lg w-11/12">
              <View className="flex-row items-center gap-2">
                {log.user_name ? (
                  <ProfilePicture userInfo={log.user} />
                ) : (
                  <View className="border-4 border-primary rounded-full bg-primary shadow-md shadow-black items-center justify-center w-16 h-16 overflow-hidden">
                    <FontAwesome
                      name="user-circle"
                      size={48}
                      color={color.uBlack}
                    />
                  </View>
                )}

                <View className="flex-1">
                  <Text className="text-lg text-uBlack -mt-1">
                    {log.user_name}
                  </Text>
                  <Text className="text-sm text-uGray">
                    {new Date(log.start).toLocaleDateString()}
                  </Text>
                </View>
                <Button handlePress={() => setIsModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color={color.white} />
                </Button>
              </View>

              <Text className="text-lg font-bold text-uBlack mt-4">
                User Information
              </Text>
              <View className="pl-4 text-base text-uBlack">
                <Text>{`identifier:\t\t\t\t${log.user_id}`}</Text>
                <Text>{`Name:\t\t\t\t\t\t\t${log.user_name}`}</Text>
                <Text>{`Role:\t\t\t\t\t\t\t\t${log.user_role}`}</Text>
                <Text>{`Device Alias:\t\t${log.device_alias}`}</Text>
              </View>

              <Text className="text-lg font-bold text-uBlack mt-4">
                Device Information
              </Text>
              <View className="pl-4 text-base text-uBlack">
                <Text>{`Alias:\t\t\t\t\t\t\t\t${log.device_alias}`}</Text>
                <Text>{`Location:\t\t\t\t\t${log.device_location}`}</Text>
              </View>
              <Text className="text-lg font-bold text-uBlack mt-4">
                Session Information
              </Text>
              <View className="pl-4 text-base text-uBlack">
                <Text>{`Start:\t\t\t${new Date(
                  log.start
                ).toLocaleTimeString()}`}</Text>
                <Text>{`End:\t\t\t\t${new Date(
                  log.end
                ).toLocaleTimeString()}`}</Text>
                <Text>{`Duration : ${duration}`}</Text>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default LogItem;
