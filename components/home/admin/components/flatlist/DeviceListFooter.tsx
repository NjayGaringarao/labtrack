import color from "@/constants/color";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text } from "react-native";

interface IDeviceListFooter {
  handleAddDevice: () => void;
}

export function DeviceListFooter({ handleAddDevice }: IDeviceListFooter) {
  return (
    <TouchableOpacity
      className={`p-4 flex-1 m-2 rounded-lg border border-dashed flex-row gap-2 justify-center`}
      onPress={handleAddDevice}
    >
      <MaterialIcons name="add-circle" size={24} color={color.uBlack} />
      <Text className="text-xl font-semibold text-uBlack">Add New Device</Text>
    </TouchableOpacity>
  );
}
