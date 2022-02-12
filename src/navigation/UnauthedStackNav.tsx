import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button} from 'react-native-elements';
import {Welcome, UserRegist, Login} from 'screens';

// この共通設定はNav.NavigatorのScreenOptionsへ渡す
const HeaderRight: React.FC = () => {
  const navigation = useNavigation();
  return <Button type="clear" onPress={() => navigation.navigate('Login')} title="ログイン" />;
};

//optionのheaderTitleでヘッダー表示名指定.画面ごとの設定はoptionへ
const nav = createStackNavigator();
export const UnauthedStackNav: React.FC = () => {
  return (
    <nav.Navigator initialRouteName={Welcome.name} screenOptions={{headerRight: () => <HeaderRight />}}>
      <nav.Screen name="Home" component={Welcome} options={{headerTitle: 'Welcome'}} />
      <nav.Screen name="Login" component={Login} options={{headerTitle: 'ログイン', headerRight: undefined}} />
      <nav.Screen name="UserRegist" component={UserRegist} />
    </nav.Navigator>
  );
};
