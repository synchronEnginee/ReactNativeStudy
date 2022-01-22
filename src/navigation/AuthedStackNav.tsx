import {createStackNavigator} from '@react-navigation/stack';
import {MainTabNav} from 'navigation/MainTabNav';
import React from 'react';

const nav = createStackNavigator();
export const AuthedStackNav: React.FC = () => {
  return (
    <nav.Navigator screenOptions={{headerShown: false}}>
      <nav.Screen name="Main" component={MainTabNav} />
    </nav.Navigator>
  );
};
