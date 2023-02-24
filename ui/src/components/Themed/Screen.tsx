import React from 'react';
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native';
import {
  NativeSafeAreaViewProps as SafeAreaProps,
  SafeAreaView,
} from 'react-native-safe-area-context';

export type ScreenProps = {
  /** Wrap children in a scrollview */
  scrolling?: boolean;
  /** Props for scrollview if enabled */
  scrollViewProps?: ScrollViewProps;
  lightColor?: string;
  darkColor?: string;
  /** Whether the screen requires authentication; Will redirect user to login if not logged in */
  needsAuth?: boolean;
  /** Whether the screen makes use of a toast */
  useToast?: boolean;
  /** Props for Toast if enabled */
} & SafeAreaProps;

export function Screen({
  style,
  lightColor,
  darkColor,
  children,
  scrolling = false,
  needsAuth = false,
  useToast = false,
  scrollViewProps,
  ...rest
}: ScreenProps) {
  const defaultStyle: ViewStyle = {
    flex: 1,
    width: '100%',
    height: '100%',
  };

  return (
    <SafeAreaView
      edges={['bottom']}
      style={[defaultStyle, style]}
      {...rest}
    >
      {scrolling ? (
        <ScrollView
          automaticallyAdjustKeyboardInsets={true}
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      ) : (
        <>{children}</>
      )}
    </SafeAreaView>
  );
}
