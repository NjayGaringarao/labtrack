import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import Loading from "../Loading";
import color from "@/constants/color";
import Button from "../Button";
import { confirmAction } from "@/util/common";
import Toast from "react-native-toast-message";
import { updateStudentInfo, updateEmployeeInfo } from "@/services/user";
import ItemPicker from "../ItemPicker";
import { Picker } from "@react-native-picker/picker";

interface IStudentForm {
  dep_prog?: string;
  year_level?: string;
}

interface IAdminForm {
  employee_role?: string;
}
const Role = () => {
  const { user, userInfo, isInternetConnection, refreshUserRecord } =
    useGlobalContext();
  const [studentForm, setStudentForm] = useState<IStudentForm>();
  const [adminForm, setAdminForm] = useState<IAdminForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const resetHandle = () => {
    if (user?.labels[0] === "STUDENT") {
      setStudentForm({
        dep_prog: userInfo.dep_prog,
        year_level: userInfo.year_level,
      });
    } else {
      setAdminForm({ employee_role: userInfo.employee_role });
    }
  };

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

      if (user?.labels[0] === "STUDENT") {
        await updateStudentInfo(
          userInfo.id,
          studentForm?.dep_prog!,
          studentForm?.year_level!
        );
      } else {
        await updateEmployeeInfo(userInfo.id, adminForm?.employee_role!);
      }

      Toast.show({
        type: "success",
        text1: "Update Success",
        text2: `Successfully updated ${
          user?.labels[0] == "STUDENT" ? "student" : "employee"
        } information`,
      });

      await refreshUserRecord({
        info: true,
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: `${error}`,
      });
      resetHandle();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.labels[0] === "STUDENT") {
      setIsModified(
        userInfo.dep_prog !== studentForm?.dep_prog ||
          userInfo.year_level !== studentForm?.year_level
      );
    } else {
      setIsModified(userInfo.employee_role !== adminForm?.employee_role);
    }
  }, [adminForm, studentForm]);

  useEffect(() => {
    resetHandle();
  }, [userInfo]);

  return (
    <View className="w-full">
      <View className=" w-full px-4 py-4 rounded-xl bg-background shadow-lg shadow-black">
        {(user?.labels[0] === "ADMIN" || user?.labels[0] === "EMPLOYEE") && (
          <>
            <Text className="text-xl text-uBlack font-black my-2">
              II. EMPLOYEE INFORMATION
            </Text>

            <View className="w-full px-4 mx-2 gap-2">
              <Text className="text-base text-uBlack font-semibold">Role</Text>
              <ItemPicker
                value={adminForm?.employee_role!}
                onChange={(value) =>
                  setAdminForm({ ...adminForm, employee_role: value })
                }
              >
                <Picker.Item label="Teaching Staff" value="TEACHING-STAFF" />
                <Picker.Item
                  label="Non-Teaching Staff"
                  value="NON-TEACHING-STAFF"
                />
              </ItemPicker>
            </View>
          </>
        )}
        {user?.labels[0] === "STUDENT" && (
          <>
            <Text className="text-xl text-uBlack font-black my-2">
              II. STUDENT INFORMATION
            </Text>
            <View className="w-full px-4 mx-2 gap-2">
              <Text className="text-base text-uGray font-semibold -mb-1">
                Department - Program
              </Text>
              <ItemPicker
                value={studentForm?.dep_prog!}
                onChange={(value) =>
                  setStudentForm({ ...studentForm, dep_prog: value })
                }
              >
                <Picker.Item label="CCIT - BSCS" value="CCIT-BSCS" />
                <Picker.Item label="CTE - BSED" value="CTE-BSED" />
                <Picker.Item label="CTE - BEED" value="CTE-BEED" />
                <Picker.Item label="CBAPA - BSBA" value="CBAPA-BSBA" />
              </ItemPicker>
              <Text className="text-base text-uGray font-semibold -mb-1">
                Year Level
              </Text>
              <ItemPicker
                value={studentForm?.year_level!}
                onChange={(value) =>
                  setStudentForm({ ...studentForm, year_level: value })
                }
              >
                <Picker.Item label="First Year" value="FIRST" />
                <Picker.Item label="Second Year" value="SECOND" />
                <Picker.Item label="Third Year" value="THIRD" />
                <Picker.Item label="Fourth Year" value="FOURTH" />
                <Picker.Item label="Fifth Year" value="FIFTH" />
              </ItemPicker>
            </View>
          </>
        )}
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
              handlePress={resetHandle}
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

export default Role;
