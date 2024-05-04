import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { BIG_TEXT_COLOR, TEXT_COLOR } from '../../utils/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Category } from '../../interfaces/Category';
import { Use } from 'react-native-svg';
import { User } from '../../interfaces/User';

const ConversationsFilterComponent = ({
    categories,
    users,
    setSelectedCategory,
    setSelectedUser,
}: {
    categories: Category[];
    users: User[];
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    setSelectedUser: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <View style={styles.filterContainer}>
      <View style={styles.selectCategory}>
        <Text style={styles.title}>Filtres</Text>
        <Text style={styles.filterText}>Filtrer par catégorie</Text>
        <SelectDropdown
          data={categories && [{ name: 'Toutes les catégories' }, ...categories]}
          onSelect={(selectedItem) => setSelectedCategory(selectedItem.name)}
          defaultValue={'Toutes les catégories'}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.name) || 'Toutes les catégories'}
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
      </View>

      <View style={styles.selectCategory}>
        <Text style={styles.filterText}>Filtrer par pêcheur</Text>
        <SelectDropdown
          data={users && [{ username: 'Tout les pêcheurs' }, ...users]}
          onSelect={(selectedItem) => setSelectedUser(selectedItem.username)}
          defaultValue={'Toutes les catégories'}
          search
          searchPlaceHolder={"Rechercher un pêcheur"}
          searchInputTxtColor={'#151E26'}
          renderSearchInputLeftIcon={() => {
            return <FontAwesomeIcon icon={faSearch} color={'#72808D'} size={18} />;
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.username) || 'Tout les pêcheurs'}
                </Text>
                <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text>{item.username}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={true}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    marginTop: 20,
  },
  selectCategory: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: BIG_TEXT_COLOR,
    paddingLeft: '3%',
  },
  filterText: {
    color: TEXT_COLOR,
    paddingLeft: '3%',
    marginBottom: 5
  },
  dropdownButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: TEXT_COLOR,
    width: '95%',
    alignSelf: 'center',
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    color: TEXT_COLOR,
  },
  dropdownButtonArrowStyle: {
    marginLeft: 5,
    color: TEXT_COLOR,
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

export default ConversationsFilterComponent;