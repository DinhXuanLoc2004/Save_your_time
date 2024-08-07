import {Eye, EyeSlash, TickCircle} from 'iconsax-react-native';
import React, {ReactNode, useEffect, useState} from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import {handleTextInput} from '../utils/handleTextInput';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import TitleComponent from './TitleComponent';
import SpaceComponent from './SpaceComponent';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  title?: string;
  prefix?: ReactNode;
  affix?: ReactNode;
  allowClear?: boolean;
  multible?: boolean;
  numberOfLine?: number;
  type?: KeyboardTypeOptions;
  isPassword?: boolean;
  height?: number;
  style?: StyleProp<ViewStyle>;
  messageError?: string;
  typeErr?: 'Email' | 'Password' | 'ConfirmPassword';
  confirm?: string
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    placeholder,
    title,
    prefix,
    affix,
    allowClear,
    multible,
    numberOfLine,
    type,
    isPassword,
    height,
    style,
    messageError,
    typeErr,
    confirm
  } = props;

  const [showPass, setShowPass] = useState(false);
  const [isErr, setisErr] = useState(true);
  const [isMessErr, setisMessErr] = useState('');
  useEffect(() => {
    const isInputEmpty = handleTextInput.handleTextEmlty(value);
    const isEmailError =
      typeErr && typeErr === 'Email'
        ? !handleTextInput.validateEmail(value)
        : false;
    const isPasswordError =
      typeErr && typeErr === 'Password'
        ? !handleTextInput.validatePassword(value)
        : false;
        const isConfirmErr = typeErr && typeErr === 'ConfirmPassword'
        ? value !== confirm : false

        if (isInputEmpty || isEmailError || isPasswordError || isConfirmErr) {
          setisErr(true);
          if (isInputEmpty) {
            setisMessErr(`${title} không được để trống!`);
          }
          if (!isInputEmpty && isEmailError) {
            setisMessErr('Email không hợp lệ!');
          }
          if (!isInputEmpty && isPasswordError) {
            setisMessErr('Mật khẩu có nhất 6 ký tự, có số và chữ!');
          }
          if (!isInputEmpty && isConfirmErr) {
            setisMessErr('Mật khẩu không trùng khớp!');
          }
    } else {
      setisErr(false);
    }
  }, [value]);
  return (
    <View style={[{marginBottom: 16}, style]}>
      {title && <TitleComponent text={title} size={16} />}
      <RowComponent
        styles={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            minHeight: multible && numberOfLine ? 32 * numberOfLine : 32,
            paddingVertical: 14,
            paddingHorizontal: 10,
            alignItems: 'center',
          },
        ]}>
        {prefix && prefix}
        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 8 : 0,
            paddingRight: affix ? 8 : 0,
            height: height,
          }}>
          <TextInput
            style={[globalStyles.text, {margin: 0, padding: 0, flex: 1}]}
            placeholder={placeholder ?? ''}
            placeholderTextColor={'#676767'}
            value={value}
            onChangeText={val => onChange(val)}
            multiline={multible}
            numberOfLines={numberOfLine}
            keyboardType={type}
            secureTextEntry={isPassword ? !showPass : false}
            autoCapitalize="none"
          />
        </View>
        {affix && affix}

        {allowClear && value && (
          <TouchableOpacity onPress={() => onChange('')}>
            {
              !isErr && typeErr === 'Email' ?
              <TickCircle size={20} color={colors.success}/>
              : <AntDesign name="close" size={20} color={colors.white} />
            }
          </TouchableOpacity>
        )}

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            {showPass ? (
              <EyeSlash size={20} color={!isErr ? colors.success : colors.desc} />
            ) : (
              <Eye size={20} color={!isErr ? colors.success : colors.desc} />
            )}
          </TouchableOpacity>
        )}
      </RowComponent>
      {messageError && isErr && (
        <View>
          <SpaceComponent height={5} />
          <TextComponent
            text={isMessErr ?? messageError}
            color={colors.error}
            font={fontFamilies.semiBold}
            flex={1}
            styles={{textAlign: 'center'}}
          />
        </View>
      )}
    </View>
  );
};

export default InputComponent;
