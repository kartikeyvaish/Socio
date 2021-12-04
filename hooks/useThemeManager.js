import { useEffect } from "react";
import { Appearance } from "react-native";

export default function ThemeManager(changeHandler) {
  useEffect(() => {
    Appearance.addChangeListener(onThemeChange);

    return () => Appearance.removeChangeListener(onThemeChange);
  }, []);

  const onThemeChange = ({ colorScheme }) => changeHandler(colorScheme);

  return null;
}
