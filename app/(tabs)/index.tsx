import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>👋</Text>
        <Text style={styles.title}>Bienvenue sur My Coach</Text>
        <Text style={styles.subtitle}>Votre application de coaching personnel</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardIcon}>💡</Text>
          <Text style={styles.cardTitle}>Conseils personnalisés</Text>
          <Text style={styles.cardDescription}>
            Découvrez nos conseils adaptés à vos objectifs
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardIcon}>🏋️</Text>
          <Text style={styles.cardTitle}>Exercices variés</Text>
          <Text style={styles.cardDescription}>
            Une large gamme d'exercices pour tous les niveaux
          </Text>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardIcon}>🛠️</Text>
          <Text style={styles.cardTitle}>Équipements</Text>
          <Text style={styles.cardDescription}>
            Sélectionnez vos équipements disponibles
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 20,
    gap: 20,
  },
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#4FC3F7',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 20,
  },
});
