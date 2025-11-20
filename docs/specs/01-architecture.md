# アーキテクチャ仕様書

## 1. システム概要
**DesignLab** は、AI駆動開発のためのデザインシステム定義ツールです。ユーザーはGUIを通じてデザインの方向性（カラー、スタイル、雰囲気）を定義し、それをLLM（Large Language Model）が解釈可能な形式（YAML）で出力します。

### コアバリュー
- **認知負荷の低減**: 抽象的な「デザイン」を具体的なパラメータとして可視化。
- **LLMフレンドリー**: 生成されるYAMLは、LLMへのプロンプトコンテキストとして最適化。
- **即時フィードバック**: 設定変更をリアルタイムでプレビューに反映。

## 2. 技術スタック

### フロントエンド
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (CSS Modules & CSS Variables)
  - *理由*: Tailwindのクラス名羅列を避け、デザインの「意味」と「スタイル」を分離するため。また、きめ細やかなアニメーション制御のため。
- **State Management**: Zustand
  - *理由*: Reduxより軽量で、Context APIよりレンダリング最適化が容易なため。
- **Icons**: Lucide React
- **Animation**: Framer Motion

### データ構造 (Schema)
デザイン定義は以下の構造を持つYAMLとしてエクスポートされます。

```yaml
design_system:
  meta:
    name: "Project Name"
    author: "User Name"
    version: "1.0.0"
  theme:
    type: "AI | Glass | Corporate | ..."
    colors:
      primary: "#..."
      secondary: "#..."
      background: "#..."
      surface: "#..."
      text: "#..."
    typography:
      base_size: 16
      font_family: "Inter, sans-serif"
    components:
      radius: "8px"
      shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
```

## 3. ディレクトリ構造
```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root Layout
│   ├── page.tsx         # Main Page
│   └── globals.css      # Global Variables
├── components/
│   ├── layout/          # Header, Sidebar, Panels
│   ├── ui/              # Generic UI Components (Button, Input...)
│   └── preview/         # Preview Components (Canvas elements)
├── lib/                 # Utilities (Color logic, YAML generator)
├── store/               # Zustand Stores
└── types/               # TypeScript Definitions
```

## 4. データフロー
1.  **User Action**: ユーザーが右パネルで色を変更。
2.  **Store Update**: Zustandの`designStore`が更新される。
3.  **Re-render**: `Workspace`内のプレビューコンポーネントが新しい値を参照して再描画。
4.  **Export**: ユーザーが「Save」を押すと、Storeの状態をYAMLに変換してファイル保存。
