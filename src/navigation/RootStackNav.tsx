import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Welcome, Instructions} from 'screens';

const nav = createStackNavigator();
export const RootStackNav: React.FC = () => {
  return (
    <nav.Navigator initialRouteName={Welcome.name}>
      <nav.Screen name="Home" component={Welcome} options={{headerShown: false}} />
      <nav.Screen name="Instructions" component={Instructions} />
    </nav.Navigator>
  );
};
