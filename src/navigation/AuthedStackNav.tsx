import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {TodoBoard} from 'screens';

const nav = createStackNavigator();
export const AuthedStackNav: React.FC = () => {
  return (
    <nav.Navigator screenOptions={{headerShown: false}}>
      <nav.Screen name="Todo" component={TodoBoard} />
    </nav.Navigator>
  );
};
