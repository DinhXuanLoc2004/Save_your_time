import { View, Text, StyleProp, TextStyle } from 'react-native';
import React, { memo } from 'react';
import { globalStyles } from '../styles/globalStyles';
import { fontFamilies } from '../constants/fontFamilies';
import { colors } from '../constants/colors';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  flex?: number;
  styles?: StyleProp<TextStyle>;
  onPress?: () => void,
  line?: number
}

const TextComponent = (props: Props) => {
  const { text, font, size, color, flex, styles, onPress, line } = props;

  return (
    <Text
      numberOfLines={line}
      onPress={onPress}
      style={[
        globalStyles.text,
        {
          flex: flex ?? 1,
          fontFamily: font ?? fontFamilies.regular,
          fontSize: size ?? 14,
          color: color ?? colors.desc,
        },
        { flex: 0 },
        styles,
      ]}>
      {text}
    </Text>
  );
};

export default memo(TextComponent);
