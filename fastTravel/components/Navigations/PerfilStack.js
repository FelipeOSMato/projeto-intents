
import { createStackNavigator } from '@react-navigation/stack';

import Perfil from '../Screens/perfil';
import EditarPerfil from '../Screens/editarPerfil';

const Stack = createStackNavigator();

export default function PerfilStack() {
  return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          
          <Stack.Screen
            name="Perfil"
            component={Perfil}
          />

          <Stack.Screen
            name="EditarPerfil"
            component={EditarPerfil}
          />

        </Stack.Navigator>
  );
}