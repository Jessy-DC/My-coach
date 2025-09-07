import { Equipment } from '@/types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface EquipmentCardProps {
  equipment: Equipment;
  isSelected: boolean;
  onPress: (equipment: Equipment) => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, isSelected, onPress }) => {
  const defaultImageUri = 'https://via.placeholder.com/80x80/cccccc/666666?text=Equipment';

  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={() => onPress(equipment)}
    >
      <Text style={[styles.name, isSelected && styles.selectedText]}>
        {equipment.nom || 'Equipment Name Missing'}
      </Text>
      <Image 
        source={{ uri: defaultImageUri }}
        style={styles.image}
        resizeMode="cover"
      />
      {isSelected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#2A2A2A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedCard: {
    borderColor: '#0a7ea4',
    backgroundColor: '#1a4a5a',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    marginRight: 16,
  },
  selectedText: {
    color: '#4FC3F7',
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#0a7ea4',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EquipmentCard;