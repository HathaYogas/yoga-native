import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import {
  NavigatorStackParamList,
  navigatorParams,
} from '@/navigation/navigation';
import { FormInput, FormPasswordInput } from '@/shared/components/Input/Input';
import axiosInstance from '@/shared/utils/axiosInstance';
import { joinMessage } from '@/shared/constants/message';

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
      setMessage(joinMessage.error.passwordNotMatch);
      return;
    }

    try {
      const { confirmPassword, ...signUpData } = data;
      await axiosInstance.post('/join', signUpData);
      setMessage(joinMessage.success.join);

      // 2초 후에 로그인 페이지로 이동
      setTimeout(() => {
        navigation.popTo(navigatorParams.LOGIN);
      }, 2000);
    } catch (error) {
      setMessage(joinMessage.error.joinFailed);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <FormInput
        label="이메일"
        placeholder="이메일"
        name="email"
        rules={{ required: joinMessage.email.required }}
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
        rules={{ required: joinMessage.password.required }}
        control={control}
        textContentType="none"
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <FormPasswordInput
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        name="confirmPassword"
        rules={{ required: joinMessage.passwordConfirm.required }}
        control={control}
        textContentType="none"
      />
      <ErrorMessage
        errors={errors}
        name="confirmPassword"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <FormInput
        label="닉네임"
        placeholder="닉네임"
        name="name"
        rules={{ required: joinMessage.name.required }}
        control={control}
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
