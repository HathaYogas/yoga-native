import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { ErrorMessage } from '@hookform/error-message';

import {
  navigatorParams,
  NavigatorStackParamList,
} from '@/navigation/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { FormInput, FormPasswordInput } from '@/shared/components/Input/Input';
import { useAuthStore } from '@/store/useAuthStore';
import { loginMessage } from '@/shared/constants/message';
import axiosInstance from '@/shared/utils/axiosInstance';

interface LoginForm {
  email: string;
  password: string;
}

type LoginScreenNavigationProp = NativeStackNavigationProp<
  NavigatorStackParamList,
  typeof navigatorParams.LOGIN
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [message, setMessage] = useState('');
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data: LoginForm) => {
    try {
      await axiosInstance.post('/user', {
        email: data.email,
        password: data.password,
      });

      login();
      // 홈 화면으로 이동 (네비게이션 스택 초기화)
      navigation.reset({
        index: 0,
        routes: [{ name: navigatorParams.HOME }],
      });
    } catch (error) {
      setMessage(loginMessage.error.loginFailed);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <FormInput
        label="이메일"
        placeholder="이메일"
        name="email"
        rules={{ required: loginMessage.email.required }}
        control={control}
      />
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <FormPasswordInput
        label="비밀번호"
        placeholder="비밀번호"
        name="password"
        control={control}
        rules={{ required: loginMessage.password.required }}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <Button title="로그인" onPress={handleSubmit(onSubmit)} />
      {message && <Text>{message}</Text>}

      <View style={styles.footer}>
        <Button
          title="회원가입"
          onPress={() => navigation.navigate(navigatorParams.JOIN)}
        />
        <Button
          title="비밀번호 찾기"
          onPress={() => {
            navigation.navigate(navigatorParams.FORGOT_PASSWORD);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LoginScreen;
