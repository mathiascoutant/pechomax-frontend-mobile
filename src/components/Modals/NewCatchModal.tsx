import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Alert, Image, TextInput } from 'react-native';
import { useModalCatch } from '../../contexts/ModalContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faChevronDown, faChevronUp, faClose, faFolder, faSearch } from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'expo-image-picker';
import SelectDropdown from 'react-native-select-dropdown';
import { Species } from '../../interfaces/Species';
import { getAllSpecies } from '../../hooks/species/getAllSpecies';
import { TEXT_COLOR } from '../../utils/colors';
import AxiosClient from '../../hooks/axios';
import Toast from 'react-native-toast-message';
import { getAllLocations } from '../../hooks/locations/getAllLocations';

const NewCatchModal: React.FC = () => {
  const { isModalCatchVisible, toggleModalCatch } = useModalCatch();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [species, setSpecies] = useState<string>(''); 
  const [length, setLength] = useState<string>(''); 
  const [weight, setWeight] = useState<string>('');
  const [description, setDescription] = useState<string>(''); 
  const [localisation, setLocalisation] = useState<string>('');
  const [allSpecies, setAllSpecies] = useState<Species[]>([]);
  const [allLocations, setAllLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await getAllSpecies();
        const data = await response;
        
        setAllSpecies(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des espèces :', error);
      }
    };

    const fetchLocations = async () => { 
      try {
        const response = await getAllLocations();
        const data = await response;
        setAllLocations(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des localisations :', error);
      }
    };

    fetchLocations();
    fetchSpecies();
  }, []);

  const askToClose = () => {
    if (imageUri) {
      Alert.alert(
        'Voulez-vous conserver les données enregistrées ?',
        'Si non, les données saisies seront perdues.',
        [
        {
            text: 'Annuler',
            style: 'cancel',
        },
          {
            text: 'Non',
            style: 'cancel',
            onPress: () => {
              setLength('');
              setWeight('');
              setSpecies('');
              setLocalisation('');
              setDescription('');
              setImageUri('');
              toggleModalCatch();
            },
        },
          {
            text: 'Oui',
            onPress: () => {
              toggleModalCatch();
            },
          },
        ],
      );
    } else {
      toggleModalCatch();
    }
  }

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès à l\'appareil photo pour utiliser cette fonction.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); 
    }
  };

  const openGalery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
    if (!permissionResult.granted) {
        alert('Permission to access camera roll is required!');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); 
    }
  };

  const renderImageForm = () => {
    return (
      <View style={styles.imageFormContainer}>
        <Image source={{ uri: imageUri ?? '' }} style={styles.image} />
        <SelectDropdown
          data={allSpecies}
          onSelect={(selectedItem) => setSpecies(selectedItem.id)}
          search
          searchPlaceHolder={"Espèce du poisson"}
          renderSearchInputLeftIcon={() => {
            return <FontAwesomeIcon icon={faSearch} color={'#72808D'} size={18} />;
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem?.name ?? 'Espèce du poisson'}
                </Text>
                <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text>{item.name}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={true}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <TextInput
          style={styles.input}
          placeholder="Taille (cm)"
          value={length}
          onChangeText={setLength}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Poids (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <SelectDropdown
          data={allLocations}
          onSelect={(selectedItem) => setLocalisation(selectedItem.id)}
          search
          searchPlaceHolder={"Localisation de la prise"}
          renderSearchInputLeftIcon={() => {
            return <FontAwesomeIcon icon={faSearch} color={'#72808D'} size={18} />;
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem?.name || 'Localisation de la prise'}
                </Text>
                <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text>{item.name}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={true}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}>Valider</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleSubmit = async () => {
    try {    
        const formData = new FormData();
        formData.append('length', length);
        formData.append('weight', weight);
        formData.append('speciesId', species);
        formData.append('locationId', localisation);
        formData.append('description', description);
        formData.append('date', new Date().toISOString());
    
        if (imageUri) {
            const uriParts = imageUri.split('.');
            const fileType = uriParts[uriParts?.length - 1];
            formData.append('pictures', {
                uri: imageUri,
                name: `pictures.${fileType}`,
                type: `image/${fileType}`,
            });
        }

        const response = await AxiosClient.post('/catches/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        Toast.show({
            type: 'success',
            text1: 'Poisson pêché !',
            text2: 'Votre prise a bien été enregistrée.',
        });

        setLength('');
        setWeight('');
        setSpecies('');
        setLocalisation('');
        setDescription('');
        setImageUri('');
        toggleModalCatch();
    
    } catch (error) {
        console.error('Error submitting message:', error);
    }
};

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isModalCatchVisible}
      onRequestClose={toggleModalCatch}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={askToClose}>
            <FontAwesomeIcon icon={faClose} size={25} color="#555" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Nouvelle prise</Text>
          {imageUri ? renderImageForm() : (
            <View style={styles.selectMode}>
              <TouchableOpacity style={styles.buttonSelect} onPress={openCamera}>
                <FontAwesomeIcon icon={faCamera} size={25} color="#555" />
                <Text style={styles.buttonText}>Prendre une photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonSelect} onPress={openGalery}>
                <FontAwesomeIcon icon={faFolder} size={25} color="#555" />
                <Text style={styles.buttonText}>Sélectionner dans la galerie</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#c7f9cc',
    borderRadius: 50,
    padding: 5,
  },
  selectMode: {
    flexDirection: 'row',
    height: 150,
    marginTop: 20,
  },
  buttonSelect: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
    height: '100%',
  },
  buttonText: {
    marginTop: 5,
    fontSize: 16,
    color: '#555',
    bottom: 0,
  },
  imageFormContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: '#c7f9cc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  dropdownButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: TEXT_COLOR,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
  },
  dropdownButtonArrowStyle: {
    marginLeft: 5,
  },
  dropdownMenuStyle: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: TEXT_COLOR,
  },
  dropdownItemStyle: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: TEXT_COLOR,
  },
});

export default NewCatchModal;