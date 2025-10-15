import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Training } from '@/types';

interface TrainingCardProps {
  training: Training;
  onStartTraining: (training: Training) => void;
}

const TrainingCard: React.FC<TrainingCardProps> = ({ training, onStartTraining }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant': return '#4CAF50';
      case 'Intermédiaire': return '#FF9800';
      case 'Avancé': return '#F44336';
      default: return '#4FC3F7';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {training.isCompleted && <Text style={styles.completedTick}>✓ </Text>}
          {training.title}
        </Text>
        <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(training.difficulty) }]}>
          <Text style={styles.difficultyText}>{training.difficulty}</Text>
        </View>
      </View>
      
      <Text style={styles.description} numberOfLines={2}>
        {training.description}
      </Text>
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Durée:</Text>
          <Text style={styles.detailValue}>{training.duration} min</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Exercices:</Text>
          <Text style={styles.detailValue}>{training.exercises.length}</Text>
        </View>
      </View>
      
      <View style={styles.muscleGroups}>
        {training.targetMuscleGroups.slice(0, 3).map((muscle, index) => (
          <View key={index} style={styles.muscleTag}>
            <Text style={styles.muscleText}>{muscle}</Text>
          </View>
        ))}
        {training.targetMuscleGroups.length > 3 && (
          <View style={styles.muscleTag}>
            <Text style={styles.muscleText}>+{training.targetMuscleGroups.length - 3}</Text>
          </View>
        )}
      </View>
      
      <TouchableOpacity
        style={[styles.startButton, training.isCompleted && styles.completedButton]}
        onPress={() => onStartTraining(training)}
        activeOpacity={0.7}
      >
        <Text style={styles.startButtonText}>
          {training.isCompleted ? 'Refaire' : 'Commencer'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 8,
  },
  completedTick: {
    color: '#4CAF50',
    fontSize: 18,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  description: {
    fontSize: 14,
    color: '#CCCCCC',
    lineHeight: 20,
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#888888',
    marginRight: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4FC3F7',
  },
  muscleGroups: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 16,
  },
  muscleTag: {
    backgroundColor: '#3A3A3A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  muscleText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
  startButton: {
    backgroundColor: '#4FC3F7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default TrainingCard;