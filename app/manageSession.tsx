import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Session } from "@/services/types/model";
import Toast from "react-native-toast-message";
import { getSessions } from "@/services/session";
import SessionItem from "@/components/home/admin/components/SessionItem";
import Button from "@/components/Button";

const manageSession = () => {
  const [sessionList, setSessionList] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const querySessions = async () => {
    try {
      setIsLoading(true);
      setSessionList(await getSessions());
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Fetch Failed",
        text2: `There was an error querying active sessions.`,
        visibilityTime: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    querySessions();
  }, []);
  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="h-16 w-full flex-row items-center bg-primary pr-4">
        <TouchableOpacity className="px-4 py-2" onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color="white" />
        </TouchableOpacity>

        <View>
          <Text className="text-2xl font-bold text-white">Active Session</Text>
        </View>
      </View>

      {/* Refreshable FlatList */}
      {sessionList.length > 0 ? (
        <FlatList
          data={sessionList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SessionItem
              session={item}
              handleRefreshSessionList={querySessions}
            />
          )}
          refreshing={isLoading}
          onRefresh={querySessions}
          className="m-4 flex-1"
        />
      ) : (
        <View className="flex-1 items-center justify-center gap-3">
          <Text className="text-xl text-uBlack">No active sessions found.</Text>
          <Button
            title="Refresh"
            handlePress={querySessions}
            isDisabled={isLoading}
          />
        </View>
      )}
    </View>
  );
};

export default manageSession;
