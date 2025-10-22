import { API_KEY } from "@env";
import { axiosInstance } from "../axios";
import { VideoData } from "@/types/downloader.types";

export const fetchTikTokData = async (url: string): Promise<VideoData> => {
  try {
    const response = await axiosInstance.get("/downloader/ttsave", {
      params: { apikey: API_KEY, url: url },
    });
    const data = response.data;
    return {
      title: data.title || "TikTok Video",
      author: data.nickname || "Unknown",
      thumbnail: data.dlink.cover || "",
      downloadOptions: [
        {
          label: "Video HD (No Watermark)",
          url: data.dlink.nowm,
          icon: "🎥",
        },
        {
          label: "Music/Audio",
          url: data.dlink.audio,
          icon: "🎵",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching TikTok data:", error);
    throw error;
  }
};
