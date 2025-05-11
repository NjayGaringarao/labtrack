import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import ModalFace from "./ModalFace";
import ModalDevices from "./ModalDevices";

const LogDevice = () => {
  const [room, setRoom] = useState<"HYBRID" | "COMLAB">();
  const [isFaceModal, setIsFaceModal] = useState(false);
  const [isDeviceModal, setIsDeviceModal] = useState(false);

  const handleOnFaceSuccess = async () => {
    setIsFaceModal(false);
    setIsDeviceModal(true);
  };

  const handleCloseModal = () => {
    setIsFaceModal(false);
    setIsDeviceModal(false);
    setRoom(undefined);
  };

  useEffect(() => {
    if (room) setIsFaceModal(true);
  }, [room]);

  return (
    <View className="flex-1 gap-4">
      <Text className="text-2xl font-medium">Select Location:</Text>
      <TouchableOpacity
        onPress={() => setRoom("HYBRID")}
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
        onPress={() => setRoom("COMLAB")}
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
          onRequestClose={handleCloseModal}
          onSuccess={handleOnFaceSuccess}
        />
      )}

      {isDeviceModal && (
        <ModalDevices
          onRequestClose={handleCloseModal}
          onSuccess={handleOnFaceSuccess}
          room={room}
        />
      )}
    </View>
  );
};

export default LogDevice;
