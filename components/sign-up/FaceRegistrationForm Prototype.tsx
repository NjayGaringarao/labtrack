// components/signupSteps/FaceRegistrationForm.tsx
import React, { useEffect, useState, useRef } from "react";
import { Text, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from "react-native-vision-camera";
import { runOnJS } from "react-native-reanimated";
import {
  Face,
  useFaceDetector,
  FaceDetectionOptions,
} from "react-native-vision-camera-face-detector";
import Button from "../Button";

interface IFaceRegistrationForm {
  onBack: () => void;
  onNext: () => void;
  face: Face | null;
  setFace: React.Dispatch<React.SetStateAction<Face | null>>;
}

const FaceRegistrationForm = ({
  onBack,
  onNext,
  face,
  setFace,
}: IFaceRegistrationForm) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanning, setScanning] = useState(false);
  const device = useCameraDevice("front");
  const { detectFaces } = useFaceDetector();

  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    performanceMode: "fast",
    landmarkMode: "none",
    contourMode: "none",
    classificationMode: "none",
    trackingEnabled: true,
    minFaceSize: 0.15,
  }).current;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === "granted");
    })();
  }, []);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      if (!scanning) return;
      const faces = detectFaces(frame);
      if (faces.length > 0) {
        runOnJS(setFace)(faces[0]);
        runOnJS(setScanning)(false);
      }
    },
    [detectFaces, scanning]
  );

  if (!device || !hasPermission) {
    return <Text>No Camera Access</Text>;
  }

  return (
    <>
      <View className="w-full h-96 bg-black rounded-md">
        {scanning ? (
          <Camera
            style={{ flex: 1 }}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
          />
        ) : face ? (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white">Face Registered</Text>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white">No Face Registered</Text>
          </View>
        )}
      </View>

      <View className="flex-row justify-center gap-4 mt-6">
        <Button title="Back" handlePress={onBack} containerStyles="flex-1" />

        {face === null ? (
          <Button
            title={scanning ? "Scanning..." : "Scan Face"}
            handlePress={() => setScanning(true)}
            containerStyles="flex-1"
            isDisabled={scanning}
          />
        ) : (
          <>
            <Button
              title="Clear"
              handlePress={() => {
                setFace(null);
                setScanning(false);
              }}
              containerStyles="flex-1"
            />
            <Button
              title="Next"
              handlePress={onNext}
              containerStyles="flex-1"
            />
          </>
        )}
      </View>
    </>
  );
};

export default FaceRegistrationForm;
