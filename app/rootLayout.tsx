import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import CalendarScreen from './screens/CalendarScreen';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator initialRouteName="Calender">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Calender" component={CalendarScreen} />
    </Stack.Navigator>
  );
}
