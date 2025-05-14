import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import ModalFaceRecognition from "./ModalFaceRecognition";
import ModalDevices from "./ModalDevices";
import image from "@/constants/image";
import { FontAwesome6 } from "@expo/vector-icons";

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
        <View className="flex-1 bg-white rounded-lg items-center justify-center overflow-hidden">
          <Image
            source={image.hybrid}
            resizeMode="contain"
            className="absolute w-full opacity-15"
          />
          <Text className="text-primary font-semibold text-2xl">
            HYBRID ROOM
          </Text>
        </View>
        <View className="w-32 items-center justify-center">
          <FontAwesome6 name="laptop" size={42} color="white" />
          <Text className="text-xl font-normal text-white">Laptop</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setRoom("COMLAB")}
        className="flex-1 bg-primary rounded-xl flex-row p-2 gap-2"
      >
        <View className="w-32 items-center justify-center">
          <FontAwesome6 name="computer" size={42} color="white" />
          <Text className="text-xl font-normal text-white">Desktop Unit</Text>
        </View>
        <View className="flex-1 bg-white rounded-lg items-center justify-center overflow-hidden">
          <Image
            source={image.comlab}
            resizeMode="contain"
            className="absolute w-full opacity-15"
          />

          <Text className="text-primary font-semibold text-2xl text-center">
            COMPUTER LABORATORY
          </Text>
        </View>
      </TouchableOpacity>

      {isFaceModal && (
        <ModalFaceRecognition
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
