// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import { useAuthStore } from './store/useAuthStore';
import navigatorParams from './navigation/navigation';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

export type NavigatorStackParamList = {
  [navigatorParams.HOME]: undefined;
  [navigatorParams.LOGIN]: undefined;
  [navigatorParams.SIGNUP]: undefined;
  [navigatorParams.FORGOT_PASSWORD]: undefined;
};

const Stack = createStackNavigator<NavigatorStackParamList>();

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Stack.Navigator initialRouteName={navigatorParams.HOME}>
      <Stack.Screen name={navigatorParams.HOME} component={HomeScreen} />
      <Stack.Screen name={navigatorParams.LOGIN} component={LoginScreen} />
      <Stack.Screen name={navigatorParams.SIGNUP} component={SignUpScreen} />
      <Stack.Screen
        name={navigatorParams.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}
