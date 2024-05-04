import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { BIG_TEXT_COLOR, TEXT_COLOR } from '../../utils/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import CustomBorderBottom from '../CustomBorderBottom';

interface FilterComponentProps {
    selectedItem: string;
    setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ selectedItem, setSelectedItem }) => {
    return (
        <View >
            <View style={styles.filter}>
                <Text style={styles.bigText}>Filtrer :   </Text>
                <SelectDropdown
                    data={['Tous les emplacements', 'Mes emplacements']}
                    onSelect={(selectedItem) => setSelectedItem(selectedItem)}
                    defaultValue={'Tous les emplacements'}
                    renderButton={(selectedItem, isOpened) => (
                        <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {selectedItem || 'Tous les emplacements'}
                            </Text>
                            <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} style={styles.dropdownButtonArrowStyle} />
                        </View>
                    )}
                    renderItem={(item, isSelected) => (
                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                            <Text>{item}</Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={true}
                    dropdownStyle={styles.dropdownMenuStyle}
                />
            </View>
            <CustomBorderBottom />
        </View>
    );
}

const styles = StyleSheet.create({
    filter: {
        flexDirection: 'row',
        alignItems: 'baseline',
        left: '20%',
        marginBottom: 10,
    },
    dropdownButtonStyle: {
        width: '55%',
        padding: 8,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: BIG_TEXT_COLOR,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dropdownButtonTxtStyle: {
        color: BIG_TEXT_COLOR,
        textAlign: 'center',
    },
    dropdownMenuStyle: {
        backgroundColor: BIG_TEXT_COLOR,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: BIG_TEXT_COLOR,
    },
    dropdownItemStyle: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: BIG_TEXT_COLOR,
    },
    dropdownButtonArrowStyle: {
        marginLeft: 5,
        color: TEXT_COLOR,
    },
    bigText: {
        color: BIG_TEXT_COLOR,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default FilterComponent;
