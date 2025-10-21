import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 25,
          color: "green",
          fontWeight: "bold",
          shadowColor: "black",
          shadowOffset: { width: 2, height: 2 },
          shadowOpacity: 0.5,
          shadowRadius: 3,
          paddingBottom: 10,
        }}
      >
        Welcome to demtimcod
      </Text>

      <Button title="Log in" onPress={() => alert("hello anjai")} />
    </View>
  );
}
