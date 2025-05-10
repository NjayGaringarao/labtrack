// components/signupSteps/SummaryForm.tsx
import React from "react";
import { Text, View } from "react-native";
import Button from "../Button";

interface ISummaryForm {
  accountType: string;
  nameForm: { first: string; middle: string; last: string };
  credentialForm: {
    identifier: string;
    email: string;
    password: string;
    conPassword: string;
  };
  studentForm: { dep_prog: string; year_level: string };
  employeeRole: string;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  onBackBack: () => void;
}

const SummaryForm = ({
  accountType,
  nameForm,
  credentialForm,
  studentForm,
  employeeRole,
  onBackBack,
  onBack,
  onSubmit,
  isSubmitting,
}: ISummaryForm) => {
  return (
    <View className="gap-2">
      <Text className="text-lg font-bold text-uBlack">SUMMARY</Text>
      <View className="ml-4">
        <Text>Account Type: {accountType}</Text>
        <Text>
          Full Name: {nameForm.first} {nameForm.middle} {nameForm.last}
        </Text>
        {accountType === "STUDENT" ? (
          <>
            <Text>Program: {studentForm.dep_prog}</Text>
            <Text>Year Level: {studentForm.year_level}</Text>
          </>
        ) : (
          <Text>Employee Role: {employeeRole}</Text>
        )}
        <Text>Email: {credentialForm.email}</Text>
        <Text>Identifier: {credentialForm.identifier}</Text>
        <Text>Password: {credentialForm.password}</Text>
      </View>
      <View className="flex-row justify-center gap-4 mt-6">
        <Button
          title="Back"
          handlePress={
            accountType == "ADMIN" ? () => onBackBack() : () => onBack()
          }
          containerStyles="flex-1"
          isDisabled={isSubmitting}
        />

        <Button
          title="Confirm"
          handlePress={() => onSubmit()}
          containerStyles="flex-1"
          isDisabled={isSubmitting}
        />
      </View>
    </View>
  );
};

export default SummaryForm;
