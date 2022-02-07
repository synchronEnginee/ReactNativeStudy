declare module '*.png' {
  import {ImageSourcePropType} from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}
// ワイルドカードモジュール宣言によりimport可能となる
