import { View, Text, Modal } from "react-native";
import React from "react";
import Button from "@/components/Button";

interface IModalDevices {
  onRequestClose: () => void;
  onSuccess: () => void;
}

const ModalDevices = ({ onRequestClose, onSuccess }: IModalDevices) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onRequestClose}
    >
      <>
        <View className="absolute h-full w-full bg-black opacity-80" />
        <View className="h-full w-full p-8 justify-center">
          <View className="rounded-lg bg-background p-4 gap-4">
            <View className="w-full h-96 bg-black rounded-md"></View>
            <Button title="Authenticate Face" handlePress={onSuccess} />
          </View>
        </View>
      </>
    </Modal>
  );
};

export default ModalDevices;
