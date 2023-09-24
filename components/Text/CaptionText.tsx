// Packages Imports (from node_modules)
import { useMemo, useState } from "react";

// Local Imports (components/types/utils)
import AnimatedView from "../Animated/AnimatedView";
import AppText from "../App/AppText";
import ColorPallete from "../../constants/ColorPallete";

// Named Imports
import { useAppSelector } from "../../store/reduxHooks";

// interface for CaptionText component
export interface CaptionTextProps {
  caption: string;
  maxCollapsedLength?: number;
}

const CAPTION_COLLAPSED_LENGTH = 200;

// functional component for CaptionText
function CaptionText(props: CaptionTextProps) {
  // Destructuring props
  const { caption, maxCollapsedLength = CAPTION_COLLAPSED_LENGTH } = props;

  // states
  const [expanded, setExpanded] = useState<boolean>(false);

  const { dark } = useAppSelector(state => state.theme);

  const shouldShowReadMore = caption.length > maxCollapsedLength && !expanded;

  if (!caption) return null;

  const textToDisplay = useMemo(() => {
    if (expanded) return caption;

    return caption.slice(0, maxCollapsedLength);
  }, [expanded, caption.length]);

  // render
  return (
    <AnimatedView>
      <AppText text={textToDisplay} margins={{ top: 5, left: 10 }}>
        {shouldShowReadMore ? (
          <AppText
            text={`.......read ${expanded ? "less" : "more"}`}
            color={
              dark
                ? ColorPallete.placeholderTextColorDark
                : ColorPallete.placeholderTextColorLight
            }
            onPress={() => setExpanded(!expanded)}
          />
        ) : null}
      </AppText>
    </AnimatedView>
  );
}

// exports
export default CaptionText;
