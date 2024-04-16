import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, SafeAreaView, Text, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faFish, faHome, faPerson, faSignOut, faUser, faWarning, faWater, faXmark } from '@fortawesome/free-solid-svg-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { faWikipediaW } from '@fortawesome/free-brands-svg-icons';


export const Menu = ({ menu, setMenu }: { menu: boolean, setMenu: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const toggleMenu = () => {
        setMenu(!menu); 
      };

  return (
    <View style={styles.container}>
        <LinearGradient
            colors={['#c7f9cc', '#A7C4E4']}
            style={styles.background}
        />
        <View style={styles.header}>
            <View style={styles.headerTop}>
                <View style={styles.profile}>
                    <Image style={styles.profilePicture} src={'https://picsum.photos/200/300'} />
                    <Text style={styles.name}>Pêcheur</Text>
                </View>
                <TouchableOpacity onPress={toggleMenu} style={styles.closeButton}>
                    <FontAwesomeIcon icon={faXmark} size={25}/>
                </TouchableOpacity>
            </View>
            <View style={styles.lastCatch}>
                <Text style={{fontWeight: '600'}}>Dernière prise :</Text>
                <Text style={styles.lastCatchText}>- Espèce</Text>
                <Text style={styles.lastCatchText}>- Lieu</Text>
                <Text style={styles.lastCatchText}>- Taille</Text>
                <Text style={styles.lastCatchText}>- Poids</Text>
            </View>
        </View>
        <View style={styles.categories}>
            <TouchableOpacity style={styles.category}>
                <FontAwesomeIcon icon={faHome} size={25}/>
                <Text style={styles.titleCategory}>Accueil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}>
                <FontAwesomeIcon icon={faUser} size={25}/>
                <Text style={styles.titleCategory}>Profil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}>
                <FontAwesomeIcon icon={faWater} size={25}/>
                <Text style={styles.titleCategory}>Où pêcher ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}>
                <FontAwesomeIcon icon={faWikipediaW} size={25}/>
                <Text style={styles.titleCategory}>Wiki</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}>
                <FontAwesomeIcon icon={faBars} size={25}/>
                <Text style={styles.titleCategory}>Forums</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.category}>
                <FontAwesomeIcon icon={faFish} size={25}/>
                <Text style={styles.titleCategory}>Mes prises</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.contact}>
            <FontAwesomeIcon icon={faWarning} size={25}/>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:florian.mondaut@ynov.com') }>
                <Text style={styles.contactText}>Contacter le support</Text>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logOut}>
            <Text style={styles.logOutText}>Quitter le spot</Text>
            <FontAwesomeIcon style={styles.logOutText} icon={faSignOut} size={25}/>
        </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '80%',
    height: '100%',
    top: 0,
    bottom: 0,
    position: 'absolute',
    zIndex: 100,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 10,
    right: 0,
  },
  header:{
    paddingTop: '13%',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingBottom: '10%',
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
  },
  lastCatchText: {
    fontWeight: '500',
    fontSize: 15,
    paddingTop: '3%',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  categories: {
    padding: 10,
    paddingVertical: '10%',
    borderTopColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    // height: '80%',
  },
  category: {
    padding: 10,
    // borderBottomColor: 'black',
    // borderTopWidth: 1,
    flexDirection: 'row',
    // height: '8%'
  },
  titleCategory: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
  },
  closeButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    right: 5,
  },
  logOut: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: '5%',
    paddingTop: '22%',
    borderTopWidth: 1,
    height: '10%',
    gap: 10,
    alignItems: 'center',
  }, 
  logOutText: {
    color: 'red',
    fontWeight: 'bold',
  },
  contact: {
    padding: '3%',
    borderTopWidth: 1,
    height: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  contactText: {
    fontWeight: 'bold',
    fontSize: 15,
  }
});