import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FormInput } from '../shared/components/Input/Input';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useAuthStore } from '../store/useAuthStore';
import axiosInstance from '../shared/utils/axiosInstance';

// Define the type for your form data
interface LoginForm {
  id: string;
  password: string;
}

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      id: '',
      password: '',
    },
  }); // Use the defined type here

  const [message, setMessage] = useState('');
  const login = useAuthStore((state) => state.login);

  const onSubmit = async (data: LoginForm) => {
    try {
      await axiosInstance.post('/api/login', {
        id: data.id,
        password: data.password,
      });

      // 서버가 쿠키를 설정하므로, 단순히 로그인 상태만 변경
      login();
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
        label="비밀번호"
        placeholder="비밀번호"
        name="password"
        control={control}
        rules={{ required: '비밀번호를 입력하세요' }}
        secureTextEntry
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Button title="로그인" onPress={handleSubmit(onSubmit)} />
      {message && <Text>{message}</Text>}

      <View style={styles.footer}>
        <Button
          title="회원가입"
          onPress={() => {
            /* 회원가입 로직 */
          }}
        />
        <Button
          title="비밀번호 찾기"
          onPress={() => {
            /* 비밀번호 찾기 로직 */
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
