import { getExercises } from '@/services/api';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Animated } from 'react-native';
import { Exercise } from '@/types';

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, index }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const translateY = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 150,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        delay: index * 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY, index]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'facile':
      case 'débutant':
        return '#4CAF50';
      case 'intermédiaire':
      case 'moyen':
        return '#FF9800';
      case 'difficile':
      case 'avancé':
        return '#F44336';
      default:
        return '#4FC3F7';
    }
  };

  return (
    <Animated.View
      style={[
        styles.exerciseCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Text style={styles.exerciseIcon}>🏋️</Text>
          <Text style={styles.exerciseTitle}>{exercise.title}</Text>
        </View>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(exercise.difficulty) }]}>
          <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.exerciseDescription}>{exercise.description}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>🎯 Groupe musculaire:</Text>
            <Text style={styles.detailValue}>{exercise.targetMuscleGroup}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>⏱️ Durée:</Text>
            <Text style={styles.detailValue}>{exercise.duration} min</Text>
          </View>
          
          {exercise.equipments && exercise.equipments.length > 0 && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>🛠️ Équipements:</Text>
              <View style={styles.equipmentsContainer}>
                {exercise.equipments.map((equipment, idx) => (
                  <Text key={equipment.id} style={styles.equipmentChip}>
                    {equipment.nom}
                    {idx < exercise.equipments.length - 1 ? ', ' : ''}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const ExerciseListScreen = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        const data = await getExercises();
        setExercises(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#4FC3F7" />
          <Text style={styles.loadingTitle}>Chargement des exercices</Text>
          <Text style={styles.loadingSubtitle}>Préparation de vos exercices personnalisés...</Text>
          <View style={styles.loadingDots}>
            <View style={[styles.dot, styles.dot1]} />
            <View style={[styles.dot, styles.dot2]} />
            <View style={[styles.dot, styles.dot3]} />
          </View>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorTitle}>Oups ! Une erreur s'est produite</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏋️ Exercices</Text>
        <Text style={styles.headerSubtitle}>
          {exercises.length} exercice{exercises.length > 1 ? 's' : ''} disponible{exercises.length > 1 ? 's' : ''}
        </Text>
      </View>
      
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ExerciseCard exercise={item} index={index} />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#888888',
  },
  listContainer: {
    padding: 20,
  },
  exerciseCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 16,
    padding: 20,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  exerciseIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 24,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    gap: 16,
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
  },
  detailsContainer: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#4FC3F7',
    fontWeight: '600',
    minWidth: 140,
  },
  detailValue: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  equipmentsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  equipmentChip: {
    fontSize: 14,
    color: '#FFFFFF',
    backgroundColor: '#3A3A3A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    padding: 40,
  },
  loadingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 30,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4FC3F7',
    marginHorizontal: 4,
  },
  dot1: {},
  dot2: {},
  dot3: {},
  errorContainer: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#FF6B6B',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ExerciseListScreen;