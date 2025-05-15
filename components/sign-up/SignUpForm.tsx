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
import { regex } from "@/constants/regex";
import { isEmailExisting, isUserIdExisting } from "@/services/credentials";
import { signUp } from "@/services/auth";
import { signInUser } from "@/services/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";
import { Landmarks } from "react-native-vision-camera-face-detector";
import { serializeLandmarks } from "@/lib/face";

const SignUpForm = () => {
  const { initializeGlobalState } = useGlobalContext();
  const [step, setStep] = useState(0);

  const [accountType, setAccountType] = useState("STUDENT");
  const [employeeRole, setEmployeeRole] = useState("TEACHING-STAFF");

  const [nameForm, setNameForm] = useState({ first: "", middle: "", last: "" });
  const [faceDescriptor, setFaceDescriptor] = useState<Landmarks>();
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

  const validateInput = async () => {
    if (!regex.email.test(credentialForm.email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please provide your valid email.",
        visibilityTime: 5000,
      });
      return false;
    }

    if (!regex.password.test(credentialForm.password)) {
      Toast.show({
        type: "error",
        text1: "Weak Password",
        text2:
          "Password should be more than 8 characters long containing alphanumeric and other special characters (_!@#$%^&.,). It should also not be the same with the old password",
        visibilityTime: 5000,
      });
      return false;
    }

    if (credentialForm.password !== credentialForm.conPassword) {
      Toast.show({
        type: "error",
        text1: "Unmatched password",
        text2: "Make sure that confirm password matches your given password.",
        visibilityTime: 5000,
      });
      return false;
    }

    if (await isUserIdExisting(credentialForm.identifier)) {
      Toast.show({
        type: "error",
        text1: "ID Already Used",
        text2: "Using the same ID for multiple account is not allowed.",
        visibilityTime: 5000,
      });
      return false;
    }

    if (await isEmailExisting(credentialForm.email)) {
      Toast.show({
        type: "error",
        text1: "Email Already Used",
        text2: "Please try again with different email.",
        visibilityTime: 5000,
      });
      return false;
    }
    return true;
  };

  const signUpHandle = async () => {
    try {
      setIsSubmitting(true);
      if (!(await validateInput())) {
        throw "a";
      }

      await signUp({
        id: credentialForm.identifier,
        name: [
          nameForm.first,
          nameForm.middle.length ? nameForm.middle : undefined,
          nameForm.last,
        ],
        email: credentialForm.email,
        password: credentialForm.password,
        accountType: accountType,
        employee_role: employeeRole,
        year_level: studentForm.year_level,
        dep_prog: studentForm.dep_prog,
        face_descriptor: faceDescriptor
          ? serializeLandmarks(faceDescriptor)
          : undefined,
      });

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Account created!",
      });

      try {
        await signInUser(credentialForm.email, credentialForm.password);
        await initializeGlobalState();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Sign In Failed",
          text2: `${error}`,
        });
        router.replace("/(auth)/sign_in");
      }
    } catch (error) {
      if (error != "a")
        Toast.show({
          type: "error",
          text1: "Sign Up Failed",
          text2: `${error}`,
        });
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
        return (
          <FaceRegistrationForm
            onNext={nextStep}
            onBack={prevStep}
            setFaceDescriptor={setFaceDescriptor}
            faceDescriptor={faceDescriptor}
          />
        );
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
          Sign Up
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
