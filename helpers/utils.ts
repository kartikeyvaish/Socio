// Packages Imports
import * as VideoThumbnails from "expo-video-thumbnails";

// Local Imports
import { MarginProps } from "../types/GlobalTypes";
import { FileItemProps } from "../types/AppTypes";
import {
  getUploadSignature,
  uploadFileToCloudinary,
} from "../api/services/File";
import env from "./env";

const CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY;
const CLOUDINARY_UPLOAD_PRESET = env.CLOUDINARY_UPLOAD_PRESET;

interface UploadFileProps extends FileItemProps {
  folderName?: string;
}

export function getMarginStyles(margins: MarginProps = {}) {
  if (margins.all) {
    return {
      margin: margins.all,
    };
  }

  return {
    marginTop: margins.top || 0,
    marginBottom: margins.bottom || 0,
    marginLeft: margins.left || 0,
    marginRight: margins.right || 0,
  };
}

// function to abbreviate a string
// 2500 becomes 2.5K
// 250000 becomes 2.5M
// 99 becomes 99
// 1500 becomes 1.5K
export function abbreviate_number(number: number) {
  if (!number) return "0";

  if (number < 1000) return number;

  if (number < 1000000) {
    return `${(number / 1000).toFixed(0)}K`;
  } else {
    return `${(number / 1000000).toFixed(0)}M`;
  }
}

export function commaSeperatedNumber(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function get_comment_count_words(count: number) {
  if (count === 0) {
    return "No comments";
  } else if (count === 1) {
    return `View ${count} comment`;
  } else {
    return `View all ${commaSeperatedNumber(count)} comments`;
  }
}

export function get_likes_words(likes: number) {
  if (likes === 0) {
    return "No likes";
  } else if (likes === 1) {
    return `1 like`;
  } else {
    return `${commaSeperatedNumber(likes)} likes`;
  }
}

export function getMimeTypeFromURL(fileUrl: string): string | null {
  const extension = fileUrl.split(".").pop();

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg"];
  const videoExtensions = ["mp4"];

  if (imageExtensions.includes(extension)) return `image/${extension}`;

  if (videoExtensions.includes(extension)) return `video/${extension}`;

  return null;
}

export function getFileType(fileUrl: string) {
  const extension = fileUrl.split(".").pop();

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "svg"];
  const videoExtensions = ["mp4"];

  if (imageExtensions.includes(extension)) return "image";

  if (videoExtensions.includes(extension)) return "video";

  return "unknown";
}

export function getFileNameFromURL(fileUrl: string): string {
  return fileUrl.split("/").pop() || "";
}

export function generateUniqueId() {
  return (
    new Date().getTime().toString() + Math.random().toString(36).substr(2, 9)
  );
}

export async function getThumbnail(url: string) {
  try {
    const { uri } = await VideoThumbnails.getThumbnailAsync(url);

    return uri;
  } catch (e) {}
}

export async function uploadFile(props: UploadFileProps) {
  try {
    const { name, type, uri, folderName } = props;

    const timestamp = new Date().getTime();

    const fileSignatureResponse = await getUploadSignature({
      upload_signature_payload: {
        public_id: folderName,
        timestamp,
        upload_preset: CLOUDINARY_UPLOAD_PRESET,
      },
    });

    if (fileSignatureResponse.ok === false) {
      return {
        ok: false,
        error: fileSignatureResponse.data.errors.base,
      };
    }

    const { signature } = fileSignatureResponse.data;

    const formData: any = new FormData();
    if (folderName) formData.append("public_id", folderName);
    formData.append("signature", signature);
    formData.append("api_key", CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp.toString());
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("file", { name, type, uri });

    const uploadResponse = await uploadFileToCloudinary(formData);

    if (uploadResponse === null) {
      return { ok: false, file_details: null };
    }

    return {
      ok: true,
      file_details: {
        url: uploadResponse.secure_url,
        file_type: uploadResponse.resource_type,
        width: uploadResponse.width,
        height: uploadResponse.height,
        public_id: uploadResponse.public_id,
        asset_id: uploadResponse.asset_id,
        size_in_bytes: uploadResponse.bytes,
      },
    };
  } catch (error) {
    return {
      ok: false,
      error: "Error uploading file",
    };
  }
}
