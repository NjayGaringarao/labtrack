import { View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ProfilePicturePicker from "../ProfilePicturePicker";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ImagePickerAsset } from "expo-image-picker";
import TextBox from "../TextBox";
import Loading from "../Loading";
import color from "@/constants/color";
import Button from "../Button";
import { confirmAction } from "@/util/common";
import Toast from "react-native-toast-message";
import {
  updateStudentInfo,
  updateEmployeeInfo,
  updateProfile,
} from "@/services/user";

interface IForm {
  firstName: string;
  middleName?: string;
  lastName: string;
  sex?: string;
  birthdate?: Date;
  civil_status?: string;
}

const Personal = () => {
  const { userInfo, refreshUserRecord, isInternetConnection, user } =
    useGlobalContext();
  const [isModified, setIsModified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState<
    ImagePickerAsset | undefined
  >();
  const [form, setForm] = useState<IForm>({
    firstName: "",
    middleName: "",
    lastName: "",
  });
  const profilePickerRef = useRef<{ clear: () => void }>(null);

  const updateHandle = async () => {
    if (
      !(await confirmAction(
        "Confirm Changes",
        "Save changes that you've made?"
      ))
    )
      return;
    try {
      setIsLoading(true);

      if (user?.labels[0] == "STUDENT") {
        await updateProfile(
          userInfo.id,
          [form.firstName, form.middleName, form.lastName],
          newProfilePicture
        );
      }

      Toast.show({
        type: "success",
        text1: "Update Success",
        text2: "Successfully updated personal information",
      });

      refreshUserRecord({
        info: true,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: `${error}`,
      });
      clearHandle();
    } finally {
      setIsLoading(false);
    }
  };

  const clearHandle = () => {
    if (userInfo.name) {
      setForm({
        firstName: userInfo.name[0] ? userInfo.name[0] : "",
        middleName: userInfo.name[1] ? userInfo.name[1] : "",
        lastName: userInfo.name[2] ? userInfo.name[2] : "",
      });
    }
    clearProfilePicture();
  };

  const clearProfilePicture = () => {
    profilePickerRef.current?.clear();
  };

  useEffect(() => {
    clearHandle();
  }, [userInfo]);

  useEffect(() => {
    if (userInfo.name) {
      if (
        form.firstName !== userInfo.name[0] ||
        form.middleName !== userInfo.name[1] ||
        form.lastName !== userInfo.name[2] ||
        newProfilePicture
      ) {
        setIsModified(true);
      } else {
        setIsModified(false);
      }
    }
  }, [form, newProfilePicture]);

  return (
    <View className="w-full">
      <View className="w-full px-4 py-4 rounded-xl bg-background shadow-lg shadow-black mt-1">
        <Text className="text-xl text-uBlack font-black">
          I. PERSONAL INFORMATION
        </Text>
        <View className="flex-row gap-4 mt-4">
          <ProfilePicturePicker
            ref={profilePickerRef}
            userInfo={userInfo}
            setNewProfilePicture={(e) => setNewProfilePicture(e)}
            newProfilePicture={newProfilePicture}
            containerStyle=" w-40 h-40"
          />
          <View className="flex-1 mx-2 gap-2">
            <TextBox
              title="Last Name"
              textValue={form.lastName!}
              placeholder="Enter your last name"
              handleChangeText={(e) => setForm({ ...form, lastName: e })}
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
            <TextBox
              title="First Name"
              textValue={form.firstName!}
              placeholder="Enter your first name"
              handleChangeText={(e) => setForm({ ...form, firstName: e })}
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
            <TextBox
              title="Middle Name"
              textValue={form.middleName!}
              placeholder="Enter your middle name"
              handleChangeText={(e) => setForm({ ...form, middleName: e })}
              containerStyles="w-full "
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
            />
          </View>
        </View>

        {!!isModified && (
          <View className="self-end mt-4 flex-row">
            <Button
              title="Update"
              handlePress={updateHandle}
              containerStyles="bg-secondary"
              isDisabled={!isInternetConnection}
            />
            <Button
              title="Reset"
              handlePress={clearHandle}
              containerStyles="ml-2 border border-secondary bg-transparent"
              textStyles="text-secondary"
            />
          </View>
        )}
      </View>
      {!!isLoading && (
        <View className="absolute items-center justify-center h-full w-full rounded-xl overflow-hidden">
          <View className="absolute h-full w-full bg-background opacity-90"></View>
          <Loading
            loadingPrompt="Applying Changes"
            containerStyles="absolute"
            loadingColor={color.secondary}
          />
        </View>
      )}
    </View>
  );
};

export default Personal;
