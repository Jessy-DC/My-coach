import { StyleSheet, View } from 'react-native';
import EquipmentList from '@/components/equipment/EquipmentList';
import { Equipment } from '@/types';

export default function EquipmentScreen() {
  const handleSelectionChange = (selectedEquipments: Equipment[]) => {
    console.log('Selected equipments:', selectedEquipments);
  };

  return (
    <View style={styles.container}>
      <EquipmentList onSelectionChange={handleSelectionChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
});