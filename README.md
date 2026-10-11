# `@codexporer.io/expo-pills`

Theme-driven, accessible Pill and Pills components for Expo and React Native applications. Supports single pills, data-driven horizontal scrollable pill groups, custom icons, size presets, and dynamic theming via `@codexporer.io/expo-app-theme`.

## Installation & Peer Dependencies

```bash
yarn add @codexporer.io/expo-pills
```

Peer dependencies:
- `react` (`*`)
- `react-native` (`*`)
- `@codexporer.io/expo-app-theme` (`*`)

## Quick Start

### 1. Data-Driven Pills Group

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import { Pills, PillSize, PillVariant } from '@codexporer.io/expo-pills';

const FILTER_ITEMS = [
  { value: 'all', label: 'All Photos' },
  { value: 'favorites', label: 'Favorites' },
  { value: 'portraits', label: 'Portraits' },
  { value: 'videos', label: 'Videos' },
  { value: 'collages', label: 'Collages' }
];

export function FilterSection() {
  const [filter, setFilter] = useState('all');

  return (
    <View style={{ paddingVertical: 12 }}>
      <Pills
        items={FILTER_ITEMS}
        selectedValue={filter}
        onSelect={setFilter}
        size={PillSize.Medium}
        variant={PillVariant.Default}
        scrollable
      />
    </View>
  );
}
```

### 2. Single Pill with Icon

```tsx
import React, { useState } from 'react';
import { Pill, PillSize, PillVariant } from '@codexporer.io/expo-pills';
import { MaterialIcons } from '@expo/vector-icons';

export function BookmarkToggle() {
  const [active, setActive] = useState(false);

  return (
    <Pill
      label="Bookmarked"
      selected={active}
      onPress={() => setActive(!active)}
      size={PillSize.Small}
      variant={PillVariant.Outline}
      icon={({ color, size }) => (
        <MaterialIcons name="bookmark" size={size} color={color} />
      )}
    />
  );
}
```

### 3. Composition Mode (Children)

```tsx
import React, { useState } from 'react';
import { Pills, Pill } from '@codexporer.io/expo-pills';

export function RangeSelector() {
  const [range, setRange] = useState('7d');

  return (
    <Pills scrollable>
      <Pill label="Day" selected={range === '1d'} onPress={() => setRange('1d')} />
      <Pill label="Last 7 Days" selected={range === '7d'} onPress={() => setRange('7d')} />
      <Pill label="Month" selected={range === '30d'} onPress={() => setRange('30d')} />
      <Pill label="Year" selected={range === '1y'} onPress={() => setRange('1y')} />
    </Pills>
  );
}
```

## API Reference

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

### `<Pills />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `PillItem<T>[]` | — | Array of item definitions `{ value, label, icon?, disabled?, variant? }` |
| `selectedValue` | `T` | — | Active selected value in items array |
| `onSelect` | `(value: T) => void` | — | Selection callback returning chosen `value` |
| `children` | `ReactNode` | — | Direct `<Pill />` elements when using composition mode |
| `scrollable` | `boolean` | `true` | Renders items in a horizontal `ScrollView` |
| `showsHorizontalScrollIndicator` | `boolean` | `false` | Shows horizontal scroll bar |
| `size` | `PillSize` | `PillSize.Medium` | Shared size preset applied to child items |
| `variant` | `PillVariant` | `PillVariant.Default` | Shared style preset applied to child items |
| `containerStyle` | `StyleProp<ViewStyle>` | — | Outer wrapper style override |
| `contentContainerStyle` | `StyleProp<ViewStyle>` | — | Inner scroll content container style |

### Enums

#### `PillSize`
- `Small = 'small'` (height: 28, paddingHorizontal: 10, fontSize: 12)
- `Medium = 'medium'` (height: 36, paddingHorizontal: 14, fontSize: 14)
- `Large = 'large'` (height: 44, paddingHorizontal: 18, fontSize: 16)

#### `PillVariant`
- `Default = 'default'` (solid surface background with theme primary highlight on selection)
- `Outline = 'outline'` (bordered chip with outline and text tint on selection)
- `Secondary = 'secondary'` (secondary surface fill with primary toggle on selection)

## Theming

Colors are dynamically derived from `@codexporer.io/expo-app-theme`:
- **Unselected**: Background defaults to `theme.surface`, border to `theme.border`, text to `theme.text`.
- **Selected**: Background fills with `theme.primary` (in `Default` / `Secondary` variant) or border with `theme.primary` (in `Outline` variant).

## License

MIT