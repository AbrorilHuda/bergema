// types/downloader.types.ts
export interface DownloadOption {
  label: string;
  url: string;
  icon: string;
}

export interface VideoData {
  title: string;
  author: string;
  thumbnail: string;
  downloadOptions: DownloadOption[];
}
