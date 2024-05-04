import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Location as CustomLocation } from '../../interfaces/Location';
import { User } from '../../interfaces/User';
import { SECONDARY_COLOR, PRIMARY_COLOR } from '../../utils/colors';

interface MapComponentProps {
    locations: CustomLocation[] | null;
    currentUser: User | null;
    mapViewRef: React.RefObject<MapView>;
    selectedLocation: CustomLocation | null;
    setShowLocationDetails: React.Dispatch<React.SetStateAction<boolean>>;
    getCityName: (latitude: number, longitude: number) => Promise<string>;
    setSelectedLocation: React.Dispatch<React.SetStateAction<CustomLocation | null>>;
}

const MapComponent: React.FC<MapComponentProps> = ({
    locations,
    currentUser,
    mapViewRef,
    selectedLocation,
    setShowLocationDetails,
    getCityName,
    setSelectedLocation,
}) => {
    const handleMarkerPress = async (location: CustomLocation) => {
        setShowLocationDetails(true);
        await getCityName(parseFloat(location.latitude), parseFloat(location.longitude));
        setSelectedLocation(location);
    };
    

    return (
        <MapView
            style={styles.map}
            showsUserLocation={true}
            mapType='hybrid'
            ref={mapViewRef}
        >
            {locations && locations.map(location => (
                <Marker
                    key={location.id}
                    coordinate={{
                        latitude: parseFloat(location.latitude),
                        longitude: parseFloat(location.longitude)
                    }}
                    title={location.name}
                    description={location.description}
                    pinColor={location.userId === currentUser?.id ? SECONDARY_COLOR : PRIMARY_COLOR}
                    onPress={() => handleMarkerPress(location)}
                />
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});

export default MapComponent;
