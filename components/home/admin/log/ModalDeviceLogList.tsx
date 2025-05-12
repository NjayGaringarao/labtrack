import Button from "@/components/Button";
import color from "@/constants/color";
import { getDeviceLog } from "@/services/logging";
import { Device, Log } from "@/services/types/model";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Modal, View, Text, FlatList } from "react-native";
import Toast from "react-native-toast-message";
import LogItem from "./LogItem";
import LogEmptyList from "./LogEmptyList";

interface IModalDeviceLog {
  setIsModalVisible: (param: boolean) => void;
  device: Device;
}

export function ModalDeviceLogList({
  setIsModalVisible,
  device,
}: IModalDeviceLog) {
  const [logList, setLogList] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const queryLogList = async () => {
    try {
      setIsLoading(true);
      setLogList(await getDeviceLog(device.id));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed Load Log List",
        text2: `${error}`,
        visibilityTime: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    queryLogList();
  }, []);

  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <>
        <View className="absolute h-full w-full bg-black opacity-80" />
        <View className="flex-1 justify-end">
          <View className="h-11/12 w-full bg-background p-4 rounded-t-lg">
            {/** Header */}
            <View className="flex-row justify-between">
              <Text className="flex-1 text-2xl font-bold mb-4">
                {device.alias} Usage Log
              </Text>
              <Button handlePress={() => setIsModalVisible(false)}>
                <Entypo name="cross" size={25} color={color.white} />
              </Button>
            </View>
            {/** Content */}

            <FlatList
              data={logList}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <LogItem log={item} />}
              refreshing={isLoading}
              onRefresh={queryLogList}
              ListEmptyComponent={<LogEmptyList />}
              className="min-h-96"
            />
          </View>
        </View>
      </>
    </Modal>
  );
}
