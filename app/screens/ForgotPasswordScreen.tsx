import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  navigatorParams,
  NavigatorStackParamList,
} from '@/navigation/navigation';
import { useNavigation } from '@react-navigation/native';

import { Input } from '@/shared/components/Input/Input';
import axiosInstance from '@/shared/utils/axiosInstance';
import { FORGOT_PASSWORD_MESSAGE } from '@/shared/constants/message';

interface ForgotPasswordForm {
  id: string;
}

type ForgotPasswordScreenProps = NativeStackNavigationProp<
  NavigatorStackParamList,
  typeof navigatorParams.FORGOT_PASSWORD
>;

const ForgotPasswordScreen = () => {
  const navigation = useNavigation<ForgotPasswordScreenProps>();
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
      setMessage(FORGOT_PASSWORD_MESSAGE.success.forgotPassword);
    } catch (error) {
      setMessage(FORGOT_PASSWORD_MESSAGE.error.emailNotFound);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>비밀번호 찾기</Text>
      <Controller
        control={control}
        name="id"
        rules={{ required: FORGOT_PASSWORD_MESSAGE.email.required }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="아이디"
            placeholder="아이디"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
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

export default ForgotPasswordScreen;
