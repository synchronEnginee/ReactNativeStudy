import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {FilterType, TodoFilter, TodoList} from 'components/parts';
import React, {useCallback, useContext, useState} from 'react';
import {Alert, StyleSheet, View, ActivityIndicator} from 'react-native';
import {Icon, ThemeContext} from 'react-native-elements';
import {Todo, TodoService} from 'services';

type ShowFilter = {
  [K in FilterType]: (todo: Todo) => boolean;
};

const showFilter: ShowFilter = {
  [FilterType.ALL]: () => true,
  [FilterType.INCOMPLETE]: todo => !todo.completed,
  [FilterType.COMPLETED]: todo => todo.completed,
};

export const TodoBoard: React.FC = () => {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>(FilterType.ALL);
  // ローディング中のstate
  const [loading, setLoading] = useState(false);
  // Todoの状態変更中state
  const [processingTodos, setProcessingTodos] = useState<number[]>([]);

  // 最初のレンダリング時（画面にフォーカスがある場合）だけではなく、依存関係が変更された場合にも実行
  useFocusEffect(
    useCallback(() => {
      // 画面破棄時にstate更新しない判断
      let isActive = true;

      setLoading(true);
      TodoService.getTodos()
        .then(response => {
          if (isActive) {
            setTodos(response);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          if (isActive) {
            setLoading(false);
          }
        });

      return () => {
        isActive = false;
      };
    }, []),
  );

  const toggleTodoCompletion = (id: number) => {
    const target = todos.find(todo => todo.id === id);
    if (!target) {
      return;
    }
    // 状態変更中のstateへ
    setProcessingTodos(prevs => [id, ...prevs]);
    TodoService.putTodo(id, !target.completed)
      .then(returnedTodo =>
        setTodos(prevTodos => {
          return prevTodos.map(todo => (todo.id === id ? returnedTodo : todo));
        }),
      )
      .catch(() => {})
      .finally(() => {
        setProcessingTodos(prevs => {
          return prevs.filter(processedId => processedId !== id);
        });
      });
  };

  const removeTodo = (id: number) => {
    Alert.alert('未実装です');
  };

  const showTodos = todos.filter(showFilter[filterType]);

  return (
    <View style={styles.container} testID="screen/main/home">
      {/* TodoFilterはフィルターするボタン */}
      <TodoFilter filterType={filterType} setFilterType={setFilterType} />
      <TodoList
        todos={showTodos}
        contentContainerStyle={styles.todoListContainer}
        toggleTodoCompletion={toggleTodoCompletion}
        removeTodo={removeTodo}
        processingTodos={processingTodos}
      />
      <Icon
        name="plus"
        type="font-awesome-5"
        color={theme.colors?.primary}
        raised
        reverse
        size={30}
        containerStyle={styles.iconContainerStyle}
        onPress={() => {
          navigation.navigate('TodoForm');
        }}
      />
      {/*ローディング中は操作できないようにロード中表示 */}
      {loading && (
        <view style={styles.indicatorContainer}>
          <ActivityIndicator color="red" style={styles.indicator} size="large" />
        </view>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoListContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 80,
  },
  iconContainerStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  indicatorContainer: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    flex: 1,
    alignContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  indicator: {
    flex: 1,
  },
});
