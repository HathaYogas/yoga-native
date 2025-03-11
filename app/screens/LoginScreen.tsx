import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FormInput, FormPasswordInput } from '../shared/components/Input/Input';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useAuthStore } from '../store/useAuthStore';
import axiosInstance from '../shared/utils/axiosInstance';
import {
  navigatorParams,
  NavigatorStackParamList,
} from '@/navigation/navigation';
import { StackScreenProps } from '@react-navigation/stack';

// Define the type for your form data
interface LoginForm {
  email: string;
  password: string;
}

type LoginScreenProps = StackScreenProps<
  NavigatorStackParamList,
  typeof navigatorParams.LOGIN
>;

const LoginScreen = ({ navigation }: LoginScreenProps) => {
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
      await axiosInstance.post('/login', {
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
      setMessage('로그인 실패');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <FormInput
        label="아이디"
        placeholder="아이디"
        name="email"
        rules={{ required: '아이디를 입력하세요' }}
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
        rules={{ required: '비밀번호를 입력하세요' }}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

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
