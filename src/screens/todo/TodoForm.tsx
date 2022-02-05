import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import React, {useCallback, useEffect} from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {Button, Input, Text} from 'react-native-elements';
import {TodoService} from 'services';
import * as Yup from 'yup';

export const TodoForm: React.FC = () => {
  const navigation = useNavigation();

  const onAdd = useCallback<(values: {todo: string}) => void>(
    async ({todo}) => {
      await TodoService.postTodo(todo);
      if (navigation.isFocused()) {
        navigation.goBack();
      }
    },
    [navigation],
  );

  //formikライブラリはformでよく利用
  const formik = useFormik({
    initialValues: {todo: ''},
    validationSchema: Yup.object().shape({
      todo: Yup.string().required('ToDoを入力してください'),
    }),
    validateOnChange: false,
    onSubmit: onAdd,
  });

  useEffect(() => {
    // 画面から退出しようとした際にイベント起こす
    const unsubscribe = navigation.addListener('beforeRemove', event => {
      // form入力ありで、サブミットされていない場合
      if (!formik.dirty || formik.isSubmitting) {
        return;
      }
      event.preventDefault();

      Alert.alert('破棄確認', '入力内容が保存されていません。\n入力内容を破棄してよろしいですか？', [
        {text: 'Cancel', style: 'cancel', onPress: () => {}},
        {
          text: 'OK',
          style: 'destructive',
          onPress: () => navigation.dispatch(event.data.action),
        },
      ]);
    });
    return unsubscribe;
  }, [navigation, formik]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: 'padding',
        android: undefined,
      } as const)}
      style={styles.container}>
      <View style={styles.form}>
        <Text h1>ToDo登録</Text>
        <Input
          placeholder="ToDoを入力してください"
          containerStyle={styles.input}
          autoCapitalize="none"
          errorMessage={formik.errors.todo}
          onChangeText={formik.handleChange('todo')}
          value={formik.values.todo}
        />
        <Button
          disabled={formik.isSubmitting}
          onPress={() => formik.handleSubmit()}
          title="追加"
          buttonStyle={styles.addButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {marginTop: 20, width: '80%'},
  addButton: {
    marginTop: 30,
  },
});
