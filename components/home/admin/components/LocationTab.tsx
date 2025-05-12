import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import color from "@/constants/color";

interface ILocationTab {
  tab: "HYBRID" | "COMLAB";
  setTab: (param: "HYBRID" | "COMLAB") => void;
}

const LocationTab = ({ tab, setTab }: ILocationTab) => {
  return (
    <View className="border-b-2 border-primary p-4 pt-2 m-4 mb-0 flex-row justify-around">
      <TouchableOpacity onPress={() => setTab("HYBRID")}>
        <View className="flex-row items-center gap-2">
          <FontAwesome6
            name="laptop"
            size={40}
            color={tab === "HYBRID" ? color.primary : color.secondary}
          />
          <Text
            className={`text-xl ${
              tab === "HYBRID" ? "text-primary font-semibold" : "text-secondary"
            }`}
            style={{ lineHeight: 20 }}
          >
            {"Hybrid\nRoom"}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setTab("COMLAB")}>
        <View className="flex-row items-center gap-2">
          <FontAwesome6
            name="computer"
            size={40}
            color={tab === "COMLAB" ? color.primary : color.secondary}
          />
          <Text
            className={`text-lg ${
              tab === "COMLAB" ? "text-primary font-semibold" : "text-secondary"
            }`}
            style={{ lineHeight: 20 }}
          >
            {"Computer\nLaboratory"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LocationTab;
