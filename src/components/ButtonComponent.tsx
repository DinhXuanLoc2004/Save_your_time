import {View, Text, TouchableOpacity, ActivityIndicator, StyleProp, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import TextComponent from './TextComponent';
import {colors} from '../constants/colors';

interface Props {
  text: string;
  icon?: ReactNode;
  onPress: () => void;
  color?: string;
  isLoading?: boolean;
  colorText?: string;
  padding?: number;
  font?: string;
  style?: StyleProp<ViewStyle>;
  flex?: number
}

const ButtonComponent = (props: Props) => {
  const {text, icon, onPress, color, isLoading, colorText, padding, font, style, flex} = props;

  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      style={[{
        backgroundColor: color ? color : isLoading ? colors.gray2 : colors.blue,
        padding: padding ?? 16,
        width: '100%',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }, style]}>
      {isLoading ? (
        <ActivityIndicator/>
      ) : (
        <TextComponent
          text={text}
          flex={0}
          size={16}
          styles={{textTransform: 'uppercase'}}
          color={colorText ?? colors.white}
          font={font}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
