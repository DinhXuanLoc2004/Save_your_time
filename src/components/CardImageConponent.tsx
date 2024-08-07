import { View, Text, ImageBackground, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import React, { memo, ReactNode } from 'react';
import { globalStyles } from '../styles/globalStyles';
interface Props {
  children: ReactNode;
  color?: string;
  onPress?: () => void;
  styles?: StyleProp<ViewStyle>
}

const CardImageConponent = (props: Props) => {
  const { children, color, onPress, styles } = props;

  const renderCard = (
    <ImageBackground
      source={require('../assets/images/card-bg.png')}
      imageStyle={{ borderRadius: 12 }}
      style={[globalStyles.card]}>
      <View
        style={[
          {
            backgroundColor: color ?? 'rgba(113, 77, 217, 0.9)',
            borderRadius: 12,
            flex: 1,
            padding: 12,
          }, styles
        ]}>
        {children}
      </View>
    </ImageBackground>
  )

  return (
    onPress ?
      <TouchableOpacity onPress={onPress}>
        {renderCard}
      </TouchableOpacity>
      : renderCard 
  );
};

export default memo(CardImageConponent);
