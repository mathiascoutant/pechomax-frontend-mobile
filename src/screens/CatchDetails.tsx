import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Catch } from '../interfaces/Catch';
import { getCatchById } from '../hooks/catches/getCatchById';
import { BACKGROUND_COLOR, BIG_TEXT_COLOR, TEXT_COLOR } from '../utils/colors';
import { formatTimeDifference } from '../hooks/utils';
import AddButton from '../components/AddButton';
import MapView, { Marker } from 'react-native-maps';

const CatchDetails = ({ route }: { route?: { params?: { id: string } } }) => {
  const { id } = route?.params ?? { id: '' };
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
  }, []);

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
              <Text style={styles.date}>Pêché : {formatTimeDifference(catchDetails.createdAt)}</Text>
              <Text style={styles.date}>Pêché à : {catchDetails.location.name}</Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: parseFloat(catchDetails.location.latitude),
                  longitude: parseFloat(catchDetails.location.longitude),
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(catchDetails.location.latitude),
                    longitude: parseFloat(catchDetails.location.longitude),
                  }}
                  title={catchDetails.location.name}
                />
              </MapView>
            </View>
          </ScrollView>
          <AddButton />
          <Modal visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
            <TouchableOpacity style={styles.modalContainer} onPress={() => setModalVisible(false)}>
            </TouchableOpacity>
            <Image source={{ uri: selectedImage ?? '' }} style={styles.modalImage} />
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
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: '95%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: 'black',
    top: '20%',
  },
  closeButton: {
    top: '3%',
    left: '75%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    width: 75,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
  },
  map: {
    height: 200,
    marginTop: 10,
  },
});
export default CatchDetails;