import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={style.title}>Dc Downloader</Text>
      <Text style={{ fontStyle: "italic", fontSize: 10 }}>
        Masih tahap development fitur akan terus di tambahkan
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {["TikTok"].map((title) => (
          <Pressable
            key={title}
            onPress={() => router.push(`/${title.toLowerCase()}` as any)}
            style={({ pressed }) => ({
              width: 140,
              height: 80,
              margin: 8,
              borderRadius: 8,
              backgroundColor: pressed ? "#1976D2" : "#2196F3",
              justifyContent: "center",
              alignItems: "center",
            })}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>{title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 12,
  },
});
