import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import LogTab from "@/components/home/admin/log/LogTab";
import LogDeviceView from "@/components/home/admin/log/LogDeviceView";
import LogTimeline from "@/components/home/admin/log/LogTimeline";

const viewLogs = () => {
  const [activeTab, setActiveTab] = useState<"DEVICE" | "TIMELINE">("DEVICE");
  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="h-16 w-full flex-row items-center bg-primary pr-4">
        <TouchableOpacity className="px-4 py-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </TouchableOpacity>

        <View>
          <Text className="text-2xl font-bold text-white">Usage Logs</Text>
        </View>
      </View>

      <View></View>
      <LogTab tab={activeTab} setTab={setActiveTab} />

      {activeTab === "DEVICE" ? <LogDeviceView /> : <LogTimeline />}
    </View>
  );
};

export default viewLogs;
