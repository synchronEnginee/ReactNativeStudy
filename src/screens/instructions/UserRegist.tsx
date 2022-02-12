/**
 * ユーザ登録画面
 */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';

// TODO：登録フォーム実装
export const UserRegist: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text h1>Welcome</Text>
      <Button onPress={() => navigation.navigate('Welcome')} title="トップへ" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
