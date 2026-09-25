import { Link } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/Super_Mario_Party_Jamboree_Logo.png')}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.subtitle}>Mario Party</Text>
          <Text style={styles.title}>Choisis ta carte et lance la partie</Text>
          <Link href="/game" style={styles.gameButton}>
            <Text style={styles.buttonText}>Lancer le jeu</Text>
          </Link>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(15, 23, 42, 0.42)',
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
  },
  subtitle: {
    color: '#ffd54a',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 18,
  },
  gameButton: {
    backgroundColor: '#facc15',
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  buttonText: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
  },
});

