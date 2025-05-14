import { View, Text, Alert } from "react-native";
import React, { useRef, useState } from "react";
import * as RNVC from "react-native-vision-camera";
import {
  Face,
  Camera,
  FaceDetectionOptions,
  Landmarks,
} from "react-native-vision-camera-face-detector";
import { FaceGuideOverlay } from "@/components/FaceGuideOverlay";
import Button from "@/components/Button";
import { isValidLandmarks } from "@/lib/face";
import FaceCameraTip from "./FaceCameraTip";
import Loading from "../Loading";

interface IFaceRegistrationForm {
  onBack: () => void;
  onNext: () => void;
  faceDescriptor?: Landmarks;
  setFaceDescriptor: (param?: Landmarks) => void;
}

const FaceRegistrationForm = ({
  onBack,
  faceDescriptor,
  setFaceDescriptor,
  onNext,
}: IFaceRegistrationForm) => {
  const [isDetectionActive, setIsDetectionActive] = useState(false);
  const device = RNVC.useCameraDevice("front");
  const lastDetectionTimeRef = useRef(0);
  const DETECTION_INTERVAL_MS = 300;

  const faceDetectionOptions: FaceDetectionOptions = {
    performanceMode: "accurate",
    landmarkMode: "all",
    minFaceSize: 0.6,
  };

  const handleFacesDetection = (faces: Face[]) => {
    const now = Date.now();
    if (
      !isDetectionActive ||
      now - lastDetectionTimeRef.current < DETECTION_INTERVAL_MS
    )
      return;

    lastDetectionTimeRef.current = now;

    if (!faces[0].landmarks || !isValidLandmarks(faces[0].landmarks)) return;

    setFaceDescriptor(faces[0].landmarks);
    setIsDetectionActive(false);

    Alert.alert("Success", "Face landmark captured. Please proceed or retry.");
  };

  const registrationTips = [
    "Note: Once registered, your face data cannot be changed.",
    "Ensure the camera lens is clean for a clear image.",
    "Use a well-lit environment to improve detection accuracy.",
    "Avoid strong backlighting that could create shadows on your face.",
    "Remove any accessories like glasses or hats that may obstruct your face.",
    "Ensure your face is fully visible within the oval guide.",
    "Keep your face steady and look directly at the camera.",
    "Keep a neutral face while the detection is running.",
  ];

  return (
    <>
      <View className="w-full h-auto rounded-md">
        {!device ? (
          <View className="w-full h-auto justify-center items-center rounded-lg ">
            <Text className="text-xl text-white">No Camera Detected</Text>
          </View>
        ) : RNVC.Camera.getCameraPermissionStatus() === "granted" ? (
          <View className="gap-2">
            <View style={{ borderRadius: 8, overflow: "hidden" }}>
              {faceDescriptor || isDetectionActive ? (
                <Camera
                  style={{ height: 256, width: "100%" }}
                  device={device}
                  isActive={isDetectionActive && !faceDescriptor}
                  faceDetectionCallback={handleFacesDetection}
                  faceDetectionOptions={faceDetectionOptions}
                  zoom={1.4}
                />
              ) : (
                <RNVC.Camera
                  style={{ height: 256, width: "100%" }}
                  device={device}
                  isActive={true}
                  zoom={1.4}
                />
              )}
              {!faceDescriptor && <FaceGuideOverlay />}
            </View>

            {isDetectionActive ? (
              <View className="w-full h-16">
                <Loading
                  loadingPrompt="Keep your face steady."
                  indicatorSize="small"
                />
              </View>
            ) : (
              <FaceCameraTip
                title="Face Registration Tips:"
                tips={registrationTips}
              />
            )}
          </View>
        ) : (
          <View className="w-full h-96 bg-secondary justify-center items-center rounded-lg">
            <View className="flex-1 justify-center items-center px-4 -mb-10">
              <Text className="text-xl font-medium text-uBlack text-center">
                LABTRACK does not have access to your camera.
              </Text>
            </View>
            <View className="p-4 w-full">
              {RNVC.Camera.getCameraPermissionStatus() === "not-determined" ? (
                <Button
                  title="Request Access"
                  handlePress={async () =>
                    await RNVC.Camera.requestCameraPermission()
                  }
                />
              ) : (
                <Text className="text-uBlack text-xs text-center">
                  You can change this from the device settings.
                </Text>
              )}
            </View>
          </View>
        )}
      </View>

      <View className="flex-row justify-center gap-2 mt-2">
        <Button
          title="Back"
          handlePress={onBack}
          containerStyles="flex-1"
          isSecondary
          isDisabled={isDetectionActive}
        />

        {!faceDescriptor ? (
          <Button
            title={isDetectionActive ? "Stop" : "Scan"}
            handlePress={() => {
              setIsDetectionActive((prev) => !prev);
              setFaceDescriptor(undefined);
            }}
            containerStyles="flex-1"
          />
        ) : (
          <>
            <Button
              title="Retry"
              handlePress={() => setFaceDescriptor(undefined)}
              containerStyles="flex-1"
              isSecondary
            />
            <Button
              title="Next"
              handlePress={() => {
                if (!faceDescriptor) {
                  Alert.alert("Info", "Please capture your face first.");
                  return;
                }
                setFaceDescriptor(faceDescriptor);
                onNext();
              }}
              containerStyles="flex-1"
            />
          </>
        )}
      </View>
    </>
  );
};

export default FaceRegistrationForm;
