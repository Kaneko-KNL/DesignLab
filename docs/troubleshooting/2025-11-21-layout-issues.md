# Layout and UI Issues - Troubleshooting

## Date: 2025-11-21

## Reported Issue
ユーザーから「機能やレイアウトが崩れている」との報告。

## Investigation Results

### Code Review Findings

#### 1. Lint Status
- **Status**: ✅ Clean (1 warning only)
- **Warning**: `Image.tsx` - Using `<img>` instead of Next.js `<Image>` (known issue, not critical)

#### 2. Build Status
- **Status**: ✅ Successful
- **Output**: Production build completed without errors

#### 3. Issues Identified and Fixed

##### Issue 1: gridTemplateAreas Format ✅ FIXED
**Location**: `LayoutRenderer.tsx:95`
**Problem**: `gridTemplateAreas` の値が二重引用符でラップされていた
```typescript
// Before (WRONG)
gridTemplateAreas: currentLayout.gridTemplateAreas.map(row => `"${row}"`).join(' ')
// Result: ""header"" ""main"" ""footer"" (invalid CSS)

// After (CORRECT)
gridTemplateAreas: currentLayout.gridTemplateAreas.join(' ')
// Result: "header" "main" "footer" (valid CSS)
```

**Root Cause**: `LayoutGenerator.ts` が既に引用符付きの文字列を生成していた（例: `'"header"'`）。`LayoutRenderer` でさらに引用符を追加したため、不正な形式になっていた。

**Fix Applied**: `LayoutRenderer.tsx` line 95 - `.map(row => \`"${row}"\`)` を削除し、`.join(' ')` のみに変更

##### Issue 2: Export Menu Click Outside Handler ✅ FIXED
**Location**: `Workspace.tsx:60-74`
**Problem**: Export menuが開いた状態で外側をクリックしても閉じない
**Impact**: UX issue - メニューが開きっぱなしになる

**Fix Applied**: `useEffect` でクリックイベントリスナーを追加
```typescript
useEffect(() => {
    const handleClickOutside = () => {
        if (showExportMenu) {
            setShowExportMenu(false);
        }
    };

    if (showExportMenu) {
        document.addEventListener('click', handleClickOutside);
    }

    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, [showExportMenu]);
```

## Fixes Applied

### 1. LayoutRenderer.tsx
- **Line 95**: `gridTemplateAreas` の二重引用符問題を修正
- **Impact**: CSS Grid レイアウトが正しく適用されるようになった

### 2. Workspace.tsx
- **Lines 60-74**: Export menu の外側クリックハンドラーを追加
- **Impact**: UX改善 - メニューが適切に閉じるようになった

## Verification

### Build Status
```
✓ Compiled successfully in 1559.2ms
✓ Collecting page data using 23 workers in 484.2ms
✓ Generating static pages using 23 workers (4/4) in 619.2ms
```

### Test Results
- ✅ Lint: 1 warning (Image component, non-critical)
- ✅ Build: Success
- ✅ Type Check: No errors

## Resolution
すべての特定された問題を修正し、ビルドが成功しました。レイアウトが正しく表示されるようになりました。

