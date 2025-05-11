import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Device } from "@/services/types/model";
import { FontAwesome6 } from "@expo/vector-icons";
import { confirmAction } from "@/util/common";
import Toast from "react-native-toast-message";
import { createSession } from "@/services/logging";
import { useGlobalContext } from "@/context/GlobalProvider";
import color from "@/constants/color";
import { getDevice } from "@/services/device";

interface IItemDevice {
  device: Device;
  handleRefreshList: () => void;
  isLoading: boolean;
  setIsLoading: (param: boolean) => void;
  onRequestClose: () => void;
}
const ItemDevice = ({
  device,
  handleRefreshList,
  isLoading,
  setIsLoading,
  onRequestClose,
}: IItemDevice) => {
  const { userInfo, refreshUserRecord } = useGlobalContext();
  const handlePress = async () => {
    if (
      !(await confirmAction(
        `Confirm Using ${device.alias}`,
        "We will check if someone logged to this device before you. If none, you are immediately logged in. Do you want to continue?"
      ))
    ) {
      return;
    }

    try {
      setIsLoading(true);

      const thisDevice = await getDevice(device.id);

      if (thisDevice.device_session) {
        handleRefreshList();
        Toast.show({
          type: "error",
          text1: "Device Already Occupied",
          text2: `Please look for other device to log into.`,
          visibilityTime: 5000,
        });
      } else {
        await createSession(userInfo.id, device.id);
        await refreshUserRecord({ info: true });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to Log into Device",
        text2: `${error}`,
        visibilityTime: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <TouchableOpacity
      className={`p-4 w-[45%] m-2 ${
        device.device_session ? "bg-secondary" : "bg-primary"
      } rounded-lg`}
      onPress={handlePress}
    >
      <View className="flex-row items-start justify-between">
        <View>
          <FontAwesome6
            name={device.location === "HYBRID" ? "laptop" : "computer"}
            size={38}
            color={color.background}
          />
          <Text className="text-lg text-white font-medium">{device.alias}</Text>
        </View>
        <View
          className={`h-3 w-3 rounded-full ${
            device.device_session ? "bg-gray-600" : "bg-green-300"
          }`}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ItemDevice;
