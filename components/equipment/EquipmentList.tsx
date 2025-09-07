import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getEquipments } from '@/services/api';
import { Equipment } from '@/types';
import EquipmentCard from './EquipmentCard';

interface EquipmentListProps {
  onSelectionChange?: (selectedEquipments: Equipment[]) => void;
  multiSelect?: boolean;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ 
  onSelectionChange, 
  multiSelect = true 
}) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [selectedEquipments, setSelectedEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEquipments = async () => {
      try {
        setLoading(true);
        const data = await getEquipments();
        setEquipments(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadEquipments();
  }, []);

  useEffect(() => {
    onSelectionChange?.(selectedEquipments);
  }, [selectedEquipments, onSelectionChange]);

  const handleEquipmentPress = (equipment: Equipment) => {
    if (multiSelect) {
      setSelectedEquipments(prev => {
        const isSelected = prev.some(item => item.id === equipment.id);
        if (isSelected) {
          return prev.filter(item => item.id !== equipment.id);
        } else {
          return [...prev, equipment];
        }
      });
    } else {
      setSelectedEquipments(prev => {
        const isSelected = prev.some(item => item.id === equipment.id);
        return isSelected ? [] : [equipment];
      });
    }
  };

  const isSelected = (equipment: Equipment) => {
    return selectedEquipments.some(item => item.id === equipment.id);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4FC3F7" />
        <Text style={styles.loadingText}>Chargement des équipements...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur : {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🏋️‍♂️ Sélectionnez vos équipements
      </Text>
      {selectedEquipments.length > 0 && (
        <Text style={styles.selectionCount}>
          {selectedEquipments.length} équipement{selectedEquipments.length > 1 ? 's' : ''} sélectionné{selectedEquipments.length > 1 ? 's' : ''}
        </Text>
      )}
      <FlatList
        data={equipments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EquipmentCard
            equipment={item}
            isSelected={isSelected(item)}
            onPress={handleEquipmentPress}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  selectionCount: {
    fontSize: 14,
    color: '#4FC3F7',
    textAlign: 'center',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
  },
});

export default EquipmentList;