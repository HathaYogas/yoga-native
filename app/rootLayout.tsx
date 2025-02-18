import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import LoggedInScreen from './screens/LoggedInScreen';
import { useAuthStore } from './store/useAuthStore';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'LoggedIn' : 'Login'}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoggedIn" component={LoggedInScreen} />
    </Stack.Navigator>
  );
}
