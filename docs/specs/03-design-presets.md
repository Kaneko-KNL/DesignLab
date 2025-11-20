# 仕様書: デザインタイプ・プリセットロジック

## 1. 目的
ユーザーが「Design Type」（AI, Glass, Corporateなど）を選択した際、単なるメタデータの変更だけでなく、そのタイプに相応しい**視覚的特徴（Radius, Shadow, Colors）**を自動的に適用することで、デザイン作成の効率と品質を向上させる。

## 2. プリセット定義

各デザインタイプ選択時に適用されるトークンの初期値を定義する。ユーザーはその後、これらをカスタマイズ可能とする。

### 2.1 AI (Artificial Intelligence)
*   **特徴**: 未来的、ダークモード基調、ネオンカラー。
*   **Colors**:
    *   Background: `#0f172a` (Dark Slate)
    *   Primary: `#8b5cf6` (Violet)
    *   Accent: `#06b6d4` (Cyan)
*   **Radius**: `6px` (ややシャープ)
*   **Shadow**: `0 0 20px rgba(139, 92, 246, 0.3)` (発光感のあるグロー)

### 2.2 Glass (Glassmorphism)
*   **特徴**: すりガラス効果、透明感、境界線。
*   **Colors**:
    *   Background: `rgba(255, 255, 255, 0.1)` (背景画像がある前提だが、単色としては薄いグレー)
    *   Surface: `rgba(255, 255, 255, 0.2)`
    *   Border: `1px solid rgba(255, 255, 255, 0.3)`
*   **Radius**: `16px` (大きめの角丸)
*   **Shadow**: `0 8px 32px 0 rgba(31, 38, 135, 0.37)` (深い影)
*   **BackdropFilter**: `blur(8px)` (CSS変数として追加検討)

### 2.3 Corporate (B2B/SaaS)
*   **特徴**: 信頼感、堅実、標準的。
*   **Colors**:
    *   Background: `#ffffff`
    *   Primary: `#2563eb` (Royal Blue)
    *   Text: `#1e293b` (Slate 800)
*   **Radius**: `4px` (小さめの角丸)
*   **Shadow**: `0 1px 3px rgba(0,0,0,0.1)` (控えめな影)

### 2.4 Medical (Healthcare)
*   **特徴**: 清潔感、安心感、ソフト。
*   **Colors**:
    *   Background: `#f0fdfa` (Mint White)
    *   Primary: `#0d9488` (Teal)
*   **Radius**: `12px` (優しい丸み)
*   **Shadow**: `0 4px 14px rgba(13, 148, 136, 0.1)` (色付きの柔らかい影)

### 2.5 Restaurant (Food)
*   **特徴**: 食欲をそそる、温かみ、ダイナミック。
*   **Colors**:
    *   Background: `#fff7ed` (Orange White)
    *   Primary: `#ea580c` (Orange)
*   **Radius**: `24px` (かなり丸い、または有機的)
*   **Shadow**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`

## 3. 実装ロジック
`designStore.ts` の `setDesignType` アクションを拡張する。

```typescript
setDesignType: (type) => {
  const preset = PRESETS[type]; // 定義されたプリセットを取得
  set((state) => ({
    theme: {
      ...state.theme,
      type,
      // プリセットが存在する場合のみ値を上書き
      ...(preset ? {
        radius: preset.radius,
        shadow: preset.shadow,
        colors: { ...state.theme.colors, ...preset.colors }
      } : {})
    },
    meta: { ...state.meta, isDirty: true }
  }));
}
```

## 4. 検証計画
1.  **Unit Test**: `setDesignType` を呼び出した後、`theme.radius` や `theme.colors` が期待通りに変化しているか確認。
2.  **Visual Check**: UI上で「Glass」を選択し、プレビューコンポーネントがすりガラス風（またはそれに近いスタイル）に変化することを目視確認。
