// TikTokDownloader.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Modal,
  Image,
  Linking,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { fetchTikTokData } from "@/lib/api/tiktok";
import { VideoData } from "@/types/downloader.types";

export default function TikTokDownloader() {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);

  const handlePaste = async () => {
    const text = await Clipboard.getStringAsync();
    if (text) setLink(text);
  };

  const handleDownload = async () => {
    if (!link.trim()) {
      Alert.alert("Error", "Paste link first");
      return;
    }

    try {
      setLoading(true);
      const data = await fetchTikTokData(link);
      setVideoData(data);
      setShowModal(true);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadFile = (url: string, label: string) => {
    // Open in browser untuk download
    Linking.openURL(url);
    Alert.alert("Download", `Opening ${label}...`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Paste TikTok link here"
            value={link}
            onChangeText={setLink}
            editable={!loading}
          />
          <TouchableOpacity style={styles.pasteBtn} onPress={handlePaste}>
            <Text style={styles.pasteTxt}>📋 Paste</Text>
          </TouchableOpacity>
        </View>

        {/* Download Button */}
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={handleDownload}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.downloadTxt}>⬇️ Download</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Modal Results */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeTxt}>✕</Text>
            </TouchableOpacity>

            {videoData && (
              <>
                {/* Thumbnail & Author */}
                <Image
                  source={{ uri: videoData.thumbnail }}
                  style={styles.thumbnail}
                />
                <Text style={styles.author}>@{videoData.author}</Text>
                <Text style={styles.title}>{videoData.title}</Text>

                {/* Download Buttons */}
                <View style={styles.downloadList}>
                  {videoData.downloadOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.optionBtn}
                      onPress={() =>
                        handleDownloadFile(option.url, option.label)
                      }
                    >
                      <Text style={styles.optionIcon}>{option.icon}</Text>
                      <Text style={styles.optionLabel}>{option.label}</Text>
                      <Text style={styles.optionArrow}>→</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  pasteBtn: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    margin: 4,
  },
  pasteTxt: {
    color: "#fff",
    fontWeight: "600",
  },
  downloadBtn: {
    backgroundColor: "#10b981",
    height: 56,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  downloadTxt: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: "80%",
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 8,
  },
  closeTxt: {
    fontSize: 24,
    color: "#666",
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    marginBottom: 12,
  },
  author: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  downloadList: {
    gap: 12,
  },
  optionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  optionLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  optionArrow: {
    fontSize: 20,
    color: "#666",
  },
});
