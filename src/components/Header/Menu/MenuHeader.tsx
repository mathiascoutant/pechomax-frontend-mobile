import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { BIG_TEXT_COLOR } from '../../../utils/colors';
import { User } from '../../../interfaces/User';
import CustomBorderBottom from '../../CustomBorderBottom';
import { Catch } from '../../../interfaces/Catch';
import { getSelfCatches } from '../../../hooks/catches/getSelfCatches';

const MenuHeader = ({ user, toggleMenu }: { user: User, toggleMenu: () => void }) => {
  const [lastCatch, setLastCatch] = React.useState<Catch | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catchesData = await getSelfCatches();
        catchesData.sort((a: { date: Date; }, b: { date: Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime());
        const latestCatch = catchesData[0];
        setLastCatch(latestCatch);        
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View style={styles.profile}>
          <Image style={styles.profilePicture} source={{ uri: user?.profilePic }} />
          <View>
              <Text style={styles.name}>{user?.username}</Text>
              <Text style={styles.name}>{user ? user.level?.title : 'Non défini'}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
          <FontAwesomeIcon icon={faXmark} size={25} color={BIG_TEXT_COLOR}/>
        </TouchableOpacity>
      </View>
      {lastCatch ? (
        <View style={styles.lastCatch}>
          <Text style={[styles.lastCatchText, {fontWeight: '600'}]}>Dernière prise :</Text>
          <Text style={styles.lastCatchText}>{lastCatch?.species.name}</Text>
          <Text style={styles.lastCatchText}>{lastCatch?.length} cm - {lastCatch?.weight} kg</Text>
          <Text style={styles.lastCatchText}>{lastCatch?.location.name}</Text>
          <Text style={styles.lastCatchText}>{lastCatch?.description}</Text>
        </View>
      ) : (
        <Text style={styles.noCatchMessage}>
          Aucune prise enregistrée pour le moment. Prenez votre canne, votre leurre, et dépêchez-vous ! 
          Vous ne l'avez juste pas encore enregistrée ? Cliquez sur le bouton "+" en bas à droite de l'écran pour ajouter votre prise 🎣.
        </Text>
      )}
      <CustomBorderBottom />
    </View>
  );  
};

const styles = StyleSheet.create({
  header: {
    paddingTop: '13%',
    justifyContent: 'space-between',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  lastCatch: {
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    gap: 5,
  },
  lastCatchText: {
    fontWeight: '500',
    fontSize: 15,
    color: BIG_TEXT_COLOR,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: BIG_TEXT_COLOR,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
    right: 0,
  },
  closeButton: {
    borderRadius: 5,
    right: '15%',
  },
  noCatchMessage: {
    color: BIG_TEXT_COLOR,
    fontSize: 15,
    width: '80%',
    marginVertical: '5%',
    left: '10%',
  },
});

export default MenuHeader;
