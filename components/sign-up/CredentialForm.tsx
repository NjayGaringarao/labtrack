import React from "react";
import TextBox from "../TextBox";
import Button from "../Button";
import { View } from "react-native";
import { regex } from "@/constants/regex";

interface ICredentialForm {
  credentialForm: {
    identifier: string;
    email: string;
    password: string;
    conPassword: string;
  };
  setCredentialForm: (param: {
    identifier: string;
    email: string;
    password: string;
    conPassword: string;
  }) => void;
  accountType: string;
  onBack: () => void;
  onNext: () => void;
  onNextNext: () => void;
}

const CredentialForm = ({
  credentialForm,
  setCredentialForm,
  accountType,
  onBack,
  onNext,
  onNextNext,
}: ICredentialForm) => (
  <>
    <TextBox
      title={
        accountType === "USER-STUDENT" ? "Student Number" : "Employee Number"
      }
      textValue={credentialForm.identifier}
      handleChangeText={(e) =>
        setCredentialForm({ ...credentialForm, identifier: e })
      }
      placeholder="xx-x-x-xxxx"
      containerStyles="w-full"
    />
    <TextBox
      title="Email"
      textValue={credentialForm.email}
      handleChangeText={(e) =>
        setCredentialForm({ ...credentialForm, email: e })
      }
      placeholder="iamuser@gmail.com"
      containerStyles="w-full"
    />
    <TextBox
      title="Password"
      textValue={credentialForm.password}
      handleChangeText={(e) =>
        setCredentialForm({ ...credentialForm, password: e })
      }
      placeholder="Labtrack@Now"
      containerStyles="w-full"
      isPassword
    />
    <TextBox
      title="Confirm Password"
      textValue={credentialForm.conPassword}
      handleChangeText={(e) =>
        setCredentialForm({ ...credentialForm, conPassword: e })
      }
      placeholder="Labtrack@Now"
      containerStyles="w-full"
      isPassword
    />

    <View className="flex-row justify-center gap-4 mt-6">
      <Button
        title="Back"
        handlePress={() => onBack()}
        containerStyles="flex-1"
      />

      <Button
        title="Next"
        handlePress={
          accountType === "ADMIN" ? () => onNextNext() : () => onNext()
        }
        containerStyles="flex-1"
        isDisabled={
          credentialForm.identifier.length < 10 ||
          !regex.email.test(credentialForm.email) ||
          !regex.password.test(credentialForm.password) ||
          credentialForm.password !== credentialForm.conPassword
        }
      />
    </View>
  </>
);

export default CredentialForm;
