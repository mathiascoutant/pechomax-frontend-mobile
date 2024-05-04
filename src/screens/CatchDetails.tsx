import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Catch } from '../interfaces/Catch';
import { getCatchById } from '../hooks/catches/getCatchById';
import { BACKGROUND_COLOR, BIG_TEXT_COLOR, TEXT_COLOR } from '../utils/colors';
import { formatTimeDifference } from '../hooks/utils';
import AddButton from '../components/AddButton';

const CatchDetails = ({ route }) => {
  const { id } = route.params;
  const [catchDetails, setCatchDetails] = useState<Catch | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatchDetails = async () => {
      try {
        const catchData = await getCatchById(id);
        setCatchDetails(catchData);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de la prise :', error);
      }
    };

    fetchCatchDetails();
  }, [id]);

  const handleImagePress = (uri: string) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {catchDetails && (
        <>
          <ScrollView>
            <TouchableOpacity onPress={() => handleImagePress(catchDetails.pictures[0])}>
              <Image
                source={{ uri: catchDetails.pictures[0] }}
                style={styles.image}
              />
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>Détails de la prise</Text>
              <Text style={styles.description}>{catchDetails.species.name}</Text>
              <Text style={styles.description}>{catchDetails.description}</Text>
              <Text style={styles.dimensions}>Dimensions: {catchDetails.length} cm - {catchDetails.weight} kg</Text>
              <Text style={styles.description}>Pêcheur : {catchDetails.user.username}</Text>
              <Text style={styles.date}>Pêché : {formatTimeDifference(catchDetails.date)}</Text>
              <Text style={styles.date}>Pêché à : {catchDetails.localisation}</Text>
            </View>
          </ScrollView>
          <AddButton />
          <Modal visible={modalVisible} transparent={true}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
              <Image source={{ uri: selectedImage || '' }} style={styles.modalImage} />
            </View>
          </Modal>
        </>
      )}
      {!catchDetails && (
        <Text style={styles.noCatchesMessage}>Chargement des détails de la prise...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  image: {
    width: '96%',
    left: '2%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detailsContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: BIG_TEXT_COLOR,
  },
  description: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BIG_TEXT_COLOR,
    marginBottom: 5,
  },
  dimensions: {
    fontSize: 16,
    color: TEXT_COLOR,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  noCatchesMessage: {
    fontSize: 18,
    fontStyle: 'italic',
    color: TEXT_COLOR,
    textAlign: 'center',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
  },
});

export default CatchDetails;
