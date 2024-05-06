import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, GestureResponderEvent } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp, faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { Species } from '../../interfaces/Species';
import { PRIMARY_COLOR, TEXT_COLOR } from '../../utils/colors';
import { Location as CustomLocation } from '../../interfaces/Location';

interface ModalComponentProps {
    isModalVisible: boolean;
    allSpecies: Species[];
    selectedSpeciesId: string;
    setSelectedSpeciesId: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (selectedLocationId: string) => Promise<void>;
    closeModal: () => void;
    selectedLocation: CustomLocation | null;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
    isModalVisible,
    allSpecies,
    selectedSpeciesId,
    setSelectedSpeciesId,
    handleSubmit,
    closeModal,
}) => {
    return (
        <Modal
            visible={isModalVisible}
            transparent={true}
            animationType='fade'
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <FontAwesomeIcon icon={faClose} size={25} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.titleModal}>Ajouter une espèce</Text>
                    <SelectDropdown
                        data={allSpecies || []}
                        onSelect={(selectedItem) => {
                            setSelectedSpeciesId(selectedItem.id);
                        }}
                        defaultValue={'Sélectionner une espèce'}
                        search
                        searchPlaceHolder='Rechercher une espèce'
                        searchInputTxtColor={TEXT_COLOR}
                        renderSearchInputLeftIcon={() => (
                            <FontAwesomeIcon icon={faSearch} color={'#72808D'} size={18} />
                        )}
                        renderButton={(item, isOpened) => (
                            <View style={styles.dropdownButtonStyle}>
                                <Text style={[styles.dropdownButtonTxtStyle, { color: '#72808D' }]}>
                                    {item?.name ?? 'Rechercher une espèce'}
                                </Text>
                                <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} style={styles.dropdownButtonArrowStyle} />
                            </View>
                        )}
                        renderItem={(item, isSelected) => (
                            <View key={item.id} style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                                <Text>{item.name}</Text>
                            </View>
                        )}
                    />

                    <TouchableOpacity style={styles.addSpeciesButton} onPress={(event: GestureResponderEvent) => handleSubmit(selectedSpeciesId)}>
                        <Text style={styles.addSpeciesButtonText}>Ajouter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    titleModal: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addSpeciesButton: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: -18,
        right: -17,
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 50,
        padding: 5,
    },
    addSpeciesButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    dropdownButtonStyle: {
        width: '55%',
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: TEXT_COLOR,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dropdownButtonTxtStyle: {
        color: TEXT_COLOR,
        textAlign: 'center',
    },
    dropdownButtonArrowStyle: {
        marginLeft: 5,
        color: TEXT_COLOR,
    },
    dropdownItemStyle: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: TEXT_COLOR,
    },
});

export default ModalComponent;
