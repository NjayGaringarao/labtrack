// components/signupSteps/AccountTypeForm.tsx
import React from "react";
import { Text, View } from "react-native";
import ItemPicker from "../ItemPicker";
import { Picker } from "@react-native-picker/picker";
import Button from "../Button";

interface IAccountTypeForm {
  accountType: string;
  setAccountType: (param: string) => void;
  onNext: () => void;
}

const AccountTypeForm = ({
  accountType,
  setAccountType,
  onNext,
}: IAccountTypeForm) => (
  <>
    <Text className="text-lg text-uBlack font-bold mb-2">
      Select Account Type
    </Text>
    <ItemPicker value={accountType} onChange={setAccountType}>
      <Picker.Item label="Student" value="STUDENT" />
      <Picker.Item label="Employee" value="EMPLOYEE" />
      <Picker.Item label="Administrator" value="ADMIN" />
    </ItemPicker>
    <View className="flex-row justify-center gap-4 mt-6">
      <Button
        title="Next"
        handlePress={() => onNext()}
        containerStyles="flex-1"
      />
    </View>
  </>
);

export default AccountTypeForm;
