import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import { carte } from './carte';

const Game = () => {
  const [boardIndex, setBoardIndex] = useState(0);
  const fadeAnim = useMemo(() => new Animated.Value(0), []);
  const scaleAnim = useMemo(() => new Animated.Value(0.96), []);

  const currentBoard = useMemo(() => carte[boardIndex], [boardIndex]);
  const player = useAudioPlayer(currentBoard.sound);

  const playBoardSound = useCallback(() => {
    try {
      player.seekTo(0);
      player.play();
    } catch (error) {
      console.warn('Unable to play board sound:', error);
    }
  }, [player]);

  const animateBoard = useCallback(() => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.96);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const changeBoard = useCallback((nextIndex) => {
    setBoardIndex((nextIndex + carte.length) % carte.length);
  }, []);

  const randomizeBoard = useCallback(() => {
    let nextIndex = Math.floor(Math.random() * carte.length);

    while (nextIndex === boardIndex && carte.length > 1) {
      nextIndex = Math.floor(Math.random() * carte.length);
    }

    setBoardIndex(nextIndex);
  }, [boardIndex]);

  useEffect(() => {
    playBoardSound();
  }, [playBoardSound]);

  useEffect(() => {
    animateBoard();
  }, [animateBoard, boardIndex]);

  useEffect(() => {
    return () => {
      player.pause();
    };
  }, [player]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={currentBoard.boardView}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.sectionLabel}>Carte sélectionnée</Text>
          <Text style={styles.title}>{currentBoard.name}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaPill}>{currentBoard.difficulty}</Text>
            <Text style={styles.metaPill}>{currentBoard.theme}</Text>
            <Text style={styles.metaPill}>{currentBoard.players}</Text>
          </View>

          <Animated.View
            style={[
              styles.cardContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <Image source={currentBoard.boardIcon} style={styles.icon} />
            <Text style={styles.description}>{currentBoard.description}</Text>
          </Animated.View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => changeBoard(boardIndex - 1)}
            >
              <Text style={styles.secondaryText}>Précédent</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={randomizeBoard}>
              <Text style={styles.primaryText}>Carte aléatoire</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={() => changeBoard(boardIndex + 1)}
            >
              <Text style={styles.secondaryText}>Suivant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.58)',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  sectionLabel: {
    color: '#facc15',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 20,
  },
  metaPill: {
    color: '#111827',
    backgroundColor: '#fff7d6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    borderRadius: 22,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  icon: {
    width: 88,
    height: 88,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  description: {
    color: '#1f2937',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#facc15',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1 }],
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
  },
  primaryText: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 14,
  },
  secondaryText: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default Game;