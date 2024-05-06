import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { getAllLocations } from '../hooks/locations/getAllLocations';
import { getSelfLocations } from '../hooks/locations/getSelfLocations';
import { Location as CustomLocation } from '../interfaces/Location';
import { BACKGROUND_COLOR, BIG_TEXT_COLOR } from '../utils/colors';
import AddButton from '../components/AddButton';
import { User } from '../interfaces/User';
import { getSelf } from '../hooks/users/getSelf';
import { Species } from '../interfaces/Species';
import { getAllSpecies } from '../hooks/species/getAllSpecies';
import MapComponent from '../components/Locations/MapComponent';
import LocationDetailsComponent from '../components/Locations/LocationDetailsComponent';
import FilterComponent from '../components/Locations/FilterComponent';
import ModalComponent from '../components/Locations/ModalComponent';
import MapView from 'react-native-maps';
import { updateLocation } from '../hooks/locations/updateLocation';

const Locations = () => {
    const [locations, setLocations] = useState<CustomLocation[] | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<CustomLocation | null>(null);
    const [selectedLocationId, setSelectedLocationId] = useState<string>('');
    const [selectedItem, setSelectedItem] = useState<string>('Tous les emplacements');
    const [showLocationDetails, setShowLocationDetails] = useState(false);
    const [cityName, setCityName] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [selectedSpeciesId, setSelectedSpeciesId] = useState<string>('');
    const [allSpecies, setAllSpecies] = useState<Species[]>([]);
    const mapViewRef = useRef<MapView>(null);

    useEffect(() => {
        const fetchInitialData = async () => {            
            try {
                const user = await getSelf();
                setCurrentUser(user);
            } catch (error) {
                console.error(error);
            }

            try {
                let response;
                if (selectedItem === 'Mes emplacements') {
                    response = await getSelfLocations();
                } else {
                    response = await getAllLocations();
                }
                setLocations(response);
            } catch (error) {
                console.error(error);
            }

            try {
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
            } catch (error) {
                console.error(error);
            }
        };

        fetchInitialData();
    }, [selectedItem]);

    useEffect(() => {
        const fetchAllSpecies = async () => {
            try {
                const speciesResponse = await getAllSpecies();
                setAllSpecies(speciesResponse);
            } catch (error) {
                console.error(error);
            }
        };

        if (isModalVisible) {
            fetchAllSpecies();
        }
    }, [isModalVisible]);

    const getCityName = async (latitude: number, longitude: number) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const city = data.results[0].address_components.find((component: { types: string | string[]; }) =>
                    component.types.includes('locality')
                );
                setCityName(city ? city.long_name : '');

                return city ? city.long_name : '';
            } else {
                return '';
            }
        } catch (error) {
            console.error(error);
            return '';
        }
    };

    useEffect(() => {
        setSelectedLocationId(selectedLocation?.id || '');        
        if (selectedLocation) {
            getCityName(parseFloat(selectedLocation.latitude), parseFloat(selectedLocation.longitude));
        }
    }, [selectedLocation, selectedSpeciesId]);


    const handleSubmit = async (selectedSpeciesId: string) => {
        const updateData: CustomLocation = {
            id: selectedLocation?.id || '',
            longitude: selectedLocation?.longitude || '',
            latitude: selectedLocation?.latitude || '',
            userId: selectedLocation?.userId || '',
            user: selectedLocation?.user || {} as User,
            name: selectedLocation?.name || '',
            speciesLocations: selectedLocation?.speciesLocations || null,
            speciesIds: [
                ...(selectedLocation?.speciesIds || []),
                selectedSpeciesId
            ],
            description: selectedLocation?.description || '',
            createdAt: selectedLocation?.createdAt || '',
            updatedAt: selectedLocation?.updatedAt || ''
        };
        
    
        await updateLocation(selectedLocationId, updateData);
        setIsModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <MapComponent
                locations={locations}
                currentUser={currentUser}
                mapViewRef={mapViewRef}
                selectedLocation={selectedLocation}
                setShowLocationDetails={setShowLocationDetails}
                getCityName={getCityName}
                setSelectedLocation={setSelectedLocation}
            />
            <View style={[styles.controls, selectedLocation && { flex: 1 }]}>
                <Text style={styles.bigText}>Cherchez les meilleurs coins de pêche</Text>
                <FilterComponent
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                />
                    {selectedLocation && (
                    <LocationDetailsComponent
                        currentUser={currentUser}
                        selectedLocation={selectedLocation}
                        cityName={cityName}
                        setShowLocationDetails={setShowLocationDetails}
                        allSpecies={allSpecies}
                        setIsModalVisible={setIsModalVisible}
                    />
                )}
            </View>
            <AddButton />
            <ModalComponent
                isModalVisible={isModalVisible}
                allSpecies={allSpecies}
                selectedSpeciesId={selectedSpeciesId}
                setSelectedSpeciesId={setSelectedSpeciesId}
                selectedLocation={selectedLocation}
                handleSubmit={() => handleSubmit(selectedSpeciesId)}
                closeModal={() => setIsModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    controls: {
        backgroundColor: BACKGROUND_COLOR,
        padding: 10,
    },
    bigText: {
        color: BIG_TEXT_COLOR,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default Locations;