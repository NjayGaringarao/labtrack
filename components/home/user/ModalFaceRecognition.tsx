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
import { authenticateFace, extractDescriptorFromLandmarks } from "@/lib/face";
import { useGlobalContext } from "@/context/GlobalProvider";
import { FaceGuideOverlay } from "@/components/FaceGuideOverlay";

interface IModalFace {
  onRequestClose: () => void;
  onSuccess: () => void;
}

const ModalFaceRecognition = ({ onRequestClose, onSuccess }: IModalFace) => {
  const { userInfo } = useGlobalContext();
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);
  const [landmarkBuffer, setLandmarkBuffer] = useState<Landmarks[]>([]);
  const [attemptCount, setAttemptCount] = useState(0);

  const device = RNVC.useCameraDevice("front");

  const DETECTION_INTERVAL_MS = 50;
  const LANDMARK_BUFFER_SIZE = 10;
  const MAX_ATTEMPTS = 3;

  const lastDetectionTimeRef = useRef(0);
  const isProcessingRef = useRef(false);

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
        !faces[0]?.landmarks
      ) {
        return;
      }

      const newLandmarks = faces[0].landmarks;

      // Check if all required landmarks are present before adding
      const requiredKeys: (keyof Landmarks)[] = [
        "LEFT_EYE",
        "RIGHT_EYE",
        "NOSE_BASE",
        "MOUTH_LEFT",
        "MOUTH_RIGHT",
        "MOUTH_BOTTOM",
      ];

      const isValid = requiredKeys.every(
        (key) =>
          newLandmarks[key] &&
          typeof newLandmarks[key].x === "number" &&
          typeof newLandmarks[key].y === "number"
      );

      if (!isValid) {
        return; // Skip this frame — incomplete landmark data
      }

      lastDetectionTimeRef.current = now;
      isProcessingRef.current = true;

      setLandmarkBuffer((prev) => {
        const updated = [...prev, newLandmarks];
        return updated.slice(-LANDMARK_BUFFER_SIZE); // keep buffer trimmed
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
      normalizedStoredDescriptor
    ) {
      const success = authenticateFace(
        normalizedStoredDescriptor,
        landmarkBuffer
      );

      if (success) {
        console.log("✅ Face authenticated!");
        setIsRecognitionActive(false);
        setLandmarkBuffer([]);
        onSuccess();
      } else {
        setAttemptCount((prev) => prev + 1);

        if (attemptCount + 1 >= MAX_ATTEMPTS) {
          setIsRecognitionActive(false);
          onRequestClose();
          setTimeout(() => {
            Alert.alert(
              "Face Authentication Failed",
              "Please try again later."
            );
          }, 300);
        } else {
          setTimeout(() => {
            setLandmarkBuffer([]);
          }, 100);
        }
      }
    }
  }, [landmarkBuffer]);

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
              <View>
                <View style={{ borderRadius: 8, overflow: "hidden" }}>
                  {isRecognitionActive ? (
                    <Camera
                      style={{ height: 384, width: "100%" }}
                      device={device}
                      faceDetectionCallback={handleFacesDetection}
                      faceDetectionOptions={faceDetectionOptions}
                      isActive={isRecognitionActive}
                      zoom={1.2}
                    />
                  ) : (
                    <RNVC.Camera
                      style={{ height: 384, width: "100%" }}
                      device={device}
                      isActive={true}
                      zoom={1.2}
                    />
                  )}
                  <FaceGuideOverlay />
                </View>

                <View className="mt-2">
                  <Text className=" text-lg text-uBlack">
                    - Align your face within the circle
                  </Text>
                  <Text className=" text-lg text-uBlack -mt-2">
                    - Good lighting is required
                  </Text>
                </View>

                <Button
                  title={isRecognitionActive ? "Stop" : "Authenticate"}
                  handlePress={() => {
                    setLandmarkBuffer([]);
                    setIsRecognitionActive((prev) => !prev);
                  }}
                  containerStyles="mt-4"
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
