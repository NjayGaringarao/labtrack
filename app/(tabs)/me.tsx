import React, { useState } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import ProfilePicture from "@/components/ProfilePicture";
import { useGlobalContext } from "@/context/GlobalProvider";
import Button from "@/components/Button";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import color from "@/constants/color";
import { router } from "expo-router";
import Toast from "react-native-toast-message";
import { signOut } from "@/services/auth";
import { confirmAction } from "@/util/common";
import image from "@/constants/image";

const profile = () => {
  const { userInfo, isInternetConnection, resetGlobalState, user } =
    useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const signOutHandle = async () => {
    try {
      if (!(await confirmAction("Confirm Logout", "You can log back anytime.")))
        return;
      setIsLoading(true);
      await signOut(resetGlobalState);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Submit Failed",
        text2: `There was an error signing out your account.`,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="flex-1">
      <View className="w-full py-4 bg-primary items-center">
        <Text className="text-3xl text-white font-bold">LABTRACK</Text>
      </View>
      <View className="flex-1 p-4  bg-background items-center gap-4">
        <ProfilePicture
          userInfo={userInfo}
          containerStyle="w-48 h-48 border-8"
        />
        <View className="w-full items-center">
          <Text className="text-3xl text-primary font-semibold justify-end">
            {userInfo.name[1]
              ? `${userInfo.name[0]} ${userInfo.name[1]} ${userInfo.name[2]}`
              : `${userInfo.name[0]} ${userInfo.name[2]}`}
          </Text>

          {userInfo.dep_prog && userInfo.year_level ? (
            <Text className="text-lg text-uBlack justify-end">
              {userInfo.dep_prog
                .toLocaleUpperCase()
                .concat(" | ")
                .concat(userInfo.year_level.toUpperCase())
                .concat(" YEAR")}
            </Text>
          ) : (
            <Text className="text-lg justify-end">Employee</Text>
          )}
        </View>
        <View className="self-end mt-4 flex-row gap-2">
          <Button
            title="Settings"
            handlePress={() => router.push("/userSettings")}
            containerStyles="bg-transparent"
            isDisabled={!isInternetConnection}
            textStyles="text-uBlack"
          >
            <MaterialCommunityIcons
              name="account-settings"
              size={24}
              color={color.secondary}
            />
          </Button>
          <Button
            title="Sign-out"
            handlePress={signOutHandle}
            containerStyles="bg-transparent"
            textStyles="text-uBlack"
            isDisabled={isLoading || !isInternetConnection}
          >
            <MaterialCommunityIcons
              name="logout"
              size={24}
              color={color.secondary}
            />
          </Button>
        </View>
        <Text className="text-2xl font-semibold text-uBlack w-full">
          About Me
        </Text>
        <ScrollView
          className="flex-1 w-full p-4 rounded-xl bg-background shadow-xl shadow-black"
          contentContainerStyle={{
            rowGap: 16,
            paddingTop: 8,
            paddingBottom: 32,
            paddingHorizontal: 16,
          }}
        >
          {/* Personal Information */}
          <View className="w-full mb-6">
            <Text className="text-lg font-semibold text-primary mb-2">
              Personal Information
            </Text>

            <View className="flex-row items-center mt-2">
              <Text className="w-1/2 pl-2 text-uBlack font-medium">
                LAST NAME
              </Text>
              <Text className="flex-1 text-uBlack font-light">
                {":\t".concat(userInfo.name[2] ? userInfo.name[2] : "---")}
              </Text>
            </View>

            <View className="flex-row items-center mt-2">
              <Text className="w-1/2 pl-2 text-uBlack font-medium">
                FIRST NAME
              </Text>
              <Text className="flex-1 text-uBlack font-light">
                {":\t".concat(userInfo.name[0] ? userInfo.name[0] : "---")}
              </Text>
            </View>

            <View className="flex-row items-center mt-2">
              <Text className="w-1/2 pl-2 text-uBlack font-medium">
                MIDDLE NAME
              </Text>
              <Text className="flex-1 text-uBlack font-light">
                {":\t".concat(userInfo.name[1] ? userInfo.name[1] : "---")}
              </Text>
            </View>
          </View>

          {/* Account Information */}
          <View className="w-full mb-6">
            <Text className="text-lg font-semibold text-primary mb-2">
              Account Information
            </Text>

            <View className="flex-row items-center mt-2">
              <Text className="w-1/2 pl-2 text-uBlack font-medium">
                Account Type
              </Text>
              <Text className="flex-1 text-uBlack font-light">
                {user?.labels[0]} ACCOUNT
              </Text>
            </View>

            <View className="flex-row items-center mt-2">
              <Text className="w-1/2 pl-2 text-uBlack font-medium">
                Log into Device
              </Text>
              <Text className="flex-1 text-uBlack font-light">
                {user?.labels[0] == "ADMIN" ? "FALSE" : "TRUE"}
              </Text>
            </View>

            <View className="flex-row items-center mt-2">
              <Text className="w-1/2 pl-2 text-uBlack font-medium">
                Edit Profile
              </Text>
              <Text className="flex-1 text-uBlack font-light">TRUE</Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Text className="w-1/2 pl-2 text-uBlack font-medium">
                Manage Devices
              </Text>
              <Text className="flex-1 text-uBlack font-light">
                {user?.labels[0] === "ADMIN" ? "TRUE" : "FALSE"}
              </Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Text className="w-1/2 pl-2 text-uBlack font-medium">
                View Activity
              </Text>
              <Text className="flex-1 text-uBlack font-light">
                {user?.labels[0] === "ADMIN" ? "TRUE" : "FALSE"}
              </Text>
            </View>
            <View className="flex-row items-center mt-2">
              <Text className="w-1/2 pl-2 text-uBlack font-medium">
                View Logs
              </Text>
              <Text className="flex-1 text-uBlack font-light">
                {user?.labels[0] === "ADMIN" ? "TRUE" : "FALSE"}
              </Text>
            </View>
          </View>

          {/* Student Information */}
          {userInfo.dep_prog && userInfo.year_level && (
            <View className="w-full border-t border-gray-300 pt-4 mb-6">
              <Text className="text-lg font-semibold text-primary mb-2">
                Student Information
              </Text>
              <View className="flex-row items-center mt-2">
                <Text className="w-1/2 pl-2 text-uBlack font-medium">
                  DEPARTMENT
                </Text>
                <Text className="flex-1 text-uBlack font-light">
                  {":\t".concat(userInfo.dep_prog.toLocaleUpperCase())}
                </Text>
              </View>
              <View className="flex-row items-center mt-2">
                <Text className="w-1/2 pl-2 text-uBlack font-medium">
                  YEAR LEVEL
                </Text>
                <Text className="flex-1 text-uBlack font-light">
                  {":\t".concat(userInfo.year_level.toUpperCase())} YEAR
                </Text>
              </View>
            </View>
          )}

          {/* Employee Information */}
          {userInfo.employee_role && (
            <View className="w-full border-t border-gray-300 pt-4">
              <Text className="text-lg font-semibold text-primary mb-2">
                Employee Information
              </Text>
              <View className="flex-row items-center mt-2">
                <Text className="w-1/2 pl-2 text-uBlack font-medium">Role</Text>
                <Text className="flex-1 text-uBlack font-light">
                  {":\t".concat(userInfo.employee_role.toUpperCase())}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default profile;
