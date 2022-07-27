import React from 'react';
import { View, TextInput } from 'react-native';

import { FONTS, SIZES, COLORS } from '../constants';

const FormInput = ({
  containerStyle,
  inputContainerStyle,
  placeHolder,
  inputStyle,
  value = '',
  prependComponent,
  appendComponent,
  onChange,
  onPress,
  editable,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  maxLength,
  placeHolderTextColor = COLORS.grey60,
}) => {
  return (
    <View style={{ ...containerStyle }}>
      <View
        style={{
          flexDirection: 'row',
          height: 55,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          alignItems: 'center',
          backgroundColor: COLORS.lightGrey,
          ...inputContainerStyle,
        }}
      >
        {prependComponent}

        <TextInput
          style={{
            flex: 1,
            paddinVertical: 0,
            ...FONTS.body3,
            ...inputStyle,
          }}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor={placeHolderTextColor}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          onChangeText={text => onChange(text)}
          onPressIn={onPress}
          editable={editable}
        />

        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;
