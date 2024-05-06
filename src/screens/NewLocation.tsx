import React, { useEffect, useRef, useState } from 'react';
import MapView, { Callout, Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text, Modal, TextInput } from 'react-native';
import * as Location from 'expo-location';

import { getAllLocations } from '../hooks/locations/getAllLocations';
import { Location as CustomLocation } from '../interfaces/Location';

import AxiosClient from '../hooks/axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { PRIMARY_COLOR, TEXT_COLOR } from '../utils/colors';
import Toast from 'react-native-toast-message';
import SelectDropdown from 'react-native-select-dropdown';
import { Species } from '../interfaces/Species';
import { getAllSpecies } from '../hooks/species/getAllSpecies';

export default function NewLocationScreen() {
    const [locations, setLocations] = useState<CustomLocation[] | null>(null);
    const [selectedCoordinate, setSelectedCoordinate] = useState<{ latitude: number, longitude: number } | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [askModalVisible, setAskModalVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [longitude, setLongitude] = useState<string>('');
    const [latitude, setLatitude] = useState<string>('');
    const mapViewRef = useRef<MapView>(null);
    const [allSpecies, setAllSpecies] = useState<Species[]>([]);
    const [speciesIds, setSpeciesIds] = useState<Array<string>>([]);
    
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

      fetchSpecies();
    }, []);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await getAllLocations();
                setLocations(response);
            } catch (error) {
                console.error(error);
            }
        }
    
        fetchLocations();
    }, [modalVisible]);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            if (mapViewRef.current) {
                mapViewRef.current.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            }
        })();
    }, []);
    

    const handleMapPress = (event: { nativeEvent: { coordinate: { latitude: number; longitude: number; }; }; }) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedCoordinate({ latitude, longitude });
        setLatitude(latitude.toString());
        setLongitude(longitude.toString());
    
        if (mapViewRef.current) {
            mapViewRef.current.animateToRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        }
        setTimeout(() => {
            setAskModalVisible(true);
        }, 500);
    };

    const handleSubmit = async () => {
        try {
            const formattedSpeciesIds = Array.isArray(speciesIds) ? speciesIds : [speciesIds];
    
            const response = await AxiosClient.post(
                '/locations/create',
                JSON.stringify({
                    longitude,
                    latitude,
                    name,
                    description,
                    speciesIds: formattedSpeciesIds,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            setModalVisible(false); 
            setAskModalVisible(false); 
            Toast.show({
                type: 'success',
                text1: 'Lieu ajouté avec succès !',
                text2: 'Votre coin de pêche a bien été ajouté à la carte.',
            });
    
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Erreur lors de l\'ajout du lieu.',
                text2: 'Veuillez réessayer plus tard.',
            });
        }
    };

    const handleModalesWithMarker = () => {
        setModalVisible(true);
        setAskModalVisible(false);
    };
    
    
    return (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            mapType='hybrid'            
            initialRegion={{
                latitude: selectedCoordinate ? selectedCoordinate.latitude : 0,
                longitude: selectedCoordinate ? selectedCoordinate.longitude : 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}
            ref={mapViewRef}
        >
            {locations?.map(location => (
                <Marker
                    key={location.id}
                    coordinate={{
                        latitude: parseFloat(location.latitude),
                        longitude: parseFloat(location.longitude)
                    }}
                    title={location.name}
                    description={location.description}
                    pinColor="red"
                />
            ))}
            {selectedCoordinate && (
                <Marker
                    coordinate={selectedCoordinate}
                    title="Ajouter le lieu"
                    pinColor="blue"
                >
                </Marker>
            )}
        </MapView>
        <Modal 
            animationType="fade"
            transparent={true}
            visible={askModalVisible}
            onRequestClose={() => setAskModalVisible(false)}
        >
            <View style={styles.askModalContainer}>
                <View style={styles.askModalContent}>
                    <TouchableOpacity style={styles.closeAskButton} onPress={() => setAskModalVisible(false)}>
                        <FontAwesomeIcon icon={faClose} size={15}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.marker} onPress={() => handleModalesWithMarker()}>
                        <Text>Ajouter le lieu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <FontAwesomeIcon icon={faClose} size={25}/>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            placeholder="Nom du lieu"
                            onChangeText={text => setName(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Décris-nous cet endroit !"
                            onChangeText={text => setDescription(text)}
                            multiline={true}
                        />
                        <SelectDropdown
                            data={allSpecies}
                            onSelect={(selectedItem) => setSpeciesIds(selectedItem.id)}
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
                        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                            <Text style={styles.saveButtonText}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
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
        width: '80%',
    },
    askModalContainer: {
        top: '44%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    askModalContent: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        maxHeight: 100,
    },
    closeButton: {
        position: 'absolute',
        top: -17,
        right: -18,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 50,
        padding: 5,
    },
    closeAskButton: {
        position: 'absolute',
        top: -12,
        right: -13,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 50,
        padding: 5,
    },
    saveButton: {
        backgroundColor: PRIMARY_COLOR,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        fontWeight: 'bold',
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
      marker: {
        zIndex: 99,
      },
});

