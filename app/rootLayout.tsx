import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import JoinScreen from './screens/JoinScreen';
import { useAuthStore } from './store/useAuthStore';
import {
  navigatorParams,
  NavigatorStackParamList,
} from './navigation/navigation';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

const Stack = createStackNavigator<NavigatorStackParamList>();

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen name={navigatorParams.HOME} component={HomeScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name={navigatorParams.LOGIN} component={LoginScreen} />
          <Stack.Screen name={navigatorParams.JOIN} component={JoinScreen} />
          <Stack.Screen
            name={navigatorParams.FORGOT_PASSWORD}
            component={ForgotPasswordScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}
