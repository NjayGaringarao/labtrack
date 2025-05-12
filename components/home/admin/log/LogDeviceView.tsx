import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import ItemPicker from "@/components/ItemPicker";
import { Picker } from "@react-native-picker/picker";
import { Device } from "@/services/types/model";
import { ModalAddDevice } from "../components/ModalAddDevice";
import { DeviceListEmpty } from "../components/flatlist/DeviceListEmpty";
import { sortByAlias } from "@/util/common";
import { getDevices } from "@/services/device";
import Toast from "react-native-toast-message";
import LogDeviceItem from "./LogDeviceItem";
import { DeviceListFooter } from "../components/flatlist/DeviceListFooter";

const LogDeviceView = () => {
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const [deviceComlabList, setDeviceComlabList] = useState<Device[]>([]);
  const [deviceHybridList, setDeviceHybridList] = useState<Device[]>([]);
  const [activeTab, setActiveTab] = useState<string>("HYBRID");
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
    <View className="flex-1">
      <ItemPicker
        value={activeTab}
        onChange={setActiveTab}
        containerStyle="mx-4 mt-4"
      >
        <Picker.Item label="Laptops in Hybrid Room" value="HYBRID" />
        <Picker.Item label="PC Unit in Computer Laboratory" value="COMLAB" />
      </ItemPicker>

      {activeTab === "HYBRID" ? (
        deviceHybridList.length > 0 ? (
          <FlatList
            data={deviceHybridList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <LogDeviceItem device={item} isLoading={isLoading} />
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
            <LogDeviceItem device={item} isLoading={isLoading} />
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

export default LogDeviceView;
