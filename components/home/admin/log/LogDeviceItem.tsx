import { ModalDeviceLogList } from "./ModalDeviceLogList";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import React, { useState } from "react";
import { Device } from "@/services/types/model";
import {
  Entypo,
  FontAwesome6,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import color from "@/constants/color";
import Button from "@/components/Button";

interface IDeviceItem {
  device: Device;
  isLoading: boolean;
}

const LogDeviceItem = ({ device, isLoading }: IDeviceItem) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        className={`p-4 w-[45%] m-2 ${
          device.device_session ? "bg-secondary" : "bg-primary"
        } rounded-lg flex-row items-start justify-between ${
          isLoading ? "opacity-80" : ""
        }`}
        disabled={isLoading}
      >
        <View>
          <FontAwesome6
            name={device.location === "HYBRID" ? "laptop" : "computer"}
            size={38}
            color={color.background}
          />
          <Text className="text-lg text-white font-medium">{device.alias}</Text>
        </View>
        <MaterialIcons name="history" size={24} color="white" />
      </TouchableOpacity>

      {isModalVisible && (
        <ModalDeviceLogList
          device={device}
          setIsModalVisible={setIsModalVisible}
        />
      )}
    </>
  );
};

export default LogDeviceItem;
