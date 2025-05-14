// components/signupSteps/OrgRoleForm.tsx
import React from "react";
import { Text, View } from "react-native";
import ItemPicker from "../ItemPicker";
import { Picker } from "@react-native-picker/picker";
import Button from "../Button";

interface IOrgRoleForm {
  accountType: string;
  studentForm: { dep_prog: string; year_level: string };
  setStudentForm: (param: { dep_prog: string; year_level: string }) => void;
  employeeRole: string;
  setEmployeeRole: (param: string) => void;
  onBack: () => void;
  onNext: () => void;
}

const OrgRoleForm = ({
  accountType,
  studentForm,
  setStudentForm,
  employeeRole,
  setEmployeeRole,
  onBack,
  onNext,
}: IOrgRoleForm) => {
  if (accountType === "STUDENT") {
    return (
      <>
        <View className="w-full gap-2">
          <View className="w-full">
            <Text className="font-semibold text-uBlack text-base mb-1">
              Set Department - Program
            </Text>
            <ItemPicker
              value={studentForm.dep_prog}
              onChange={(value) =>
                setStudentForm({ ...studentForm, dep_prog: value })
              }
            >
              <Picker.Item label="CCIT - BSCS" value="CCIT-BSCS" />
              <Picker.Item label="CTE - BSED" value="CTE-BSED" />
              <Picker.Item label="CTE - BEED" value="CTE-BEED" />
              <Picker.Item label="CBAPA - BSBA" value="CBAPA-BSBA" />
            </ItemPicker>
          </View>

          <View className="w-full">
            <Text className="font-semibold text-uBlack text-base mb-1">
              Year Level
            </Text>
            <ItemPicker
              value={studentForm.year_level}
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
        </View>
        <View className="flex-row justify-center gap-4 mt-6">
          <Button
            title="Back"
            handlePress={() => onBack()}
            containerStyles="flex-1"
            isSecondary
          />

          <Button
            title="Next"
            handlePress={() => onNext()}
            containerStyles="flex-1"
          />
        </View>
      </>
    );
  }

  return (
    <View className="w-full">
      {accountType === "STUDENT" ? (
        <View className="w-full gap-2">
          <View className="w-full">
            <Text className="font-semibold text-uBlack text-base mb-1">
              Set Department - Program
            </Text>
            <ItemPicker
              value={studentForm.dep_prog}
              onChange={(value) =>
                setStudentForm({ ...studentForm, dep_prog: value })
              }
            >
              <Picker.Item label="CCIT - BSCS" value="CCIT-BSCS" />
              <Picker.Item label="CTE - BSED" value="CTE-BSED" />
              <Picker.Item label="CTE - BEED" value="CTE-BEED" />
              <Picker.Item label="CBAPA - BSBA" value="CBAPA-BSBA" />
            </ItemPicker>
          </View>

          <View className="w-full">
            <Text className="font-semibold text-uBlack text-base mb-1">
              Year Level
            </Text>
            <ItemPicker
              value={studentForm.year_level}
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
        </View>
      ) : (
        <>
          <Text className="font-semibold text-uBlack text-base mb-1">
            Employee Role
          </Text>
          <ItemPicker
            value={employeeRole}
            onChange={(value) => setEmployeeRole(value)}
          >
            <Picker.Item label="Teaching Staff" value="TEACHING-STAFF" />
            <Picker.Item
              label="Non-Teaching Staff"
              value="NON-TEACHING-STAFF"
            />
          </ItemPicker>
        </>
      )}
      <View className="flex-row justify-center gap-4 mt-6">
        <Button
          title="Back"
          handlePress={() => onBack()}
          containerStyles="flex-1"
          isSecondary
        />

        <Button
          title="Next"
          handlePress={() => onNext()}
          containerStyles="flex-1"
        />
      </View>
    </View>
  );
};

export default OrgRoleForm;
