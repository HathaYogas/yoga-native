import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Input from '../shared/components/Input/Input';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { asyncHandler } from '../utils/asyncHandler';

// Define the type for your form data
interface LoginForm {
  id: string;
  pw: string;
}

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>(); // Use the defined type here
  const [message, setMessage] = useState('');

  const onSubmit = async (data: LoginForm) => {
    // Use the defined type here
    if (!data.id) {
      setMessage('id가 없다');
      return;
    }
    if (!data.pw) {
      setMessage('pw가 없다');
      return;
    }

    await asyncHandler(
      () => axios.get('/api/login', { params: { id: data.id, pw: data.pw } }),
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
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="이메일"
            placeholder="이메일"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="id"
        rules={{ required: true }}
      />
      {errors.id && <Text style={styles.errorText}>id가 없다</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="비밀번호"
            placeholder="비밀번호"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="pw"
        rules={{ required: true }}
      />
      {errors.pw && <Text style={styles.errorText}>pw가 없다</Text>}

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
