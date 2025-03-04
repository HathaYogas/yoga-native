import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function HomeScreen() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <View>
      <Text>로그인 되고 나올 화면</Text>
      <Button title="로그아웃" onPress={() => logout()} />
    </View>
  );
}
