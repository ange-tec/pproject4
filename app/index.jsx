import { useEffect, useRef } from 'react';
import { Link } from 'expo-router';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function App() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 650,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 55,
        useNativeDriver: true,
      }),
    ]).start();

    const floatingLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -7,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]),
    );

    floatingLoop.start();

    return () => floatingLoop.stop();
  }, [fadeAnim, floatAnim, slideAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.sunShape} />
      <View style={styles.dots} />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.eyebrowRow}>
          <View style={styles.eyebrowLine} />
          <Text style={styles.eyebrow}>Une partie entre amis</Text>
          <View style={styles.eyebrowLine} />
        </View>

        <Text style={styles.title}>Bienvenue dans{`\n`}Mario Party</Text>
        <Text style={styles.intro}>
          Prépare les dés, choisis ton plateau et que la fête commence.
        </Text>

        <Animated.View
          style={[
            styles.logoFrame,
            { transform: [{ translateY: floatAnim }] },
          ]}
        >
          <View style={styles.logoGlow} />
          <Image
            source={require('../assets/Super_Mario_Party_Jamboree_Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.ribbon}>
            <Text style={styles.ribbonText}>7 plateaux à découvrir</Text>
          </View>
        </Animated.View>

        <Link href="/game" asChild>
          <Pressable
            style={({ hovered, pressed }) => [
              styles.gameButton,
              hovered && styles.gameButtonHover,
              pressed && styles.gameButtonPressed,
            ]}
          >
            <Text style={styles.buttonKicker}>C'est parti</Text>
            <Text style={styles.buttonText}>Choisir une carte</Text>
            <Text style={[styles.buttonArrow, styles.buttonArrowDefault]}>→</Text>
          </Pressable>
        </Link>

        <Text style={styles.footer}>Mario Party Jamboree · édition maison</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff4d6',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  sunShape: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: '#ffd966',
    opacity: 0.45,
    top: -170,
    right: -120,
  },
  dots: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 24,
    borderColor: '#ef6a5b',
    opacity: 0.14,
    bottom: -50,
    left: -42,
  },
  content: {
    width: '100%',
    maxWidth: 620,
    alignItems: 'center',
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  eyebrowLine: {
    width: 28,
    height: 2,
    backgroundColor: '#ef6a5b',
  },
  eyebrow: {
    color: '#b84a3d',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  title: {
    color: '#263b67',
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 46,
  },
  intro: {
    color: '#53627c',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    maxWidth: 390,
    marginTop: 12,
  },
  logoFrame: {
    width: 260,
    height: 138,
    backgroundColor: '#fffdf5',
    borderRadius: 28,
    marginTop: 24,
    marginBottom: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
    shadowColor: '#b84a3d',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 6,
  },
  logoGlow: {
    position: 'absolute',
    width: 190,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#ffe68d',
    opacity: 0.46,
  },
  logo: {
    width: 220,
    height: 108,
  },
  ribbon: {
    position: 'absolute',
    bottom: -12,
    backgroundColor: '#ef6a5b',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ribbonText: {
    color: '#fffaf0',
    fontSize: 12,
    fontWeight: '800',
  },
  gameButton: {
    minWidth: 250,
    backgroundColor: '#263b67',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: 'center',
    shadowColor: '#263b67',
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
    position: 'relative',
  },
  gameButtonHover: {
    backgroundColor: '#ef6a5b',
    transform: [{ translateY: -4 }, { scale: 1.03 }],
    shadowColor: '#b84a3d',
    shadowOpacity: 0.38,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
  },
  gameButtonPressed: {
    transform: [{ translateY: 1 }, { scale: 0.98 }],
    shadowOpacity: 0.16,
  },
  buttonKicker: {
    color: '#ffd966',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  buttonText: {
    color: '#fffaf0',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  buttonArrow: {
    color: '#ffd966',
    fontSize: 24,
    position: 'absolute',
    right: 18,
    top: 22,
  },
  buttonArrowDefault: {
    transform: [{ translateX: 0 }],
  },
  footer: {
    color: '#8f8068',
    fontSize: 11,
    marginTop: 24,
  },
});

