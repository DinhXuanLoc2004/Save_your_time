import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import TextComponent from '../components/TextComponent';
import SectionComponent from '../components/SectionComponent';
import TitleComponent from '../components/TitleComponent';
import RowComponent from '../components/RowComponent';
import InputComponent from '../components/InputComponent';
import {Lock, Sms} from 'iconsax-react-native';
import {colors} from '../constants/colors';
import {Text, View} from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import {globalStyles} from '../styles/globalStyles';
import auth from '@react-native-firebase/auth';
import SpaceComponent from '../components/SpaceComponent';
import {handleTextInput} from '../utils/handleTextInput';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [errEmail, seterrEmail] = useState<string>('');
  const [errPassword, seterrPassword] = useState<string>('');

  useEffect(() => {
    if (email || password) {
      setErrorText('');
    }
  }, [email, password]);

  const handleLogin = async () => {
    if (!email) {
      seterrEmail('Vui lòng điền thông tin email!');
    }
    if (!password) {
      seterrPassword('Vui lòng điền thông tin mật khẩu!');
    }
    if (email && !handleTextInput.validateEmail(email)) {
      seterrEmail('Email không hợp lệ!');
    }
    if (email && !handleTextInput.validatePassword(password)) {
      seterrPassword('Mật khẩu không hợp lệ!');
    }
    if (
      email &&
      password &&
      handleTextInput.validateEmail(email) &&
      handleTextInput.validatePassword(password)
    ) {
      setErrorText('');
      setIsLoading(true);
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          if (user) {
            console.log(user);
            setIsLoading(false);
          }
        })
        .catch(error => {
          setErrorText('Email hoặc mật khẩu không đúng!');
          setIsLoading(false);
        });
    }
  };
  return (
    <Container>
      <SectionComponent
        styles={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <RowComponent styles={{marginBottom: 16}}>
          <TitleComponent text="ĐĂNG NHẬP" size={32} flex={0} />
        </RowComponent>
        <InputComponent
          title="Email"
          value={email}
          onChange={val => setEmail(val)}
          placeholder="Email"
          prefix={<Sms size={22} color={colors.gray2} />}
          allowClear
          type="email-address"
          messageError={errEmail}
          typeErr="Email"
        />
        <InputComponent
          title="Mật khẩu"
          isPassword
          value={password}
          onChange={val => setPassword(val)}
          placeholder="Mật khẩu"
          prefix={<Lock size={22} color={colors.gray2} />}
          messageError={errPassword}
          typeErr="Password"
        />

        {errorText && <TextComponent text={errorText} color="coral" />}
        <SpaceComponent height={20} />

        <ButtonComponent
          isLoading={isLoading}
          text="Đăng nhập"
          onPress={handleLogin}
        />

        <RowComponent styles={{marginTop: 20}}>
          <Text style={[globalStyles.text]}>
            Bạn chưa có tài khoản?{' '}
            <Text
              style={{color: 'coral'}}
              onPress={() => navigation.navigate('RegisterScreen')}>
              Tạo tài khoản
            </Text>
          </Text>
        </RowComponent>
      </SectionComponent>
    </Container>
  );
};

export default LoginScreen;
