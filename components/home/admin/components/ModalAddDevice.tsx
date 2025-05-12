import Button from "@/components/Button";
import ItemPicker from "@/components/ItemPicker";
import TextBox from "@/components/TextBox";
import color from "@/constants/color";
import { addDevice, isAliasAvailable } from "@/services/device";
import { confirmAction } from "@/util/common";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Modal, View, Text, Alert } from "react-native";
import Toast from "react-native-toast-message";

interface IModalAddDevice {
  setIsModalVisible: (param: boolean) => void;
  refreshListHandle: () => Promise<void>;
}

export function ModalAddDevice({
  setIsModalVisible,
  refreshListHandle,
}: IModalAddDevice) {
  const [location, setLocation] = useState("HYBRID");
  const [alias, setAlias] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const addDeviceHandle = async () => {
    try {
      if (
        !(await confirmAction(
          "Confirm",
          "We will check if the alias is already taken. If not, the device will be listed to the catalog."
        ))
      ) {
        return;
      }

      setIsLoading(true);
      if (await isAliasAvailable(alias.slice())) {
        setPrompt(
          `'${alias}' is already taken. Please try again with different alias.`
        );
        throw "EXIT";
      }
      await addDevice(alias.slice(), location);
      await refreshListHandle();
      Alert.alert(
        "Added Successful",
        "The device is now available to the catalog."
      );
      setIsModalVisible(false);
    } catch (error) {
      if (error != "EXIT") {
        await refreshListHandle();
        Toast.show({
          type: "error",
          text1: "Failed to Add",
          text2: `There was an error Adding a device. Please try again`,
          visibilityTime: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      visible={true}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <>
        <View className="absolute h-full w-full bg-black opacity-80" />
        <View className="h-full w-full justify-center items-center">
          <View className="bg-background p-4 rounded-lg w-11/12">
            {/** Header */}
            <View className="flex-row justify-between pb-2">
              <Text className="text-2xl font-bold mb-4 text-uBlack">
                New Device
              </Text>
              <Button handlePress={() => setIsModalVisible(false)}>
                <Entypo name="cross" size={25} color={color.white} />
              </Button>
            </View>

            {/** Content */}
            <View className="flex-row gap-2">
              <FontAwesome6
                name={location === "HYBRID" ? "laptop" : "computer"}
                size={128}
                color={color.primary}
              />
              <View className="gap-2 flex-1 justify-center">
                <ItemPicker value={location} onChange={setLocation}>
                  <Picker.Item label="Laptop @Hybrid Room" value="HYBRID" />
                  <Picker.Item label="PC @Computer Lab" value="COMLAB" />
                </ItemPicker>
                <TextBox
                  textValue={alias}
                  handleChangeText={(e) => setAlias(e)}
                  maxLength={10}
                />
              </View>
            </View>
            <Text className="text-failed text-sm my-2">{prompt}</Text>
            <Button
              title="Add Device"
              handlePress={addDeviceHandle}
              isDisabled={isLoading || !alias.length}
            />
          </View>
        </View>
      </>
    </Modal>
  );
}
