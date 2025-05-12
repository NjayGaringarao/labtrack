import { DeviceListFooter } from "./../components/home/admin/components/flatlist/DeviceListFooter";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Device } from "@/services/types/model";
import LocationTab from "@/components/home/admin/components/LocationTab";
import DeviceItem from "@/components/home/admin/components/DeviceItem";
import Button from "@/components/Button";
import Toast from "react-native-toast-message";
import { getDevices } from "@/services/device";
import color from "@/constants/color";
import { DeviceListEmpty } from "@/components/home/admin/components/flatlist/DeviceListEmpty";
import { ModalAddDevice } from "@/components/home/admin/components/ModalAddDevice";
import { sortByAlias } from "@/util/common";

const manageDevice = () => {
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const [deviceComlabList, setDeviceComlabList] = useState<Device[]>([]);
  const [deviceHybridList, setDeviceHybridList] = useState<Device[]>([]);
  const [activeTab, setActiveTab] = useState<"HYBRID" | "COMLAB">("HYBRID");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);

  const queryDeviceList = async () => {
    try {
      setIsLoading(true);
      setDeviceList(sortByAlias(await getDevices()));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed Load Device List",
        text2: `${error}`,
        visibilityTime: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setDeviceComlabList(
      deviceList.filter((device) => device.location === "COMLAB")
    );
    setDeviceHybridList(
      deviceList.filter((device) => device.location === "HYBRID")
    );
  }, [deviceList]);

  useEffect(() => {
    queryDeviceList();

    return setDeviceList([]);
  }, []);

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="h-16 w-full flex-row items-center bg-primary pr-4">
        <TouchableOpacity className="px-4 py-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </TouchableOpacity>

        <View>
          <Text className="text-2xl font-bold text-white">
            Device Management
          </Text>
        </View>
      </View>

      <LocationTab tab={activeTab} setTab={setActiveTab} />

      {activeTab === "HYBRID" ? (
        deviceHybridList.length > 0 ? (
          <FlatList
            data={deviceHybridList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <DeviceItem
                device={item}
                refreshListHandle={queryDeviceList}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
              />
            )}
            refreshing={isLoading}
            onRefresh={queryDeviceList}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            className="m-4 flex-1"
            ListFooterComponent={
              <DeviceListFooter
                handleAddDevice={() => setIsModalAddVisible(true)}
              />
            }
          />
        ) : (
          <DeviceListEmpty
            prompt={"No device in Hybrid Room is Listed."}
            handleQueryDeviceList={queryDeviceList}
            isLoading={isLoading}
            handleAddDevice={() => setIsModalAddVisible(true)}
          />
        )
      ) : deviceComlabList.length > 0 ? (
        <FlatList
          data={deviceComlabList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DeviceItem
              device={item}
              refreshListHandle={queryDeviceList}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          )}
          refreshing={isLoading}
          onRefresh={queryDeviceList}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          className="m-4 flex-1"
          ListFooterComponent={
            <DeviceListFooter
              handleAddDevice={() => setIsModalAddVisible(true)}
            />
          }
        />
      ) : (
        <DeviceListEmpty
          prompt={"No device in Computer Lab is Listed."}
          handleQueryDeviceList={queryDeviceList}
          isLoading={isLoading}
          handleAddDevice={() => setIsModalAddVisible(true)}
        />
      )}
      {isModalAddVisible && (
        <ModalAddDevice
          setIsModalVisible={setIsModalAddVisible}
          refreshListHandle={queryDeviceList}
        />
      )}
    </View>
  );
};

export default manageDevice;
