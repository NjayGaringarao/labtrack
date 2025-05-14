import React from "react";
import TextBox from "../TextBox";
import { View } from "react-native";
import Button from "../Button";

interface INameForm {
  nameForm: { first: string; middle: string; last: string };
  setNameForm: (param: { first: string; middle: string; last: string }) => void;
  onBack: () => void;
  onNext: () => void;
}
const NameForm = ({ nameForm, setNameForm, onBack, onNext }: INameForm) => (
  <>
    <View className="w-full gap-2">
      <TextBox
        title="First Name"
        textValue={nameForm.first}
        handleChangeText={(e) => setNameForm({ ...nameForm, first: e })}
        placeholder="Juan"
        containerStyles="w-full"
      />
      <TextBox
        title="Middle Name (Optional)"
        textValue={nameForm.middle}
        handleChangeText={(e) => setNameForm({ ...nameForm, middle: e })}
        placeholder="Acosta"
        containerStyles="w-full"
      />
      <TextBox
        title="Last Name"
        textValue={nameForm.last}
        handleChangeText={(e) => setNameForm({ ...nameForm, last: e })}
        placeholder="Dela Cruz"
        containerStyles="w-full"
      />
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
        isDisabled={nameForm.first.length < 3 || nameForm.last.length < 3}
      />
    </View>
  </>
);

export default NameForm;
