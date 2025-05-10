import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

import Button from "../Button";
import AccountTypeForm from "./AccountTypeForm";
import NameForm from "./NameForm";
import OrgRoleForm from "./OrgRoleForm";
import CredentialForm from "./CredentialForm";
import FaceRegistrationForm from "./FaceRegistrationForm";
import SummaryForm from "./SummaryForm";
import image from "@/constants/image";

const SignUpForm = () => {
  const [step, setStep] = useState(0);

  const [accountType, setAccountType] = useState("STUDENT");
  const [employeeRole, setEmployeeRole] = useState("TEACHING-STAFF");

  const [nameForm, setNameForm] = useState({ first: "", middle: "", last: "" });

  const [studentForm, setStudentForm] = useState({
    dep_prog: "CCIT-BSCS",
    year_level: "FIRST",
  });

  const [credentialForm, setCredentialForm] = useState({
    identifier: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const signUpHandle = async () => {
    try {
      setIsSubmitting(true);
      // API submission logic here
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Account created!",
      });
      router.replace("/(auth)/sign_in");
    } catch (error) {
      Toast.show({ type: "error", text1: "Sign Up Failed", text2: `${error}` });
    } finally {
      setIsSubmitting(false);
    }
  };
  const nextNextStep = () => setStep((prev) => prev + 2);
  const prevPrevStep = () => setStep((prev) => prev - 2);
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <AccountTypeForm
            accountType={accountType}
            setAccountType={setAccountType}
            onNext={nextStep}
          />
        );
      case 1:
        return (
          <NameForm
            nameForm={nameForm}
            setNameForm={setNameForm}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 2:
        return (
          <OrgRoleForm
            accountType={accountType}
            studentForm={studentForm}
            setStudentForm={setStudentForm}
            employeeRole={employeeRole}
            setEmployeeRole={setEmployeeRole}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <CredentialForm
            credentialForm={credentialForm}
            setCredentialForm={setCredentialForm}
            accountType={accountType}
            onNext={nextStep}
            onBack={prevStep}
            onNextNext={nextNextStep}
          />
        );
      case 4:
        return <FaceRegistrationForm onNext={nextStep} onBack={prevStep} />;
      case 5:
        return (
          <SummaryForm
            accountType={accountType}
            nameForm={nameForm}
            credentialForm={credentialForm}
            studentForm={studentForm}
            employeeRole={employeeRole}
            onBack={prevStep}
            onBackBack={prevPrevStep}
            onSubmit={signUpHandle}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 w-11/12 items-center justify-center mt-8">
      <View className="w-full flex-row gap-2 items-center mb-4">
        <View className="w-16 h-16 bg-secondary rounded-lg p-2">
          <Image source={image.labrack} className="w-full h-full" />
        </View>
        <Text className="w-full text-6xl font-bold text-uBlack mt-2 flex-1">
          Sign In
        </Text>
      </View>
      <View className="w-full border border-secondary bg-background p-4 rounded-xl shadow-md">
        {renderStep()}
      </View>
      <Text
        className="text-center mt-4 text-uBlack font-semibold text-xl underline"
        onPress={() => router.replace("/(auth)/sign_in")}
      >
        Already have an account? Sign In
      </Text>
    </View>
  );
};

export default SignUpForm;
