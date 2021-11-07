import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import Text from "./Text";

function TruncateIt({ header, longText, onHeaderPress }) {
  const [NUMLINES, SetNUMLINES] = useState(3);

  return (
    <>
      <Text
        header={header}
        text={longText}
        numberOfLines={NUMLINES}
        onHeaderPress={onHeaderPress}
      />
      {longText.length > 200 ? (
        <TouchableOpacity
          onPress={
            NUMLINES === null ? () => SetNUMLINES(3) : () => SetNUMLINES(null)
          }
        >
          {NUMLINES === null ? (
            <Text text="show less." color="grey" />
          ) : (
            <Text text="show more." color="grey" />
          )}
        </TouchableOpacity>
      ) : null}
    </>
  );
}

export default TruncateIt;
