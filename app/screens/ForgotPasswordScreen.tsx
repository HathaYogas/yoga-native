import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormInput } from '../shared/components/Input/Input';
import axiosInstance from '../shared/utils/axiosInstance';
import { StackScreenProps } from '@react-navigation/stack';
import {
  navigatorParams,
  NavigatorStackParamList,
} from '@/navigation/navigation';

// Define the type for your form data
interface ForgotPasswordForm {
  id: string;
}

type ForgotPasswordScreenProps = StackScreenProps<
  NavigatorStackParamList,
  typeof navigatorParams.FORGOT_PASSWORD
>;

const ForgotPasswordScreen = ({ navigation }: ForgotPasswordScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      id: '',
    },
  });

  const [message, setMessage] = useState('');

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      await axiosInstance.post('/api/forgot-password', { id: data.id });
      setMessage('가입 시 입력한 이메일로 임시 비밀번호를 보냈습니다.');
    } catch (error) {
      setMessage('비밀번호 찾기 실패');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 찾기</Text>
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

      <Button title="비밀번호 찾기" onPress={handleSubmit(onSubmit)} />
      {message && <Text>{message}</Text>}

      <Button
        title="로그인 화면으로 돌아가기"
        onPress={() => navigation.navigate(navigatorParams.LOGIN)}
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

export default ForgotPasswordScreen;
