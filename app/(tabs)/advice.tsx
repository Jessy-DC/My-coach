import { StyleSheet, View } from 'react-native';
import AdviceListScreen from '@/components/advice/AdviceListScreen';

export default function AdviceScreen() {
  return (
    <View style={styles.container}>
      <AdviceListScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});