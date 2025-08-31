import { getAdvices } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

type Exercice = {
  id: number;
  nom: string;
  description: string;
  muscles: string;
};

const ExerciseListScreen = () => {
  const [advices, setAdvices] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          setLoading(true);
          const data = await getAdvices();
          setAdvices(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      };
  
      loadData();
    }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text style={styles.loadingText}>Chargement des conseils...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>🧠 Conseils :</Text>
      {error && <Text style={{ color: 'red' }}>Erreur : {error}</Text>}
      {advices.map((advice: any, index: number) => (
        <Text style={{ color: 'white' }} key={index}>• {advice.title}</Text>
      ))}
    </View>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  item: { marginBottom: 20 },
  nom: { fontSize: 18, fontWeight: '600' },
  desc: { fontSize: 14 },
  muscles: { fontSize: 14, fontStyle: 'italic' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default ExerciseListScreen;