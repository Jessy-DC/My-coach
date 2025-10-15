import { StyleSheet, View } from 'react-native';
import TrainingList from '@/components/training/TrainingList';

export default function TrainingScreen() {
  return (
    <View style={styles.container}>
      <TrainingList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});