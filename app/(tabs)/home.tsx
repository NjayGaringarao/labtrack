import AdminHome from "@/components/home/admin/AdminHome";
import UserHome from "@/components/home/user/UserHome";
import { useGlobalContext } from "@/context/GlobalProvider";
import React from "react";
import { Text, View } from "react-native";

const home = () => {
  const { user } = useGlobalContext();
  return (
    <View className="flex-1 bg-background">
      <View className="w-full py-4 bg-primary items-center">
        <Text className="text-3xl text-white font-bold">LABTRACK</Text>
      </View>
      {user && user.labels[0] === "ADMIN" ? <AdminHome /> : <UserHome />}
    </View>
  );
};

export default home;
