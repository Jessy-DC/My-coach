import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Training } from '@/types';
import TrainingCard from './TrainingCard';

const TrainingList: React.FC = () => {
  const handleStartTraining = (training: Training) => {
    console.log('Starting training:', training.title);
  };

  const getWeeklyStats = () => {
    const completedTrainings = mockTrainings.filter(t => t.isCompleted).length;
    const scheduledThisWeek = mockTrainings.filter(t => 
      t.scheduledDate && isThisWeek(t.scheduledDate)
    ).length;
    
    return { completedTrainings, scheduledThisWeek };
  };

  const isThisWeek = (date: Date) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    return date >= startOfWeek && date <= endOfWeek;
  };

  const motivationalPhrases = [
    "💪 Votre transformation commence aujourd'hui !",
    "🔥 Chaque rep vous rapproche de vos objectifs !",
    "⚡ L'excellence n'est pas un acte, mais une habitude !",
    "🎯 Votre seule limite, c'est vous-même !",
    "🏆 Champions en devenir, l'entraînement vous attend !",
  ];

  const getRandomMotivation = () => {
    return motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
  };

  const stats = getWeeklyStats();

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>🏋️‍♂️ Mes Entraînements</Text>
      
      <View style={styles.motivationContainer}>
        <Text style={styles.motivationText}>{getRandomMotivation()}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.scheduledThisWeek}</Text>
          <Text style={styles.statLabel}>Cette semaine</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.completedTrainings}</Text>
          <Text style={styles.statLabel}>Terminés</Text>
        </View>
      </View>
    </View>
  );

  const sortedTrainings = [...mockTrainings].sort((a, b) => {
    if (a.isCompleted === b.isCompleted) return 0;
    return a.isCompleted ? 1 : -1;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedTrainings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TrainingCard
            training={item}
            onStartTraining={handleStartTraining}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const mockTrainings: Training[] = [
  {
    id: 1,
    title: "Full Body Débutant",
    description: "Un entraînement complet pour débuter en musculation avec des exercices de base pour tout le corps.",
    duration: 45,
    difficulty: "Débutant",
    category: "Full Body",
    exercises: [],
    isCompleted: true,
    scheduledDate: new Date(),
    targetMuscleGroups: ["Pectoraux", "Dos", "Jambes", "Bras"],
  },
  {
    id: 2,
    title: "HIIT Cardio Intense",
    description: "Entraînement par intervalles haute intensité pour brûler un maximum de calories en peu de temps.",
    duration: 30,
    difficulty: "Avancé",
    category: "Cardio",
    exercises: [],
    isCompleted: false,
    scheduledDate: new Date(Date.now() + 86400000),
    targetMuscleGroups: ["Cardio", "Core"],
  },
  {
    id: 3,
    title: "Upper Body Push",
    description: "Focus sur les muscles de poussée du haut du corps : pectoraux, épaules et triceps.",
    duration: 60,
    difficulty: "Intermédiaire",
    category: "Upper Body",
    exercises: [],
    isCompleted: false,
    targetMuscleGroups: ["Pectoraux", "Épaules", "Triceps"],
  },
  {
    id: 4,
    title: "Legs & Glutes Power",
    description: "Entraînement intensif pour développer la force et la puissance des jambes et fessiers.",
    duration: 55,
    difficulty: "Avancé",
    category: "Lower Body",
    exercises: [],
    isCompleted: true,
    scheduledDate: new Date(Date.now() - 86400000),
    targetMuscleGroups: ["Quadriceps", "Fessiers", "Mollets"],
  },
  {
    id: 5,
    title: "Yoga Flow Détente",
    description: "Session de yoga pour améliorer la flexibilité et réduire le stress après l'entraînement.",
    duration: 40,
    difficulty: "Débutant",
    category: "Récupération",
    exercises: [],
    isCompleted: false,
    targetMuscleGroups: ["Flexibilité", "Core", "Relaxation"],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  motivationContainer: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4FC3F7',
  },
  motivationText: {
    fontSize: 16,
    color: '#4FC3F7',
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4FC3F7',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
});

export default TrainingList;