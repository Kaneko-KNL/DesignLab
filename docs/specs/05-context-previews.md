### 3.2 Blog (Media)
*   **Article Card**: サムネイル画像、カテゴリタグ、タイトル、抜粋、著者情報。
*   **Typography Content**: 見出し（H1-H3）、本文、リスト、引用の実例。
*   **Newsletter Form**: メールアドレス入力と購読ボタン。

### 3.3 Corporate (B2B)
*   **Team Section**: メンバー写真、名前、役職のカード。
*   **Contact Form**: 名前、メール、メッセージ入力、送信ボタン。
*   **Stats Row**: 数字（"100+"など）とラベルの横並び配置。

### 3.4 Mobile
*   **Mobile Nav**: ハンバーガーメニュー、ボトムナビゲーションバー。
*   **List View**: アバター付きリストアイテム（チャット一覧など）。
*   **Floating Action Button (FAB)**: 画面右下の円形ボタン。

### 3.5 Dashboard
*   **Stats Card**: アイコン、数値、増減率（緑/赤）を表示するカード。
*   **Data Table**: ヘッダー付きのテーブル、行のホバー効果、ステータスバッジ。
*   **Chart Placeholder**: グラフのプレースホルダー（視覚的な枠）。

### 3.6 App (Web Application)
*   **Login Form**: メール、パスワード、ログインボタン、"Forgot Password"リンク。
*   **Settings Panel**: スイッチ、スライダー、セレクトボックスなどのフォーム要素。
*   **Modal Dialog**: タイトル、本文、アクションボタン（Cancel/OK）。

## 4. 実装方針
1.  `src/components/preview/` に、上記コンポーネント群を追加実装する（`PreviewHero`, `PreviewArticle`, `PreviewDashboard` 等）。
2.  `Workspace.tsx` 内で、`activeTab` の値に応じてレンダリングするコンポーネントを切り替える `switch` 文（またはオブジェクトマッピング）を実装する。
