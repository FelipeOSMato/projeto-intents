import React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Home from "../Screens/home"
import Perfil from '../Navigations/PerfilStack';
import Contatos from '../Navigations/ContatoStack';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { ProvedorUsuario } from '../contextos/usuarioContexto';

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs({ route }) {
  const { usuarioLogado } = route.params

  const insets = useSafeAreaInsets();
  return (
    <ProvedorUsuario usuarioLogado={usuarioLogado}>
      <Tab.Navigator
        tabBarPosition='bottom'
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#f5f5f5',
          tabBarInactiveTintColor: '#8cb7ef',
          tabBarShowLabel: true,
          tabBarStyle: {
            height: 70 + insets.bottom,
            paddingBottom: insets.bottom,
            elevation: 6,
            backgroundColor:'#3084ab'
          },
          tabBarIndicatorStyle: {
            display: 'none'
          }
        }}
      >

        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Contatos"
          component={Contatos}
          options={{
            tabBarIcon: ({ color, size})=> (
              <Ionicons name="call" size={size} color={color}/>
            )
          }}
        />

        <Tab.Screen
          name="Perfil"
          component={Perfil}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />

      </Tab.Navigator>
    </ProvedorUsuario>
  );
}