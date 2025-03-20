import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import {
  NavigatorStackParamList,
  navigatorParams,
} from '@/navigation/navigation';
import { Input, PasswordInput } from '@/shared/components/Input/Input';
import axiosInstance from '@/shared/utils/axiosInstance';
import { JOIN_MESSAGE } from '@/shared/constants/message';

interface JoinForm {
  email: string;
  birthdate: number | undefined;
  gender: '남자' | '여자' | undefined;
  password: string;
  confirmPassword: string;
  name: string;
}

type JoinScreenNavigationProp = NativeStackNavigationProp<
  NavigatorStackParamList,
  typeof navigatorParams.JOIN
>;

const JoinScreen = () => {
  const navigation = useNavigation<JoinScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinForm>({
    defaultValues: {
      email: '',
      birthdate: undefined,
      gender: undefined,
      password: '',
      confirmPassword: '',
      name: '',
    },
  });

  const [message, setMessage] = useState('');

  const onSubmit = async (data: JoinForm) => {
    if (data.password !== data.confirmPassword) {
      setMessage(JOIN_MESSAGE.error.passwordNotMatch);
      return;
    }

    try {
      const { confirmPassword, ...signUpData } = data;
      await axiosInstance.post('/user/join', signUpData);
      setMessage(JOIN_MESSAGE.success.join);

      // 2초 후에 로그인 페이지로 이동
      setTimeout(() => {
        navigation.popTo(navigatorParams.LOGIN);
      }, 2000);
    } catch (error) {
      setMessage(JOIN_MESSAGE.error.joinFailed);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <Controller
        control={control}
        name="email"
        rules={{ required: JOIN_MESSAGE.email.required }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="이메일"
            placeholder="이메일"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="email"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: JOIN_MESSAGE.password.required }}
        render={({ field: { onChange, onBlur, value } }) => (
          <PasswordInput
            label="비밀번호"
            placeholder="비밀번호"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{ required: JOIN_MESSAGE.passwordConfirm.required }}
        render={({ field: { onChange, onBlur, value } }) => (
          <PasswordInput
            label="비밀번호 확인"
            placeholder="비밀번호 확인"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="confirmPassword"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <Controller
        control={control}
        name="name"
        rules={{ required: JOIN_MESSAGE.name.required }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="닉네임"
            placeholder="닉네임"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name="name"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <Button title="회원가입" onPress={handleSubmit(onSubmit)} />
      {message && <Text>{message}</Text>}

      <Button
        title="로그인 화면으로 돌아가기"
        onPress={() => navigation.popTo(navigatorParams.LOGIN)}
      />
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
});

export default JoinScreen;
