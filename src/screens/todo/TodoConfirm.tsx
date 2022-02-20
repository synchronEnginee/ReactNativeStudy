import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {TodoService} from 'services';

// 後で別ファイルに切り出す
export type RootParam = {
  TodoConfirm: {confirmTodo: string};
};

// TODO登録確認画面.
export const TodoConfirm: React.FC = () => {
  const navigation = useNavigation();
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
