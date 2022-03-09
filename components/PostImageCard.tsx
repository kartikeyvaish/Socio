// Component/Types imports
import AppImage from "./AppImage";
import Layout from "../constants/Layout";
import { PostFileProps } from "../types/PostTypes";

// function component for PostImageCard
function PostImageCard(props: PostFileProps) {
  // Destructuring props
  const { width, height, uri } = props;

  // Calculate the width and height of file part
  const fileWidth = width;
  const fileHeight = height;
  const deviceWidth = Layout.window.width;
  const cardWidth = deviceWidth;
  const ratio = cardWidth / fileWidth;
  const cardHeight = Math.min(fileHeight * ratio, deviceWidth + 200);

  // Destructuring props
  const {} = props;

  // render
  return (
    <AppImage uri={uri} style={{ width: cardWidth, height: cardHeight }} resizeMode="contain" />
  );
}

// exports
export default PostImageCard;
