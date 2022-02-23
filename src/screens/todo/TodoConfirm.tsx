import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {TodoService} from 'services';

// 後で別ファイルに切り出す
export type RootParam = {
  TodoConfirm: {confirmTodo: string};
};

// The action 'NAVIGATE' with payload {"name":"TodoConfirm","params":{"confirmTodo":"aaa"}} was not handled by any navigator.

// Do you have a screen named 'TodoConfirm'?

// If you're trying to navigate to a screen in a nested navigator, see https://reactnavigation.org/docs/nesting-navigators#navigating-to-a-screen-in-a-nested-navigator.

// TODO登録確認画面.
export const TodoConfirm: React.FC = () => {
  // 引数からnavigationのparamを引っ張ってくる.↑の引数で貰う必要がなくなる
  const navigation = useNavigation();
  // 引数からrouteのparamを引っ張ってくる
  const route = useRoute<RouteProp<RootParam, 'TodoConfirm'>>();

  const onAdd = useCallback<(confirmTodo: string) => void>(
    async confirmTodo => {
      await TodoService.postTodo(confirmTodo);
      if (navigation.isFocused()) {
        navigation.goBack();
      }
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <Text>TODO登録確認画面</Text>
      <Text>{route.params.confirmTodo}</Text>
      <Button onPress={() => onAdd(route.params.confirmTodo)} buttonStyle={styles.addButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    marginTop: 30,
  },
});
