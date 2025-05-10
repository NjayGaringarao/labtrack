import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ModalFace from "./ModalFace";

const LogDevice = () => {
  const [deviceType, setDeviceType] = useState("");
  const [isFaceModal, setIsFaceModal] = useState(false);
  const [isDeviceModal, setIsDeviceModal] = useState(false);

  const handleOnSuccess = async () => {
    setIsFaceModal(false);
    setIsDeviceModal(true);
    setDeviceType("");
  };

  const handleCloseModalFace = () => {
    setIsFaceModal(false);
    setDeviceType("");
  };

  useEffect(() => {
    if (deviceType !== "") setIsFaceModal(true);
  }, [deviceType]);

  return (
    <View className="flex-1 gap-4">
      <Text className="text-2xl font-medium">
        Choose Device Type to Utilize:
      </Text>
      <TouchableOpacity
        onPress={() => setDeviceType("LAPTOP")}
        className="flex-1 bg-primary rounded-xl flex-row p-2 gap-2"
      >
        <View className="flex-1 bg-white rounded-lg items-center justify-center">
          <Text className="text-primary font-semibold text-2xl">LAPTOP</Text>
        </View>
        <View className="w-32 items-center justify-center">
          <Text className="text-xl font-normal text-white">Hybrid Room</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setDeviceType("SYSTEM UNIT")}
        className="flex-1 bg-primary rounded-xl flex-row p-2 gap-2"
      >
        <View className="w-32 items-center justify-center">
          <Text className="text-xl font-normal text-white">Computer</Text>
          <Text className="text-xl font-normal text-white">Laboratory</Text>
        </View>
        <View className="flex-1 bg-white rounded-lg items-center justify-center">
          <Text className="text-primary font-semibold text-2xl">
            SYSTEM UNIT
          </Text>
        </View>
      </TouchableOpacity>

      {isFaceModal && (
        <ModalFace
          onRequestClose={handleCloseModalFace}
          onSuccess={handleOnSuccess}
        />
      )}
    </View>
  );
};

export default LogDevice;
