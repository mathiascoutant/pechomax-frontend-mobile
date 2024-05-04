import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Location as CustomLocation } from '../../interfaces/Location';
import { User } from '../../interfaces/User';
import { PRIMARY_COLOR, TEXT_COLOR } from '../../utils/colors';
import { Species } from '../../interfaces/Species';

interface LocationDetailsComponentProps {
    currentUser: User | null;
    selectedLocation: CustomLocation;
    cityName: string;
    setShowLocationDetails: React.Dispatch<React.SetStateAction<boolean>>;
    allSpecies: Species[]; 
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}


const LocationDetailsComponent: React.FC<LocationDetailsComponentProps> = ({
    selectedLocation,
    cityName,
    setIsModalVisible,
    currentUser}) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.locationDetailsContainer}>
                <Text style={styles.locationName}>{selectedLocation?.name},</Text>
                <Text style={styles.locationDetailsText}>à {cityName}</Text>
                <Text style={styles.locationDetailsText}>
                    lieu ajouté par {selectedLocation?.user?.username || currentUser?.username}
                </Text>
                <Text style={styles.locationDetailsText}>Description : </Text>
                <Text style={styles.locationDetailsText}>{selectedLocation?.description}</Text>
                <Text style={styles.locationDetailsText}>Espèces trouvables :</Text>
                {selectedLocation?.speciesLocations && selectedLocation.speciesLocations.length > 0 ? (
                    <View style={styles.speciesList}>
                        {selectedLocation.speciesLocations.map((speciesLocation, index) => (
                            <Text key={index} style={styles.locationDetailsText}>{speciesLocation.species.name}</Text>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.locationDetailsText}>Aucune espèce recensée, ajoutez-en une !</Text>
                )}
            </ScrollView>
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.addButtonLabel}>Ajouter une espèce</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    locationDetailsContainer: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
    },
    locationDetailsText: {
        color: TEXT_COLOR,
        marginBottom: 5,
    },
    locationName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: PRIMARY_COLOR,
    },
    addButton: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        alignItems: 'center',
    },
    addButtonLabel: {
        color: 'white',
        fontWeight: 'bold',
    },
    speciesList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginBottom: 10,
    },
});

export default LocationDetailsComponent;
