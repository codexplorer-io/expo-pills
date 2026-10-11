---
name: expo-pills
description: Instructions and guidelines for using @codexporer.io/expo-pills (Expo Pills) in React Native and Expo applications.
---

# `@codexporer.io/expo-pills` Skill

## Overview
`@codexporer.io/expo-pills` provides interactive chips and horizontally scrollable pill bars (`Pills`, `Pill`) for tags, category filters, and tab-style selectors with full `@codexporer.io/expo-app-theme` compliance.

---

## When to Use
- Filtering photo lists by category or aspect ratio.
- Selecting editing modes, brush sizes, or font styles in toolbars.
- Displaying tag chips.

---

## Usage Example

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Pills, PillSize, PillVariant } from '@codexporer.io/expo-pills';

const RATIO_OPTIONS = [
  { label: 'All', value: 'all' },
  { label: '1:1 Square', value: '1:1' },
  { label: '4:5 Portrait', value: '4:5' },
  { label: '16:9 Landscape', value: '16:9' },
  { label: '9:16 Story', value: '9:16' }
];

export function RatioFilterBar() {
  const [selectedRatio, setSelectedRatio] = useState('all');

  return (
    <View style={{ paddingVertical: 12 }}>
      <Pills
        items={RATIO_OPTIONS}
        selectedValue={selectedRatio}
        onSelect={setSelectedRatio}
        size={PillSize.Medium}
        variant={PillVariant.Default}
      />
    </View>
  );
}
```

---

## API Reference

### `<Pills />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `PillItem<T>[]` | — | Array of pill items `{ label, value, icon?, disabled? }` |
| `selectedValue` | `T` | — | Active selected value |
| `onSelect` | `(value: T) => void` | — | Selection change callback |
| `children` | `ReactNode` | — | Direct `<Pill />` elements when using composition mode |
| `scrollable` | `boolean` | `true` | Enables horizontal scroll container |
| `showsHorizontalScrollIndicator` | `boolean` | `false` | Shows scrollbar indicator |
| `size` | `PillSize` | `PillSize.Medium` | Size preset (`Small`, `Medium`, `Large`) |
| `variant` | `PillVariant` | `PillVariant.Default` | Visual style (`Default`, `Outline`, `Secondary`) |
| `containerStyle` | `StyleProp<ViewStyle>` | — | Outer wrapper style |
| `contentContainerStyle` | `StyleProp<ViewStyle>` | — | ScrollView content container style |

### `<Pill />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | *Required* | Label text displayed inside the pill |
| `selected` | `boolean` | `false` | Whether the pill is selected |
| `onPress` | `(event) => void` | — | Press callback |
| `size` | `PillSize` | `PillSize.Medium` | Height and padding preset (`Small`, `Medium`, `Large`) |
| `variant` | `PillVariant` | `PillVariant.Default` | Styling variant (`Default`, `Outline`, `Secondary`) |
| `icon` | `(props: PillIconProps) => ReactNode` | — | Icon render callback providing `{ color, size, selected }` |
| `disabled` | `boolean` | `false` | Disables interaction and lowers opacity |
| `activeOpacity` | `number` | `0.7` | Opacity when pressed |
| `style` | `StyleProp<ViewStyle>` | — | Container style override |
| `textStyle` | `StyleProp<TextStyle>` | — | Text typography override |

### Enums
- **`PillSize`**:
  - `Small = 'small'`
  - `Medium = 'medium'`
  - `Large = 'large'`
- **`PillVariant`**:
  - `Default = 'default'`
  - `Outline = 'outline'`
  - `Secondary = 'secondary'`

---

## Critical Rules & Guidelines
1. **Use `Pills` for Groups**: Prefer the declarative `<Pills items={...} />` component over manually mapping `<Pill />` items to ensure correct horizontal spacing and scrolling.
2. **Distinct Values**: Ensure every item has a unique `value` property.
3. **Themed Colors**: Never hardcode colors; selection and borders automatically derive from `useAppTheme()`.
