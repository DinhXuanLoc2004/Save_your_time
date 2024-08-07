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
import SpaceComponent from '../components/SpaceComponent';
import auth from '@react-native-firebase/auth';
import {handleUser} from '../utils/handleUser';
import {handleTextInput} from '../utils/handleTextInput';

const RegisterScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errEmail, seterrEmail] = useState('');
  const [errPassword, seterrPassword] = useState('');
  const [errConfirmPassword, seterrConfirmPassword] = useState('');

  useEffect(() => {
    if (email || password || confirmPassword) {
      setErrorText('');
    }
  }, [email, password, confirmPassword]);

  const handleCreateAccount = async () => {
    if (!email) {
      seterrEmail('Email không được để trống!');
    }
    if (!password) {
      seterrPassword('Mật khẩu không được để trống!');
    }
    if (!confirmPassword) {
      seterrConfirmPassword('Xác nhận mật khẩu không được để trống!');
    }
    if (email && !handleTextInput.validateEmail(email)) {
      seterrEmail('Email không hợp lệ!');
    }
    if (password && !handleTextInput.validatePassword(password)) {
      seterrPassword('Mật khẩu không hợp lệ!');
    }
    if (password && confirmPassword && password !== confirmPassword) {
      seterrConfirmPassword('Mật khẩu không trùng khớp!');
    }
    if (
      email &&
      password &&
      confirmPassword &&
      handleTextInput.validateEmail(email) &&
      handleTextInput.validatePassword(password) &&
      password === confirmPassword
    ) {
      setIsLoading(true);
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          if (user) {
            console.log(user);
            handleUser.SaveUserToDataBase(user);
            setIsLoading(false);
          }
        })
        .catch(error => {
          setIsLoading(false);
          setErrorText('Email đã được đăng ký!');
          console.log('error::', error);
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
          <TitleComponent text="ĐĂNG KÝ" size={32} flex={0} />
        </RowComponent>
        <InputComponent
          title="Email"
          value={email}
          onChange={val => setEmail(val)}
          placeholder="Email"
          prefix={<Sms size={22} color={colors.gray2} />}
          allowClear
          type="email-address"
          typeErr="Email"
          messageError={errEmail}
        />
        <InputComponent
          title="Mật khẩu"
          isPassword
          value={password}
          onChange={val => setPassword(val)}
          placeholder="Mật khẩu"
          prefix={<Lock size={22} color={colors.gray2} />}
          typeErr="Password"
          messageError={errPassword}
        />
        <InputComponent
          title="Xác nhận mật khẩu"
          isPassword
          value={confirmPassword}
          onChange={val => setConfirmPassword(val)}
          placeholder="Xác nhận mật khẩu"
          prefix={<Lock size={22} color={colors.gray2} />}
          typeErr='ConfirmPassword'
          messageError={errConfirmPassword}
          confirm={password}
        />

        {errorText && <TextComponent text={errorText} color="coral" flex={0} />}
        <SpaceComponent height={20} />

        <ButtonComponent
          isLoading={isLoading}
          text="ĐĂNG KÝ"
          onPress={handleCreateAccount}
        />

        <RowComponent styles={{marginTop: 20}}>
          <Text style={[globalStyles.text]}>
            Bạn đã có tài khoản?{' '}
            <Text
              style={{color: 'coral'}}
              onPress={() => navigation.navigate('LoginScreen')}>
              Đăng nhập
            </Text>
          </Text>
        </RowComponent>
      </SectionComponent>
    </Container>
  );
};

export default RegisterScreen;
