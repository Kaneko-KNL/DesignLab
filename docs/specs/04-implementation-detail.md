# 詳細設計書 (Implementation Detail)

## 1. プロジェクト概要
**DesignLab** は、AI駆動開発における「デザイン定義」の認知負荷を軽減するためのIDEライクなWebアプリケーションです。ユーザーはGUIでデザインを操作し、その結果をLLMが理解可能なYAML形式で出力します。

## 2. 要件と実装の対照表 (Traceability Matrix)

| カテゴリ | 要件 (Prompt Elements) | 実装詳細 (Implementation) | 状態 |
| :--- | :--- | :--- | :--- |
| **Core** | IDEライクなWebアプリ | ヘッダー、サイドバー、ワークスペース、パネルの3ペイン構成 (`MainLayout.tsx`) | ✅ |
| | 認知負荷の低減 | 視覚的なプレビューと直感的なパラメータ操作により実現 | ✅ |
| | LLM向けYAML出力 | `src/lib/yaml.ts` にて `generateDesignYaml` を実装。クリップボードコピーとファイル保存に対応 | ✅ |
| **Tech** | Next.js (App Router) | Next.js 14+ で初期化。`src/app` ディレクトリ構造を採用 | ✅ |
| | Vanilla CSS | Tailwindを使用せず、CSS Modules (`*.module.css`) と CSS Variables (`globals.css`) で実装 | ✅ |
| | State Management | `zustand` を使用し、`designStore` (デザイン状態) と `languageStore` (言語状態) を分離管理 | ✅ |
| **UI/UX** | Premium Aesthetics | ダークモード基調、洗練された配色、Glassmorphismの採用、Lucideアイコンの使用 | ✅ |
| | Dynamic Design | `framer-motion` は未導入だが、CSS Transitionによる滑らかなホバー効果と状態変化を実装 | ✅ |
| | Real-time Preview | `Workspace.tsx` 内に `PreviewComponents` を配置し、Storeの変更を即座に反映 | ✅ |
| **Logic** | Design Presets | `designStore.ts` に `PRESETS` (AI, Glass, Restaurant等) を定義し、選択時にトークンを一括更新 | ✅ |
| | Color Randomizer | `src/lib/colors.ts` にHSLベースの調和のとれたランダム生成ロジックを実装 | ✅ |
| **Protocol** | Antigravity Protocol | `docs/specs/`, `docs/troubleshooting/`, `docs/adr/` のディレクトリ構造を遵守 | ✅ |
| | i18n (日本語対応) | ヘッダーでの言語切り替え、UIの完全日本語化、ドキュメントの日本語化 | ✅ |

## 3. 詳細アーキテクチャ

### 3.1 ディレクトリ構造 (Antigravity準拠)
```
f:\KNLAB\2025_DesignLab\
├── docs\
│   ├── adr\                # 意思決定記録 (Styling Strategy)
│   ├── specs\              # 仕様書 (Architecture, UI/UX, Presets, Detail)
│   └── troubleshooting\    # トラブルシューティング (Build Error)
├── src\
│   ├── app\                # Next.js Pages & Layouts
│   ├── components\
│   │   ├── layout\         # Header, Sidebar, Workspace, DesignPanel
│   │   └── preview\        # PreviewButton, PreviewCard...
│   ├── lib\                # colors.ts, yaml.ts
│   └── store\              # designStore.ts, languageStore.ts
```

### 3.2 データモデル (Design State)
```typescript
interface DesignState {
  meta: {
    name: string;
    isDirty: boolean;
    // ...
  };
  theme: {
    type: 'AI' | 'Glass' | 'Medical' | ...;
    colors: {
      background: string;
      text: string;
      primary: string;
      // ...
    };
    radius: string; // '4px', '16px'...
    shadow: string; // CSS box-shadow string
  };
}
```

### 3.3 デザインプリセットロジック
ユーザーがデザインタイプを選択すると、以下のロジックでStoreが更新されます。
1.  **AI**: ダークブルー背景 (`#0f172a`) + ネオンパープル (`#8b5cf6`) + シャープな角丸 (`6px`) + グロー効果。
2.  **Glass**: 半透明背景 (`rgba`) + ブラー効果（CSS） + 大きな角丸 (`16px`)。
3.  **Medical**: 清潔な白緑 (`#f0fdfa`) + ティール (`#0d9488`) + 優しい角丸 (`12px`)。
4.  **Restaurant**: 暖色ホワイト (`#fff7ed`) + オレンジ (`#ea580c`) + 有機的な角丸 (`24px`)。

## 4. 今後の拡張性 (Roadmap)
- **Google Drive連携**: 現在はプレースホルダー。Google Drive APIを用いてクラウド保存を実装可能。
- **Framer Motion**: より高度なマイクロインタラクションの実装。
- **Component Library**: プレビューコンポーネント（Table, Modal, Graph等）の拡充。
