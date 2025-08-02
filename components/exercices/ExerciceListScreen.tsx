import { getAdvices } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Exercice = {
  id: number;
  nom: string;
  description: string;
  muscles: string;
};

const ExerciseListScreen = () => {
  const [advices, setAdvices] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const data = await getAdvices();
          console.log(data);
          setAdvices(data);
        } catch (err) {
          setError((err as Error).message);
        }
      };
  
      loadData();
    }, []);

  const renderItem = ({ item }: { item: Exercice }) => (
    <View style={styles.item}>
      <Text style={styles.nom}>{item.nom}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.muscles}>Muscles : {item.muscles}</Text>
    </View>
  );

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>🧠 Conseils :</Text>
      {error && <Text style={{ color: 'red' }}>Erreur : {error}</Text>}
      {advices.map((advice, index) => (
        <Text key={index}>• {advice}</Text>
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
});

export default ExerciseListScreen;