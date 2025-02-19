// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import LoggedInScreen from './screens/LoggedInScreen';
import SignUpScreen from './screens/SignUpScreen';
import { useAuthStore } from './store/useAuthStore';
import authNavigations from './navigation/navigation';

const Stack = createStackNavigator();

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'LoggedIn' : 'Login'}>
      <Stack.Screen name={authNavigations.LOGIN} component={LoginScreen} />
      <Stack.Screen name={authNavigations.SIGNUP} component={SignUpScreen} />
      {/* <Stack.Screen name={authNavigations.FORGOT_PASSWORD} component={ForgotPasswordScreen} /> */}
    </Stack.Navigator>
  );
}
