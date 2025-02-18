import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FormInput } from '../shared/components/Input/Input';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { asyncHandler } from '../utils/asyncHandler';

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
  } = useForm<LoginForm>(); // Use the defined type here
  const [message, setMessage] = useState('');

  const onSubmit = async (data: LoginForm) => {
    if (!data.id) {
      setMessage('id가 없다');
      return;
    }
    if (!data.password) {
      setMessage('pw가 없다');
      return;
    }

    await asyncHandler(
      () =>
        axios.get('/api/login', { params: { id: data.id, pw: data.password } }),
      (responseData) => {
        setMessage(responseData.data.message);
      },
      () => {
        setMessage('로그인 실패');
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <FormInput
        label="아이디"
        placeholder="아이디"
        name="id"
        control={control}
      />
      {errors.id && <Text style={styles.errorText}>{message}</Text>}

      <FormInput
        label="비밀번호"
        placeholder="비밀번호"
        name="password"
        control={control}
        secureTextEntry
      />
      {errors.password && <Text style={styles.errorText}>{message}</Text>}

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
