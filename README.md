# @codexporer.io/expo-pills

Theme-driven, customizable Pill and Pills components for Expo and React Native applications.

## Features
- **Pill**: Individual interactive chip/pill supporting icons, multiple sizes, selection states, and semantic theme styling via `@codexporer.io/expo-app-theme`.
- **Pills**: Horizontal scrollable or wrapped container for groups of pills with single-selection support.

## Usage

### Single Pill
```tsx
import { Pill, PillSize, PillVariant } from '@codexporer.io/expo-pills';

<Pill
  label="All"
  selected={activeFilter === 'all'}
  onPress={() => setActiveFilter('all')}
  size={PillSize.Medium}
/>
```

### Pills Group (Data-driven)
```tsx
import { Pills } from '@codexporer.io/expo-pills';

<Pills
  items={[
    { value: 'all', label: 'All' },
    { value: 'sleep', label: 'Sleep', icon: '😴' },
  ]}
  selectedValue={activeFilter}
  onSelect={(val) => setActiveFilter(val)}
/>
```

### Pills Group (Composition)
```tsx
import { Pills, Pill } from '@codexporer.io/expo-pills';

<Pills scrollable>
  <Pill label="Day view" selected={range === 'day'} onPress={() => setRange('day')} />
  <Pill label="Last 7 days" selected={range === '7d'} onPress={() => setRange('7d')} />
</Pills>
```