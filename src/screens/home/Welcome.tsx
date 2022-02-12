import {useNavigation} from '@react-navigation/native';
import {Logo} from 'components/basics';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';

export const Welcome: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Logo />
      <Text h1>Welcome</Text>
      <View>
        <Button onPress={() => navigation.navigate('UserRegist')} title="登録する" />
      </View>
    </View>
  );
};
// StyleSheet.createを省略可能だが、することによってオブジェクトはidで返る
// これによってパフォーマンスの向上が見込めるので極力やっておいた方がよい
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
