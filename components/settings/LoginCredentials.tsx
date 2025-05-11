import { View, Text } from "react-native";
import React, { useState } from "react";
import { useGlobalContext } from "@/context/GlobalProvider";
import TextBox from "../TextBox";
import { regex } from "@/constants/regex";
import Button from "../Button";
import Loading from "../Loading";
import color from "@/constants/color";
import { confirmAction } from "@/util/common";
import Toast from "react-native-toast-message";
import { updatePassword } from "@/services/appwrite";

const LoginCredentials = () => {
  const { user, isInternetConnection } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confPassword: "",
  });

  const [inputValidity, setInputValidity] = useState({
    newPassword: false,
    confPassword: true,
  });

  const [promptVisibility, setPromptVisibility] = useState({
    newPassword: false,
    confPassword: true,
  });

  const oldPasswordTextChangeHandle = (password: string) => {
    setForm({ ...form, oldPassword: password });

    setInputValidity((prev) => ({
      ...prev,
      newPassword:
        regex.password.test(password) && form.oldPassword != password,
    }));
  };

  const newPasswordTextChangeHandle = (password: string) => {
    !promptVisibility.newPassword &&
      setPromptVisibility({ ...promptVisibility, newPassword: true });

    setForm({ ...form, newPassword: password });

    setInputValidity((prev) => ({
      ...prev,
      newPassword:
        regex.password.test(password) && form.oldPassword != password,
      confPassword: password === form.confPassword,
    }));
  };

  const confTextChangeHandle = (text: string) => {
    setForm({ ...form, confPassword: text });
    setInputValidity({
      ...inputValidity,
      confPassword: text === form.newPassword,
    });
  };

  const resetHandle = () => {
    setForm({
      oldPassword: "",
      newPassword: "",
      confPassword: "",
    });
    setInputValidity({
      newPassword: false,
      confPassword: true,
    });
    setPromptVisibility({
      newPassword: false,
      confPassword: true,
    });
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

      await updatePassword(form.oldPassword, form.newPassword);

      Toast.show({
        type: "success",
        text1: "Update Success",
        text2: `Successfully changed your password.`,
      });
      resetHandle();
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

  return (
    <View className="w-full">
      <View className=" w-full px-4 py-4 rounded-xl bg-background shadow-lg shadow-black">
        <Text className="text-xl text-uBlack font-black my-2">
          III. LOGIN CREDENTIALS
        </Text>

        <View className="w-full px-4 mx-2 gap-2">
          <TextBox
            title="Role"
            textValue={user?.labels[0]!}
            placeholder="Unset"
            handleChangeText={() => {}}
            containerStyles="w-full "
            titleTextStyles="text-uGray text-base font-semibold"
            textInputStyles="text-base text-uBlack"
            boxStyles="w-full bg-white rounded-xl "
            isDisabled
          />
          <TextBox
            title="Email"
            textValue={user?.email!}
            placeholder="Unset"
            handleChangeText={() => {}}
            isDisabled
            containerStyles="w-full "
            titleTextStyles="text-uGray text-base font-semibold"
            textInputStyles="text-base text-uBlack"
            boxStyles="w-full bg-white rounded-xl "
            isPassword
          />
          <TextBox
            title={
              user?.labels[0] === "STUDENT" ? "Student Number" : "Employee ID"
            }
            textValue={user?.$id!}
            placeholder="Unset"
            handleChangeText={() => {}}
            containerStyles="w-full "
            titleTextStyles="text-uGray text-base font-semibold"
            textInputStyles="text-base text-uBlack"
            boxStyles="w-full bg-white rounded-xl "
            isDisabled
            isPassword
          />
          <View className="w-full gap-2">
            <Text className="text-base text-uGray font-semibold -mb-1">
              Change Password
            </Text>
            <TextBox
              textValue={form.oldPassword}
              placeholder="Old Password"
              handleChangeText={oldPasswordTextChangeHandle}
              containerStyles="w-full"
              titleTextStyles="text-uGray text-base font-semibold"
              textInputStyles="text-base text-uBlack"
              boxStyles="w-full bg-white rounded-xl "
              isPassword
            />
            <View className="w-full items-end">
              <TextBox
                textValue={form.newPassword}
                placeholder="New Password"
                handleChangeText={newPasswordTextChangeHandle}
                containerStyles="w-full"
                titleTextStyles="text-uGray text-base font-semibold"
                textInputStyles="text-base text-uBlack"
                boxStyles="w-full bg-white rounded-xl "
                isPassword
              />
              <Text
                className={`mt-1 text-xs text-red-600 font-semibold text-right ${
                  !(!inputValidity.newPassword && promptVisibility.newPassword)
                    ? "hidden"
                    : "visible"
                }`}
                style={{ lineHeight: 12 }}
              >
                *Password should be more than 8 characters long containing
                alphanumeric and other special characters{" (_!@#$%^&.,) "}. It
                should also not be the same with the old password
              </Text>
            </View>
            <View className="w-full items-end">
              <TextBox
                textValue={form.confPassword}
                placeholder="Confirm Password"
                handleChangeText={confTextChangeHandle}
                containerStyles="w-full"
                titleTextStyles="text-uGray text-base font-semibold"
                textInputStyles="text-base text-uBlack"
                boxStyles="w-full bg-white rounded-xl "
                isPassword
              />
              <Text
                className={`mt-1 text-xs text-red-600 font-semibold text-right ${
                  inputValidity.confPassword ? "hidden" : "visible"
                }`}
                style={{ lineHeight: 12 }}
              >
                *Password does not match.
              </Text>
            </View>
            <View className="self-end flex-row gap-1 mt-1">
              {Object.values(form).some((value) => value.trim().length > 0) && (
                <>
                  <Button
                    title="Update"
                    handlePress={updateHandle}
                    containerStyles="bg-secondary"
                    isDisabled={
                      isLoading ||
                      !Object.values(inputValidity).every(Boolean) ||
                      !isInternetConnection
                    }
                  />
                  <Button
                    title="Reset"
                    handlePress={resetHandle}
                    containerStyles="ml-2 border border-secondary bg-transparent"
                    textStyles="text-secondary"
                  />
                </>
              )}
            </View>
          </View>
        </View>
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

export default LoginCredentials;
