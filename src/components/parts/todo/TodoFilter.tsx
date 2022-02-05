import React from 'react';
import {ButtonGroup} from 'react-native-elements';

/**
 * 一覧画面でリストをフィルターするボタンのコンポーネント
 */
// 定数ボタン配列の0番目が全て、1番目が未完了のみ、2番目が完了のみ
export enum FilterType {
  ALL = 0,
  INCOMPLETE = 1,
  COMPLETED = 2,
}

interface Props {
  filterType: FilterType;
  setFilterType: (filter: FilterType) => void;
}

export const TodoFilter: React.FC<Props> = ({filterType, setFilterType}) => {
  const buttons = ['全て', '未完了のみ', '完了のみ'];

  // selectedIndex：ボタンの配列の現在選択されているインデックス
  return <ButtonGroup onPress={setFilterType} selectedIndex={filterType} buttons={buttons} />;
};
