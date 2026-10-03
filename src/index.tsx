import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { useAppTheme } from '@codexporer.io/expo-app-theme';

export enum PillVariant {
  Default = 'default',
  Outline = 'outline',
  Secondary = 'secondary',
}

export enum PillSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface PillIconProps {
  size: number;
  color: string;
}

export interface PillProps extends Omit<TouchableOpacityProps, 'style'> {
  label?: string;
  title?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode | ((props: PillIconProps) => React.ReactNode);
  selected?: boolean;
  active?: boolean;
  onPress?: () => void;
  variant?: PillVariant;
  size?: PillSize;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<TextStyle | ViewStyle>;
  disabled?: boolean;
}

export const Pill: React.FC<PillProps> = ({
  label,
  title,
  children,
  icon,
  selected = false,
  active,
  onPress,
  variant = PillVariant.Default,
  size = PillSize.Medium,
  style,
  textStyle,
  iconStyle,
  disabled = false,
  activeOpacity = 0.7,
  ...restProps
}) => {
  const theme = useAppTheme();
  const isSelected = active !== undefined ? active : selected;

  const getSizeStyle = (): { container: ViewStyle; text: TextStyle; iconSize: number } => {
    switch (size) {
      case PillSize.Small:
        return {
          container: {
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 14,
            borderWidth: 1,
          },
          text: {
            fontSize: 12,
            fontWeight: '600',
          },
          iconSize: 12,
        };
      case PillSize.Large:
        return {
          container: {
            paddingHorizontal: 18,
            paddingVertical: 10,
            borderRadius: 24,
            borderWidth: 1,
          },
          text: {
            fontSize: 15,
            fontWeight: '600',
          },
          iconSize: 16,
        };
      case PillSize.Medium:
      default:
        return {
          container: {
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 20,
            borderWidth: 1,
          },
          text: {
            fontSize: 13,
            fontWeight: '600',
          },
          iconSize: 14,
        };
    }
  };

  const getVariantColors = (): { bg: string; border: string; text: string } => {
    switch (variant) {
      case PillVariant.Outline:
        return {
          bg: isSelected ? theme.surfaceSecondary : 'transparent',
          border: isSelected ? theme.primary : theme.border,
          text: isSelected ? theme.primary : theme.text,
        };
      case PillVariant.Secondary:
        return {
          bg: isSelected ? theme.primary : theme.surfaceSecondary,
          border: isSelected ? theme.primary : 'transparent',
          text: isSelected ? theme.surface : theme.text,
        };
      case PillVariant.Default:
      default:
        return {
          bg: isSelected ? theme.primary : theme.surface,
          border: isSelected ? theme.primary : theme.border,
          text: isSelected ? theme.surface : theme.text,
        };
    }
  };

  const sizeStyles = getSizeStyle();
  const colors = getVariantColors();

  const displayText = label ?? title;

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'function') {
      return icon({ size: sizeStyles.iconSize, color: colors.text });
    }
    if (React.isValidElement(icon)) {
      return icon;
    }
    // E.g. raw string emoji or text icon
    return <Text style={[styles.rawIcon, { fontSize: sizeStyles.iconSize }, iconStyle]}>{icon}</Text>;
  };

  return (
    <TouchableOpacity
      style={[
        styles.basePill,
        sizeStyles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      {...restProps}
    >
      {renderIcon()}
      {displayText ? (
        <Text style={[sizeStyles.text, { color: colors.text }, textStyle]}>
          {displayText}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export interface PillItem<T = string> {
  value: T;
  label: string;
  icon?: React.ReactNode | ((props: PillIconProps) => React.ReactNode);
  disabled?: boolean;
  variant?: PillVariant;
}

export interface PillsProps<T = string> {
  items?: PillItem<T>[];
  selectedValue?: T;
  onSelect?: (value: T) => void;
  children?: React.ReactNode;
  scrollable?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  size?: PillSize;
  variant?: PillVariant;
  activeOpacity?: number;
}

export function Pills<T = string>({
  items,
  selectedValue,
  onSelect,
  children,
  scrollable = true,
  showsHorizontalScrollIndicator = false,
  containerStyle,
  contentContainerStyle,
  size = PillSize.Medium,
  variant = PillVariant.Default,
  activeOpacity,
}: PillsProps<T>) {
  const content = (
    <>
      {items
        ? items.map((item) => (
            <Pill
              key={String(item.value)}
              label={item.label}
              icon={item.icon}
              selected={selectedValue === item.value}
              onPress={() => onSelect?.(item.value)}
              disabled={item.disabled}
              size={size}
              variant={item.variant ?? variant}
              activeOpacity={activeOpacity}
            />
          ))
        : children}
    </>
  );

  if (scrollable) {
    return (
      <View style={containerStyle}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
        >
          {content}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.wrapContainer, containerStyle, contentContainerStyle]}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  basePill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  rawIcon: {
    marginRight: 2,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  wrapContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Pill;
