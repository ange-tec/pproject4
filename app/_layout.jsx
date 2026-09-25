import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { router, Stack } from 'expo-router';

const GameHeaderTitle = () => (
  <View style={styles.titleContainer}>
    <Pressable
      onPress={() => router.push('/')}
      style={styles.homeButton}
      accessibilityRole='button'
      accessibilityLabel='Retour à l accueil'
    >
      <Text style={styles.homeIcon}>🏠</Text>
    </Pressable>
    <Text style={styles.titleText}>Game</Text>
  </View>
);

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='game'
        options={{
          headerShown: true,
          headerTitle: () => <GameHeaderTitle />,
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: '#111827',
            shadowColor: 'transparent',
            elevation: 0,
          },
          headerTintColor: '#facc15',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  );
};

export default RootLayout;
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  homeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(250, 204, 21, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    fontSize: 18,
    lineHeight: 18,
  },
  titleText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 22,
  },
});