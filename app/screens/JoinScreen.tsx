import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormInput, FormPasswordInput } from '../shared/components/Input/Input';
import axiosInstance from '../shared/utils/axiosInstance';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NavigatorStackParamList,
  navigatorParams,
} from '@/navigation/navigation';

interface JoinForm {
  email: string;
  birthdate: number | undefined;
  gender: '남자' | '여자' | undefined;
  password: string;
  confirmPassword: string;
  name: string;
}

type JoinScreenProps = StackScreenProps<
  NavigatorStackParamList,
  typeof navigatorParams.JOIN
>;

const JoinScreen = ({ navigation }: JoinScreenProps) => {
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
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const { confirmPassword, ...signUpData } = data;
      await axiosInstance.post('/join', signUpData);
      setMessage('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');

      // 2초 후에 로그인 페이지로 이동
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: navigatorParams.LOGIN }],
        });
      }, 2000);
    } catch (error) {
      setMessage('회원가입 실패');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <FormInput
        label="이메일"
        placeholder="이메일"
        name="email"
        rules={{ required: '이메일을 입력하세요' }}
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
        rules={{ required: '비밀번호를 입력하세요' }}
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
        rules={{ required: '비밀번호를 다시 입력하세요' }}
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
        rules={{ required: '닉네임을 입력하세요' }}
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
        onPress={() => navigation.pop(1)}
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
