
import { createStackNavigator } from '@react-navigation/stack';

import AdicionarContato from '../Screens/adicionarContato';
import EditarContato from '../Screens/editarContatos';
import Contatos from '../Screens/contatos';

const Stack = createStackNavigator();

export default function ContatoStack() {
  return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
          }}
        >
          <Stack.Screen
            name="Contatos"
            component={Contatos}
          />
          
          <Stack.Screen
            name="AdicionarContato"
            component={AdicionarContato}
          />

          <Stack.Screen
            name="EditarContato"
            component={EditarContato}
          />

        </Stack.Navigator>
  );
}