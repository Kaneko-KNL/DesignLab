# テキストカラー自動調整機能

## 概要

背景色とテキスト色の明度が近い場合（コントラストが低い場合）、自動的に調整して視認性を向上させる機能を実装しました。

**重要**: この機能は、**明度差が一定値（デフォルト30）未満の場合のみ**調整を行います。コントラストが既に十分な場合は、元のテキスト色をそのまま維持します。

## 使用方法

### 基本的な使い方

```typescript
import { adjustTextColorForReadability } from '@/lib/colors';

// 背景とテキストの明度が近い場合、自動調整
const backgroundColor = '#e0e0e0'; // 明るいグレー背景
const textColor = '#d0d0d0'; // ほぼ同じ明るさのグレーテキスト

const adjustedColor = adjustTextColorForReadability(backgroundColor, textColor);
// 結果: より暗いグレー（例: #404040）- コントラストが改善
```

### パラメータ

- `backgroundColor` (string, 必須): 背景色（HEX形式）
- `textColor` (string, オプション): テキスト色（HEX形式）。省略時は自動的に適切なコントラスト色を返します
- `minLightnessDiff` (number, オプション): 必要最小明度差（デフォルト: 30）。この値未満の場合のみ調整を実施
- `darkBgMinLightness` (number, オプション): 暗い背景時のテキスト最小明度（デフォルト: 70）
- `lightBgMaxLightness` (number, オプション): 明るい背景時のテキスト最大明度（デフォルト: 30）

### 動作の仕組み

1. **背景の明度判定**: 背景色の輝度を計算し、暗いかどうかを判定
2. **テキスト色の分析**: テキスト色と背景色の両方をHSL形式に変換
3. **明度差の計算**: 背景とテキストの明度差を計算
4. **調整判定**: 
   - 明度差が`minLightnessDiff`（デフォルト30）以上の場合 → **調整なし**（元のテキスト色を返す）
   - 明度差が30未満の場合 → 調整を実施
5. **自動調整**: 
   - **背景が暗い場合**: テキストの明度を上げる（最低70%）
   - **背景が明るい場合**: テキストの明度を下げる（最大30%）


### 使用例

#### 例1: ダークモードでのテキスト調整

```typescript
const darkBg = '#0f0f0f';
const primaryColor = '#3b82f6';

// 自動調整
const readableColor = adjustTextColorForReadability(darkBg, primaryColor);

<h1 style={{ 
  backgroundColor: darkBg, 
  color: readableColor 
}}>
  見やすいタイトル
</h1>
```

#### 例2: 動的な背景色への対応

```typescript
function DynamicText({ bg, text, children }) {
  const adjustedTextColor = adjustTextColorForReadability(bg, text);
  
  return (
    <div style={{ backgroundColor: bg, color: adjustedTextColor }}>
      {children}
    </div>
  );
}
```

#### 例3: 強調カラーなしの場合

```typescript
// textColorを省略すると、背景に対して最適なコントラスト色を自動選択
const autoColor = adjustTextColorForReadability('#1a1a1a');
// 結果: '#ffffff' (白) - 暗い背景に対して最適
```

## 実装の詳細

### アルゴリズム

1. 背景色のRGB値から輝度を計算（WCAG基準）
2. 輝度が0.5以下の場合、暗い背景と判定
3. 背景とテキストの両方をHSL形式に変換
4. 明度差を計算: `|背景の明度 - テキストの明度|`
5. **明度差が30未満の場合のみ調整を実施**:
   - 背景が暗い場合:
     - 明度を`背景の明度 + 30`または70のうち大きい方に引き上げ
     - 非常に暗い色（明度30未満）は彩度も調整（最大50%）
   - 背景が明るい場合:
     - 明度を`背景の明度 - 30`または30のうち小さい方に引き下げ
     - 非常に明るい色（明度70超）は彩度も引き上げ（最低40%）

### 調整例

| 背景色 | 元のテキスト色 | 明度差 | 調整後のテキスト色 | 説明 |
|--------|----------------|--------|-------------------|------|
| `#0f0f0f` (暗) | `#3b82f6` (青, 明度52) | 46 | `#3b82f6` (そのまま) | 明度差が十分（46≥30）なので調整なし |
| `#1a1a1a` (暗) | `#2563eb` (暗い青, 明度40) | 30 | `#2563eb` (そのまま) | 明度差が30なので調整なし |
| `#1a1a1a` (暗) | `#1d4ed8` (とても暗い青, 明度32) | 22 | `#7ba8ff` (明るい青) | 明度差が小さい（22<30）ので70%に引き上げ |
| `#ffffff` (明) | `#e0e0e0` (明るいグレー, 明度88) | 12 | `#404040` (暗いグレー) | 明度差が小さい（12<30）なので30%に引き下げ |
| `#f0f0f0` (明) | `#333333` (暗) | 82 | `#333333` (そのまま) | 明度差が十分（82≥30）なので調整なし |
| `#808080` (中) | `#7a7a7a` (ほぼ同じ) | 2 | `#1a1a1a` (暗) | 背景が中間なので暗い方向に調整 |


## WCAGとアクセシビリティ

この機能は、WCAG 2.0の相対輝度計算を基準にしており、テキストと背景のコントラスト比を改善します。ただし、完全なWCAG AA/AAA準拠を保証するものではないため、重要なアクセシビリティ要件がある場合は、追加のテストを推奨します。

## 関連関数

- `getContrastColor()`: 背景色に対して最適なコントラスト色（白or黒）を返す
- `getContrastMutedColor()`: 背景色に対して最適な控えめなコントラスト色を返す
- `hexToRgb()`: HEX形式をRGBに変換（内部関数）
- `getLuminance()`: 相対輝度を計算（内部関数）
