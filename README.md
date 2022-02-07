# ReactNativeStudy

## React Native 開発環境の構築

- [Setting up the development environment - React Native](https://reactnative.dev/docs/environment-setup)を参考に開発環境を構築してください。
  - **必ず「React Native CLI Quickstart」というタブをクリック**して、手順を実施してください。
  - インストールする Node.js のバージョンは LTS バージョンとしてください。
    - Windows で Chocolatey でインストールする場合は、 `node-lts` パッケージをおすすめします。
  - 「Development OS」は、開発に利用している OS を選択してください。
  - （macOS のみ）「Target OS」は、「iOS」「Android」の両方の手順を実施してください。

## 依存パッケージのインストール

リポジトリをクローンした直後や`package-lock.json`が更新された場合は、依存パッケージをインストールする必要があります。

次のコマンドを実行して、依存パッケージをインストールしてください。

1. `npm ci`
2. （macOS のみ）`npx pod-install`

## アプリを起動する

次のコマンドを実行して、Android エミュレータ、iOS シミュレータでアプリを起動します。

- Android: `npm run android`
- iOS: `npm run ios`

## バックエンドサーバを起動する

C:\Users\mtsuj\reactNativePJ\ReactNativeStudy\mobile-app-hands-on-backend
mvnw.cmd jetty:run

## アプリをビルドして iOS デバイスにインストールする

1. `ios-deploy --version`を実行して、インストール済みの`ios-deploy`のバージョンが表示されることを確認してください。
   - エラーになった場合は、[ios-deploy](https://github.com/ios-control/ios-deploy)をインストールしてください。
2. `ios/PersonalAccount.xcconfig.template` を `ios/PersonalAccount.xcconfig` としてコピーしてください。
3. ファイルに記載されている設定値を、それぞれ次のように設定してください。
   - `CODE_SIGN_STYLE`: Automatic
   - `PERSONAL_IDENTIFIER`: 他の人とかぶらない、何らかの一意の値
   - `DEVELOPMENT_TEAM`: 個人の Apple ID に割り当てられた ID
     - わからない場合は、[個人の Apple ID でのチーム ID の確認方法](#個人のapple-idでのチームidの確認方法)の手順で確認してください。
4. ルートディレクトリで`xed ios`と実行して、Xcode でプロジェクトを開いてください。開くだけで良いようです。
5. ルートディレクトリで次のコマンドを実行してください。`<device name>`はインストール先の iOS デバイス名です。
   - `npm run ios -- --device='<device name>'`
   - デバイス名、シミュレータ名の一覧は `xcrun xctrace list devices` で取得することができます。

> **Note**: Xcode で一度もプロジェクトを開かずにデバイスにインストールしようとすると、次のようなエラーが発生します。
>
> ```
> error: No profiles for 'personal.org.name.RnSpoiler.<personal>' were found: Xcode couldn't find any iOS App Development provisioning profiles matching 'personal.org.name.RnSpoiler.<personal>'. Automatic signing is disabled and unable to generate a profile. To enable automatic signing, pass -allowProvisioningUpdates to xcodebuild. (in target 'RnSpoiler' from project 'RnSpoiler')
> ```
>
> このようなエラーが発生した場合は、一度 Xcode でプロジェクトを開いてからデバイスへのインストールを試してください。

### 個人の Apple ID でのチーム ID の確認方法

まず、Xcode から Apple ID でログインし、開発用の証明書を作成します。

1. Xcode でアカウントの設定画面を開き、必要ならログインします。
   - Xcode 12 では、「Preferences」＞「Accounts」でアカウントの設定画面を開けます
   - ログインする場合、左下の「＋」ボタンをクリックしてログインします。
2. 利用する Apple ID を選択状態にし、右側のチーム一覧で「<自分の氏名> (Personal Team)」と書かれているチームを選択します。
   - Apple Developer Program などに登録されているユーザの場合、Apple Developer Program のデベロッパー名なども表示されるため、複数のチームが表示されます。
3. 「Personal Team」を選択した状態で「Manage Certificates」をクリックします。
4. 「Apple Development Certificates」に証明書がリストされていることを確認します。
   - 証明書が表示されない場合は、左下の「＋」ボタンを押して証明書を作成してください。

次に、「キーチェーンアクセス」を開き、開発用の証明書を確認します。

1. 「キーチェーンアクセス」を開き、左上のキーチェーン一覧から「ログイン」を選択します。
2. 「分類」の「証明書」を選択し、ログインキーチェーンに保存されている証明書の一覧を表示します。
3. 「Apple Development: <Apple ID のメールアドレス> (xxxxxxxxxx)」という名前の証明書をダブルクリックし、情報を表示します。
4. 表示された情報の中の「部署」に設定されている文字列がチーム ID です。
