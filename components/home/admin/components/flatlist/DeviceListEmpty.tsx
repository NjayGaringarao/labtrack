import Button from "@/components/Button";
import React from "react";
import { View, Text } from "react-native";

interface IDeviceListEmpty {
  prompt: string;
  handleQueryDeviceList: () => void;
  handleAddDevice: () => void;
  isLoading: boolean;
}

export function DeviceListEmpty({
  prompt,
  isLoading,
  handleAddDevice,
  handleQueryDeviceList,
}: IDeviceListEmpty) {
  return (
    <>
      <View className="flex-1 items-center justify-center gap-3">
        <Text className="text-xl text-uBlack">{prompt}</Text>
        <View className="flex-row gap-2 items-center">
          <Button
            title="Refresh List"
            handlePress={handleQueryDeviceList}
            isDisabled={isLoading}
          />
          <Text className="text-xl font-semibold text-uBlack">or</Text>
          <Button
            title="Add Device"
            handlePress={handleAddDevice}
            isDisabled={isLoading}
          />
        </View>
      </View>
    </>
  );
}
