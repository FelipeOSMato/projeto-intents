import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Cadastro from './components/Screens/cadastro';
import Login from './components/Screens/login';

import HomeTabs from './components/Screens/HomeTabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>

        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
          />

          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
          />

          <Stack.Screen
            name="HomeTabs"
            component={HomeTabs}
          />

        </Stack.Navigator>

      </NavigationContainer>
    </SafeAreaProvider>
  );
}