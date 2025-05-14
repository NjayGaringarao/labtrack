import { View, Text, Modal, Alert } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Button from "../../Button";
import * as RNVC from "react-native-vision-camera";
import {
  Face,
  Camera,
  FaceDetectionOptions,
  Landmarks,
} from "react-native-vision-camera-face-detector";
import {
  authenticateFace,
  extractDescriptorFromLandmarks,
  REQUIRED_FACE_LANDMARK_KEYS,
} from "@/lib/face";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FaceGuideOverlay } from "@/components/FaceGuideOverlay";
import Loading from "@/components/Loading";
import FaceCameraTip from "@/components/sign-up/FaceCameraTip";

interface IModalFace {
  onRequestClose: () => void;
  onSuccess: () => void;
}

const ModalFaceRecognition = ({ onRequestClose, onSuccess }: IModalFace) => {
  const { userInfo } = useGlobalContext();
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);
  const [landmarkBuffer, setLandmarkBuffer] = useState<Landmarks[]>([]);

  const device = RNVC.useCameraDevice("front");

  const DETECTION_INTERVAL_MS = 200;
  const LANDMARK_BUFFER_SIZE = 20;
  const lastDetectionTimeRef = useRef(0);
  const isProcessingRef = useRef(false);
  const hasProcessedRef = useRef(false);

  const faceDetectionOptions: FaceDetectionOptions = {
    performanceMode: "fast",
    landmarkMode: "all",
    contourMode: "all",
    minFaceSize: 0.15,
  };

  const normalizedStoredDescriptor = useMemo(() => {
    if (!userInfo.face_descriptor) return null;
    return extractDescriptorFromLandmarks(userInfo.face_descriptor);
  }, [userInfo.face_descriptor]);

  const handleFacesDetection = React.useCallback(
    (faces: Face[]) => {
      const now = Date.now();

      if (
        !isRecognitionActive ||
        isProcessingRef.current ||
        now - lastDetectionTimeRef.current < DETECTION_INTERVAL_MS ||
        !normalizedStoredDescriptor ||
        !faces ||
        faces.length === 0 ||
        !faces[0]?.landmarks
      ) {
        return;
      }

      const newLandmarks = faces[0].landmarks;

      const isValid = REQUIRED_FACE_LANDMARK_KEYS.every(
        (key) =>
          newLandmarks[key] &&
          typeof newLandmarks[key].x === "number" &&
          typeof newLandmarks[key].y === "number"
      );

      if (!isValid) return;

      lastDetectionTimeRef.current = now;
      isProcessingRef.current = true;

      setLandmarkBuffer((prev) => {
        const updated = [...prev, newLandmarks];
        return updated.slice(-LANDMARK_BUFFER_SIZE);
      });

      setTimeout(() => {
        isProcessingRef.current = false;
      }, DETECTION_INTERVAL_MS);
    },
    [isRecognitionActive, normalizedStoredDescriptor]
  );

  useEffect(() => {
    if (
      isRecognitionActive &&
      landmarkBuffer.length >= LANDMARK_BUFFER_SIZE &&
      normalizedStoredDescriptor &&
      !hasProcessedRef.current
    ) {
      hasProcessedRef.current = true;

      try {
        const success = authenticateFace(
          normalizedStoredDescriptor,
          landmarkBuffer
        );

        setIsRecognitionActive(false);

        if (success) {
          console.log("✅ Face authenticated!");
          setLandmarkBuffer([]);
          onSuccess();
        } else {
          onRequestClose();
          setTimeout(() => {
            Alert.alert(
              "Not Recognized",
              "Please try again with recommended setup."
            );
          }, 300);
        }
      } catch (error) {
        console.error("Authentication crash:", error);
        Alert.alert(
          "Error",
          "Something went wrong during face authentication."
        );
        setIsRecognitionActive(false);
      }
    }
  }, [landmarkBuffer]);

  const recognitionTips = [
    "Ensure the camera lens is clean for a clear image.",
    "Use a well-lit environment to improve detection accuracy.",
    "Avoid strong backlighting that could create shadows on your face.",
    "Remove any accessories like glasses or hats that may obstruct your face.",
    "Ensure your face is fully visible within the oval guide.",
    "Keep your face steady and look directly at the camera.",
    "Keep a neutral face while the detection is running.",
  ];

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onRequestClose}
    >
      <>
        <View className="absolute h-full w-full bg-black opacity-80" />
        <View className="h-full w-full p-8 justify-center">
          <View className="rounded-lg bg-background p-4 gap-4 overflow-hidden">
            {!device ? (
              <View className="w-full h-96 bg-uBlack justify-center items-center rounded-lg">
                <Text className="text-xl text-white">No Camera Detected</Text>
              </View>
            ) : RNVC.Camera.getCameraPermissionStatus() === "granted" ? (
              <View className="gap-2">
                <View style={{ borderRadius: 8, overflow: "hidden" }}>
                  {isRecognitionActive ? (
                    <Camera
                      style={{ height: 256, width: "100%" }}
                      device={device}
                      faceDetectionCallback={handleFacesDetection}
                      faceDetectionOptions={faceDetectionOptions}
                      isActive={isRecognitionActive}
                      zoom={1.3}
                    />
                  ) : (
                    <RNVC.Camera
                      style={{ height: 256, width: "100%" }}
                      device={device}
                      isActive={true}
                      zoom={1.3}
                    />
                  )}
                  <FaceGuideOverlay />
                </View>
                {isRecognitionActive ? (
                  <>
                    <View className="w-full h-16">
                      <Loading
                        loadingPrompt="Keep your face steady."
                        indicatorSize="small"
                      />
                    </View>
                    <View
                      className="bg-primary h-6"
                      style={{
                        width: `${
                          (landmarkBuffer.length / LANDMARK_BUFFER_SIZE) * 100
                        }%`,
                      }}
                    />
                  </>
                ) : (
                  <FaceCameraTip
                    title="Face Recognition Tips:"
                    tips={recognitionTips}
                  />
                )}

                <Button
                  title={isRecognitionActive ? "Stop" : "Authenticate"}
                  handlePress={() => {
                    setLandmarkBuffer([]);
                    setIsRecognitionActive((prev) => !prev);
                    hasProcessedRef.current = false;
                  }}
                />
              </View>
            ) : (
              <View className="w-full h-96 bg-secondary justify-center items-center rounded-lg">
                <View className="flex-1 justify-center items-center px-4 -mb-10">
                  <Text className="text-xl font-medium text-uBlack text-center">
                    LABTRACK does not have an access to your camera.
                  </Text>
                </View>
                <View className="p-4 w-full">
                  {RNVC.Camera.getCameraPermissionStatus() ==
                  "not-determined" ? (
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
        </View>
      </>
    </Modal>
  );
};

export default ModalFaceRecognition;
