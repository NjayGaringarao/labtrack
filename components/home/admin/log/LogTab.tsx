import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import color from "@/constants/color";

interface ILogTab {
  tab: "DEVICE" | "TIMELINE";
  setTab: (param: "DEVICE" | "TIMELINE") => void;
}

const LogTab = ({ tab, setTab }: ILogTab) => {
  return (
    <View className="border-b-2 border-primary p-4 pt-2 m-4 mb-0 flex-row justify-around">
      <TouchableOpacity onPress={() => setTab("DEVICE")}>
        <View className="items-center">
          <FontAwesome6
            name="computer"
            size={40}
            color={tab === "DEVICE" ? color.primary : color.secondary}
          />
          <Text
            className={`text-base ${
              tab === "DEVICE" ? "text-primary font-semibold" : "text-secondary"
            }`}
            style={{ lineHeight: 20 }}
          >
            {"DEVICE"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTab("TIMELINE")}>
        <View className="flex-col items-center">
          <MaterialCommunityIcons
            name="timeline-text"
            size={40}
            color={tab === "TIMELINE" ? color.primary : color.secondary}
          />
          <Text
            className={`text-base ${
              tab === "TIMELINE"
                ? "text-primary font-semibold"
                : "text-secondary"
            }`}
            style={{ lineHeight: 20 }}
          >
            {"TIMELINE"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LogTab;
