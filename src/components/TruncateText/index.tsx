// Packages Imports (from node_modules)
import { useMemo, useState } from 'react';

// Local Imports (components/types/utils)
import AppText from '../AppText';
import colorPallete from '../../constants/colorPallete';

// Named Imports
import { AppTextProps } from '../../types/components';
import { useAppSelector } from '../../store/storeHooks';

// interface for TruncateText component
export interface CaptionTextProps extends AppTextProps {
  maxCollapsedLength?: number;
}

const CAPTION_COLLAPSED_LENGTH = 200;

// functional component for TruncateText
function TruncateText(props: CaptionTextProps) {
  // Destructuring props
  const { text = '', maxCollapsedLength = CAPTION_COLLAPSED_LENGTH, ...restProps } = props;

  // states
  const [expanded, setExpanded] = useState<boolean>(false);

  const { dark } = useAppSelector((state) => state.theme);

  const shouldShowReadMore = text.length > maxCollapsedLength && !expanded;

  if (!text) return null;

  const textToDisplay = useMemo(() => {
    if (expanded) return text;

    return text.slice(0, maxCollapsedLength);
  }, [expanded, text]);

  // render
  return (
    <AppText text={` ${textToDisplay}`} {...restProps}>
      {shouldShowReadMore ? (
        <AppText
          text={`.......read ${expanded ? 'less' : 'more'}`}
          color={dark ? colorPallete.placeholderDark : colorPallete.placeholderLight}
          onPress={() => setExpanded(!expanded)}
          size={restProps.size || 14}
        />
      ) : null}
    </AppText>
  );
}

// exports
export default TruncateText;
