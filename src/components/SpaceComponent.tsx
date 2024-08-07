import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React, { memo } from 'react';

interface Props {
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>
}

const SpaceComponent = (props: Props) => {
  const {width, height, style} = props;

  return <View style={[{width, height}, style]} />;
};

export default memo(SpaceComponent);
