import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import AddButton from '../components/AddButton';
import { getSelf } from '../hooks/users/getSelf';

export default function Home() {
  type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

  // const navigation = useNavigation<RegisterScreenNavigationProp>();    

  return (
    <View>
        <ScrollView contentContainerStyle={styles.globalAuth}>
            <Image style={styles.logo} source={require('../../assets/logo.png')} />
            <TouchableOpacity onPress={() => getSelf()}> 
              <Text>BOUTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOON TO LOGIN</Text>
            </TouchableOpacity>
            <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sagittis pulvinar odio, at ultrices arcu. In hac habitasse platea dictumst. Integer congue sapien in libero sodales, elementum pulvinar tellus tempus. Nullam ullamcorper nec arcu id condimentum. Morbi at nisi sapien. Vestibulum pharetra congue erat, et cursus ligula vestibulum sit amet. Mauris vel enim elit. Praesent vel consectetur odio. Fusce suscipit viverra lectus, gravida congue metus sollicitudin vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla consequat magna nec est vehicula laoreet. Pellentesque suscipit tincidunt cursus. Vestibulum condimentum consequat congue. Nulla consequat mauris nec sapien volutpat, pulvinar rutrum nulla consequat.

Ut dapibus dui dui, nec viverra risus dignissim congue. Phasellus dui mi, sagittis nec tristique eu, imperdiet id nunc. In non mi at metus lobortis fringilla. Integer ac viverra lacus. Phasellus vel magna dolor. Cras elementum sapien massa, quis luctus ipsum sollicitudin nec. Cras ac viverra eros.

Nulla non orci ut nisl lacinia commodo eu sed sapien. Pellentesque vel lacus et nulla sollicitudin congue. Proin sollicitudin aliquam est, vitae suscipit ligula volutpat non. Phasellus porta nec enim in tristique. Nam id imperdiet velit. Nulla lacinia justo in magna consequat, pharetra aliquam nunc accumsan. Duis vehicula tempus est, quis rhoncus felis porttitor sit amet. Integer sodales quam sit amet erat convallis feugiat. Fusce tellus est, feugiat vitae purus a, varius pellentesque eros. Nam scelerisque, augue non vehicula tempus, erat purus porttitor nisl, sit amet porttitor metus dolor et odio. Mauris lacinia sem sit amet leo ullamcorper, a aliquam tortor faucibus. Maecenas egestas, dolor eu maximus bibendum, ligula lorem malesuada turpis, eget pharetra urna risus et justo. Nam id iaculis tortor, a vestibulum nunc. In bibendum tristique fringilla. Aenean ac mauris ultrices, fermentum sapien a, suscipit sem.

Sed nec euismod velit, vel vestibulum elit. Aenean metus risus, malesuada eget cursus interdum, dignissim sed mauris. Donec tempus erat eget mattis molestie. Nam luctus non massa ac dapibus. Maecenas sodales ligula in velit iaculis, nec tincidunt nunc mattis. Vivamus in sodales arcu. Proin sagittis lectus sed lacus vestibulum malesuada. Cras semper augue ut posuere venenatis. Maecenas ac metus non enim finibus bibendum. Ut at nisi convallis, semper lectus vitae, fermentum nisi.
, vestibulum et nunc nec, varius tincidunt risus. Sed maximus nibh ut elit finibus, sit amet sagittis dolor dignissim. Praesent in pellentesque augue. Maecenas sit amet massa eu magna tincidunt placerat ac non massa. Donec fringilla gravida nisi, vestibulum lobortis tellus eleifend vitae. Phasellus lacus mi, euismod id ultrices sit amet, tempus in dolor. Cras efficitur diam at nisl ultrices porta. Suspendisse potenti. Aliquam congue ac ante ut maximus. Vivamus elit ipsum, vestibulum vitae ipsum ac, maximus consequat elit. Cras diam risus, elementum ut elit euismod, posuere faucibus justo. Pellentesque gravida massa eget nibh vehicula viverra. In sed malesuada tellus. Sed lacinia porttitor urna, in porttitor felis congue et.

            </Text>
        
        </ScrollView>
        <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  globalAuth: {
    alignItems: 'center',
  },

  logo: {
    // width: '50%',
    // height: '30%',
    // marginTop: 60,
  }
});