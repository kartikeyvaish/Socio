/**
 * A collection of design variables used throughout the application.
 * Provides a consistent set of values for padding, border radius, gap, font size, and margin.
 */
export const variables = {
  /**
   * Padding values for spacing within components.
   */
  padding: {
    /** Small padding value (8px). */
    small: 8,
    /** Medium padding value (16px). */
    medium: 16,
    /** Large padding value (24px). */
    large: 24
  },

  /**
   * Border radius values for rounded corners.
   */
  borderRadius: {
    /** Small border radius value (6px). */
    small: 6,
    /** Medium border radius value (12px). */
    medium: 12,
    /** Large border radius value (24px). */
    large: 16
  },

  /**
   * Gap values for spacing between elements.
   */
  gap: {
    /** Small gap value (8px). */
    small: 8,
    /** Medium gap value (16px). */
    medium: 16,
    /** Large gap value (24px). */
    large: 24
  },

  /**
   * Font size values for text elements.
   */
  fontSize: {
    /** Small font size (12px). */
    small: 12,
    /** Medium font size (14px). */
    medium: 14,
    /** Large font size (16px). */
    large: 16
  },

  /**
   * Margin values for spacing around components.
   */
  margin: {
    /** Small margin value (8px). */
    small: 8,
    /** Medium margin value (16px). */
    medium: 16,
    /** Large margin value (24px). */
    large: 24
  }
};

export const IconNames = {
  // Icon families
  AntDesign: 'AntDesign',
  Feather: 'Feather',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  MaterialIcons: 'MaterialIcons',
  Entypo: 'Entypo',
  EvilIcons: 'EvilIcons',
  FontAwesome: 'FontAwesome',
  FontAwesome5: 'FontAwesome5',
  Ionicons: 'Ionicons',
  SimpleLineIcons: 'SimpleLineIcons',
  Octicons: 'Octicons',
  Fontisto: 'Fontisto',
  Foundation: 'Foundation'
};

export type IconFamilyType = keyof typeof IconNames;

export const fontFamilies = {
  Poppins: {
    light: 'PoppinsLight',
    regular: 'PoppinsRegular',
    medium: 'PoppinsMedium',
    bold: 'PoppinsBold'
  },
  BerkshireSwash: {
    regular: 'BerkshireSwash'
  },
  Inter: {
    light: 'InterLight',
    regular: 'InterRegular',
    bold: 'InterBold'
  },
  Helvetica: {
    regular: 'Helvetica'
  }
};

export const TOKENS = {
  ACCESS_TOKEN: 'authaccesstoken',
  REFRESH_TOKEN: 'authrefreshtoken'
};
