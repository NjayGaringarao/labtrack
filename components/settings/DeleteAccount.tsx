import { View, Text } from "react-native";
import React, { useState } from "react";
import TextBox from "../TextBox";
import Button from "../Button";
import { useGlobalContext } from "@/context/GlobalProvider";
import { confirmAction } from "@/util/common";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { deleteAccount } from "@/services/user";

const DeleteAccount = () => {
  const { isInternetConnection, resetGlobalState, user } = useGlobalContext();
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const DeleteAccountHandle = async () => {
    if (
      !(await confirmAction(
        "Confirm Action",
        "This action is irreversible! Would you like to continue?"
      ))
    )
      return;
    try {
      setIsLoading(true);

      await deleteAccount({
        user_id: user?.$id!,
        password: password,
      });

      Toast.show({
        type: "success",
        text1: "Deletion Success",
        text2: `Your account and its data is no longer exists in Docustat.`,
      });
      resetGlobalState();
      router.navigate("/");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Deletion Failed",
        text2: `${error}`,
      });
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View className="w-full">
      <View className=" w-full px-4 py-4 rounded-xl bg-background shadow-lg shadow-black">
        <Text className="text-xl text-failed font-black my-2">
          V. DELETE ACCOUNT
        </Text>
        <View className="w-full px-4 mx-2 gap-2">
          <Text
            className="text-base text-uGray font-mono -mb-1"
            style={{
              lineHeight: 16,
            }}
          >
            {`This will delete your account and some of the your data. These includes:
            \t- Personal Information
            \t- Contact Information
            \t- Student/Employee Information
            \t- Login Credentials
            \nProvide your current password below to continue.`}
          </Text>
          <TextBox
            textValue={password}
            placeholder="Password"
            handleChangeText={(e) => setPassword(e)}
            containerStyles="w-full mt-2"
            titleTextStyles="text-uGray text-base font-semibold"
            textInputStyles="text-base text-uBlack"
            boxStyles="w-full bg-white rounded-xl "
            isPassword
          />

          <Button
            title="Delete Account"
            handlePress={DeleteAccountHandle}
            containerStyles="bg-failed w-48 self-end bg-red-600"
            isDisabled={
              !isInternetConnection || isLoading || password.length < 8
            }
          />
        </View>
      </View>
    </View>
  );
};

export default DeleteAccount;
