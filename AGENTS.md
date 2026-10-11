# AGENTS.md — `@codexporer.io/expo-pills`

## Package Overview
Selectable pill badge and horizontal scrollable pill group components (`Pill`, `Pills`) for filter chips, tags, and category selectors.

## Key Exports
- `Pills`: Container for rendering lists of selectable pills with optional horizontal scrolling.
- `Pill`: Individual selectable badge item.
- `PillSize`: Enum (`Small`, `Medium`, `Large`).
- `PillVariant`: Enum (`Default`, `Outline`, `Secondary`).

## Critical Guidelines for AI Agents
- Use `<Pills items={items} selectedValue={selected} onSelect={setSelected} />` for quick horizontal category selectors.
- Set `scrollable={true}` (default) when pill items exceed viewport width.
- Selected pills automatically highlight using `theme.primary` and `theme.background` tokens.
- When passing icons, use the `icon?: (props: { color, size, selected }) => ReactNode` callback.
