import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormInput } from '../shared/components/Input/Input';
import { FormRadioButton } from '../shared/components/RadioButton/RadioButton';
import axiosInstance from '../shared/utils/axiosInstance';
import { StackScreenProps } from '@react-navigation/stack';
import {
  NavigatorStackParamList,
  navigatorParams,
} from '@/navigation/navigation';

// Define the type for your form data
interface SignUpForm {
  id: string;
  birthdate: number | undefined;
  gender: '남자' | '여자' | undefined;
  password: string;
  confirmPassword: string;
  nickname: string;
}

type SignUpScreenProps = StackScreenProps<
  NavigatorStackParamList,
  typeof navigatorParams.SIGNUP
>;

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    defaultValues: {
      id: '',
      birthdate: undefined,
      gender: undefined,
      password: '',
      confirmPassword: '',
      nickname: '',
    },
  });

  const [message, setMessage] = useState('');

  const onSubmit = async (data: SignUpForm) => {
    if (data.password !== data.confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await axiosInstance.post('/api/signup', data);
      setMessage('회원가입 성공!');
    } catch (error) {
      setMessage('회원가입 실패');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원가입</Text>
      <FormInput
        label="아이디"
        placeholder="아이디"
        name="id"
        rules={{ required: '아이디를 입력하세요' }}
        control={control}
      />
      <ErrorMessage
        errors={errors}
        name="id"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <FormInput
        label="생년월일"
        placeholder="YYYYMMDD"
        name="birthdate"
        rules={{ required: '생년월일을 입력하세요' }}
        control={control}
        keyboardType="numeric"
      />
      <ErrorMessage
        errors={errors}
        name="birthdate"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <FormRadioButton
        name="gender"
        control={control}
        options={['남자', '여자']}
        rules={{ required: '성별을 선택하세요' }}
      />
      <ErrorMessage
        errors={errors}
        name="gender"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <FormInput
        label="비밀번호"
        placeholder="비밀번호"
        name="password"
        rules={{ required: '비밀번호를 입력하세요' }}
        control={control}
        secureTextEntry
        textContentType="none"
      />
      <ErrorMessage
        errors={errors}
        name="password"
        render={({ message }) => (
          <Text style={styles.errorText}>{message}</Text>
        )}
      />

      <FormInput
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        name="confirmPassword"
        rules={{ required: '비밀번호를 다시 입력하세요' }}
        control={control}
        secureTextEntry
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
        name="nickname"
        rules={{ required: '닉네임을 입력하세요' }}
        control={control}
      />
      <ErrorMessage
        errors={errors}
        name="nickname"
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

export default SignUpScreen;
