import { StyleSheet, View } from 'react-native';
import ExerciseListScreen from '@/components/exercises/ExerciseListScreen';

export default function ExercisesScreen() {
  return (
    <View style={styles.container}>
      <ExerciseListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});