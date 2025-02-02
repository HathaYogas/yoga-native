import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface FallbackProps {
  error: Error; // ErrorBoundary에서 전달되는 에러
  resetError: () => void; // 에러를 리셋하는 함수
}

function Fallback({ error, resetError }: FallbackProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>무언가 잘못되었습니다.</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Button title="재시도" onPress={resetError} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default Fallback;
