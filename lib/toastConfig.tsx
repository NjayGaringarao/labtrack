import { BaseToastProps } from "react-native-toast-message";
import color from "@/constants/color";
import { View, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const customToastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <View
      style={{
        height: 72,
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 16,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.secondary,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: 96,
            width: 96,
            backgroundColor: color.success,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="checkcircle" size={42} color={color.background} />
        </View>
        <View
          style={{
            flex: 1,
            gap: 4,
            paddingHorizontal: 4,
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "600", color: color.uBlack }}
          >
            {text1}
          </Text>
          <Text style={{ fontSize: 12, color: color.uGray, lineHeight: 12 }}>
            {text2}
          </Text>
        </View>
      </View>
    </View>
  ),

  error: ({ text1, text2 }: BaseToastProps) => (
    <View
      style={{
        height: 72,
        width: "100%",
        paddingHorizontal: 16,
        marginTop: 16,
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: color.secondary,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            height: 96,
            width: 96,
            backgroundColor: color.failed,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign
            name="exclamationcircle"
            size={42}
            color={color.background}
          />
        </View>
        <View
          style={{
            flex: 1,
            gap: 4,
            paddingHorizontal: 4,
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "600", color: color.uBlack }}
          >
            {text1}
          </Text>
          <Text style={{ fontSize: 12, color: color.uGray, lineHeight: 12 }}>
            {text2}
          </Text>
        </View>
      </View>
    </View>
  ),
};

export default customToastConfig;
