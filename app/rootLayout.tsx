import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import JoinScreen from './screens/JoinScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import { useAuthStore } from './store/useAuthStore';
import {
  navigatorParams,
  NavigatorStackParamList,
} from './navigation/navigation';

const Stack = createNativeStackNavigator<NavigatorStackParamList>();

export default function RootLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Group>
          <Stack.Screen
            name={navigatorParams.HOME}
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
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
