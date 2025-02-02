import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Input from '../shared/components/Input/Input';
import axios from 'axios';

const LoginScreen = () => {
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.get('/api/login');
      setMessage(response.data.message);
    } catch (error) {
      setMessage('로그인 실패');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <Input label="이메일" placeholder="이메일" />
      <Input label="비밀번호" placeholder="비밀번호" secureTextEntry />
      <Button title="로그인" onPress={handleLogin} />
      {message && <Text>{message}</Text>}
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
});

export default LoginScreen;
