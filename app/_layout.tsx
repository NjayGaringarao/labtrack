import { GlobalProvider } from "@/context/GlobalProvider";
import customToastConfig from "@/lib/toastConfig";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    Mono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex flex-1">
      <GlobalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </GlobalProvider>
      <Toast config={customToastConfig} />
    </SafeAreaView>
  );
}
