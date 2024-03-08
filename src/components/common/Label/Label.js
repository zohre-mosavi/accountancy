import React from 'react';
import {Text} from 'react-native';
import { colors, typography } from '../../../assets';

const Label = ({ style = {},
  variation = 'text',
  size = 'medium',
  color = colors.black,
  align = 'left',
  flex = '',
  children,
  ...rest
}) => (
  <Text
    style={[
      typography[variation][size],
      {color},
      {textAlign: align},
      flex ? {flex} : {},
      style,
    ]}
    {...rest}>
    {children}
  </Text>
);

export default Label;
