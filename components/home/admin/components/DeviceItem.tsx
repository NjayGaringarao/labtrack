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
import { confirmAction } from "@/util/common";
import { deleteDevice } from "@/services/device";
import Toast from "react-native-toast-message";

interface IDeviceItem {
  device: Device;
  refreshListHandle: () => Promise<void>;
  setIsLoading: (param: boolean) => void;
  isLoading: boolean;
}

const DeviceItem = ({
  device,
  refreshListHandle,
  isLoading,
  setIsLoading,
}: IDeviceItem) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDelete = async () => {
    try {
      if (
        !(await confirmAction(
          "Confirm Delete",
          "This device will no longer be available in the catalog. Would you like to continue?"
        ))
      ) {
        return;
      }

      setIsLoading(true);
      await deleteDevice(device.id);
      await refreshListHandle();
      Alert.alert(
        "Delete Successful",
        "The device is no longer available to the catalog."
      );
    } catch (error) {
      await refreshListHandle();
      Toast.show({
        type: "error",
        text1: "Failed to Delete",
        text2: `There was an error deleting a device.`,
        visibilityTime: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <View
        className={`p-4 w-[45%] m-2 ${
          device.device_session ? "bg-secondary" : "bg-primary"
        } rounded-lg flex-row items-start justify-between`}
      >
        <View>
          <FontAwesome6
            name={device.location === "HYBRID" ? "laptop" : "computer"}
            size={38}
            color={color.background}
          />
          <Text className="text-lg text-white font-medium">{device.alias}</Text>
        </View>

        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <SimpleLineIcons name="options" size={16} color={color.white} />
        </TouchableOpacity>
      </View>

      {isModalVisible && (
        <Modal
          visible={true}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
          <>
            <View className="absolute h-full w-full bg-black opacity-80" />
            <View className="h-full w-full justify-end">
              <View className="bg-background p-4 rounded-t-lg w-full">
                {/** Header */}
                <View className="flex-row justify-between">
                  <Text className="text-2xl font-bold mb-4">
                    Device Information
                  </Text>
                  <Button handlePress={() => setIsModalVisible(false)}>
                    <Entypo name="cross" size={25} color={color.white} />
                  </Button>
                </View>
                {/** Content */}
                <View className=" w-full flex-row items-end gap-2">
                  <FontAwesome6
                    name={device.location === "HYBRID" ? "laptop" : "computer"}
                    size={128}
                    color={color.primary}
                  />
                  <View className="flex-1 mb-2">
                    <Text className="text-2xl text-primary font-medium">
                      {device.alias}
                    </Text>
                    <Text className="text-base text-uGray font-medium">
                      @
                      {device.location === "HYBRID"
                        ? "Hybrid Room"
                        : "Computer Laboratory"}
                    </Text>
                    <Text className="text-base text-uGray font-medium -mt-1">
                      Listed : {device.created_at.toLocaleDateString()}
                    </Text>
                  </View>
                </View>

                <View className="w-full items-end">
                  <Button
                    title="Delete"
                    handlePress={handleDelete}
                    containerStyles="w-24"
                    textStyles="text-red-400"
                  />
                </View>
              </View>
            </View>
          </>
        </Modal>
      )}
    </>
  );
};

export default DeviceItem;
