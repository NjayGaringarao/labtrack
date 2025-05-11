import { View, Text, Modal, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { Device } from "@/services/types/model";
import { getDevices } from "@/services/device";
import Toast from "react-native-toast-message";
import ItemDevice from "./ItemDevice";
import { FontAwesome } from "@expo/vector-icons";
import color from "@/constants/color";

interface IModalDevices {
  onRequestClose: () => void;
  onSuccess: () => void;
  room?: "HYBRID" | "COMLAB";
}

const ModalDevices = ({ onRequestClose, onSuccess, room }: IModalDevices) => {
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const queryDeviceList = async () => {
    try {
      setIsLoading(true);
      setDeviceList(await getDevices(room));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to Load Device List",
        text2: `${error}`,
        visibilityTime: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    queryDeviceList();
  }, [room]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onRequestClose}
    >
      <>
        <View className="absolute h-full w-full bg-black opacity-80" />
        <View className="h-full w-full justify-end">
          <View className="rounded-t-xl bg-background p-4 min-h-[25rem] max-h-[45rem] gap-4">
            <View className="w-full flex-row justify-between">
              <Text className="text-2xl font-semibold">{`Choose ${
                room == "HYBRID" ? "Laptop" : "Computer System"
              } :`}</Text>
              <View className="flex-row gap-1">
                <Button handlePress={queryDeviceList}>
                  <FontAwesome name="refresh" size={24} color={color.white} />
                </Button>
                <Button handlePress={onRequestClose}>
                  <FontAwesome name="close" size={24} color={color.white} />
                </Button>
              </View>
            </View>
            <FlatList
              data={deviceList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <ItemDevice
                  device={item}
                  handleRefreshList={queryDeviceList}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  onRequestClose={onRequestClose}
                />
              )}
              numColumns={2}
              refreshing={isLoading}
              onRefresh={queryDeviceList}
              columnWrapperStyle={{ justifyContent: "space-between" }}
            />
          </View>
        </View>
      </>
    </Modal>
  );
};

export default ModalDevices;
