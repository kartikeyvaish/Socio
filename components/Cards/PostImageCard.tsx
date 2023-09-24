// Component/Types imports
import AppImage from "../App/AppImage";
import Layout from "../../constants/Layout";

// Named Imports
import { PostProps } from "../../types/AppTypes";

export interface PostImageCardProps {
  width: PostProps["files"][0]["width"];
  height: PostProps["files"][0]["height"];
  url: PostProps["files"][0]["url"];
  blurhash: PostProps["files"][0]["blurhash"];
}

// function component for PostImageCard
function PostImageCard(props: PostImageCardProps) {
  // Destructuring props
  const { width = 0, height = 0, url } = props;

  // Calculate the width and height of file part
  const fileWidth = width;
  const fileHeight = height;
  const deviceWidth = Layout.window.width;
  const cardWidth = deviceWidth;
  const ratio = cardWidth / fileWidth;
  const cardHeight = Math.min(fileHeight * ratio, deviceWidth + 200) || 360;

  // render
  return (
    <AppImage
      source={{ uri: url }}
      style={{ width: cardWidth, height: cardHeight }}
      contentFit="contain"
    />
  );
}

// exports
export default PostImageCard;
