import {useUserContext} from 'contexts/UserContext';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from 'react-native-elements';

export const Login: React.FC = () => {
  const userContext = useUserContext();

  const login = useCallback(() => {
    // TODO add "catch"
    userContext.login('user', 'password');
  }, [userContext]);
  return (
    <View style={styles.container}>
      <Text h1>ログイン</Text>
      <Button onPress={login} title="ログイン" />
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
