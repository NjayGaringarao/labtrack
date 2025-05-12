import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Log } from "@/services/types/model";
import { getLogs } from "@/services/logging";
import Toast from "react-native-toast-message";
import LogItem from "./LogItem";
import LogEmptyList from "./LogEmptyList";

const LogTimeline = () => {
  const [logList, setLogList] = useState<Log[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const queryLogList = async () => {
    try {
      setIsLoading(true);
      setLogList(await getLogs());
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed Load Log List",
        text2: `${error}`,
        visibilityTime: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    queryLogList();
  }, []);

  return (
    <View className="flex-1">
      <FlatList
        data={logList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LogItem log={item} />}
        refreshing={isLoading}
        onRefresh={queryLogList}
        ListEmptyComponent={<LogEmptyList />}
        className="mx-4"
      />
    </View>
  );
};

export default LogTimeline;
