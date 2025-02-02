import { QueryClient, QueryClientProvider } from 'react-query';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import Fallback from './shared/components/Fallback/Fallback';
import RootLayout from './rootLayout';

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container}>
          <RootLayout />
          <StatusBar style="auto" />
        </SafeAreaView>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
  },
});
