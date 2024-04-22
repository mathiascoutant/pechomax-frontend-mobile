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

  const navigation = useNavigation<RegisterScreenNavigationProp>();    

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

Pellentesque fermentum nisl ut leo cursus, id sodales odio posuere. Praesent non pellentesque ante, id vestibulum nunc. Nam sagittis erat massa, vel tincidunt libero faucibus et. Aliquam convallis tristique elit nec tempus. Mauris id tortor in odio vulputate gravida. Sed quis eros sed velit efficitur fringilla. Maecenas gravida, dui nec tempor congue, nulla lorem facilisis dolor, nec iaculis orci ipsum feugiat lorem. Nam sollicitudin vitae velit volutpat tincidunt.

Nam ut mauris quam. Nunc sed augue felis. Vivamus in sapien in libero aliquet convallis. Nulla et orci ut nunc pharetra condimentum nec sed eros. Aenean quis libero nisi. Cras in efficitur elit. Curabitur in tellus in felis fringilla vestibulum id eget enim. Proin a felis eu mi ultrices tincidunt quis eu eros. Integer ante ex, tristique et tortor sit amet, gravida convallis ligula. Ut ornare est nec elit vehicula dictum. Mauris euismod rutrum tellus id suscipit. Mauris ante nisl, aliquam consequat posuere vitae, dictum a neque. Nullam accumsan ex elit, eget auctor dui bibendum a. Cras felis ipsum, eleifend non viverra nec, ullamcorper vitae velit.

Proin a dolor dolor. Cras mauris ipsum, gravida nec augue sit amet, sollicitudin finibus urna. Vivamus eleifend aliquet ex vitae interdum. Sed ut erat nec urna eleifend dapibus. Donec suscipit tincidunt nisi, sit amet bibendum sem varius in. Cras sodales viverra leo, non facilisis quam mollis nec. Nunc sodales sapien eget dui rutrum, nec pharetra nulla vestibulum. Cras placerat erat bibendum, pulvinar lorem non, pharetra est. Integer aliquet mauris lectus, a fringilla sapien dapibus quis. Duis arcu dui, posuere et ultricies non, laoreet quis magna. Nam maximus elementum nibh, ac dignissim sapien laoreet tristique. Duis id neque ultrices, efficitur enim varius, molestie lacus. Nullam auctor tellus id diam venenatis suscipit. Fusce tempor tincidunt ligula. Nullam mollis urna sed eros consectetur tristique. Aliquam eleifend elementum nisi ut gravida.

Praesent augue lectus, accumsan vitae nunc in, malesuada convallis eros. Mauris nec nulla eu odio dapibus blandit ac quis dui. Mauris faucibus eget magna ut blandit. Mauris blandit diam purus, ac rhoncus lacus feugiat non. Aliquam blandit ante nulla, et interdum risus laoreet at. Cras at massa at purus dignissim aliquam. Morbi hendrerit blandit dui, sit amet condimentum nisi blandit eget. Duis feugiat mauris nec diam rutrum, at suscipit nisl dignissim. Vivamus eu ipsum non quam aliquam consequat a at turpis.

Morbi ultrices, tortor quis pulvinar mollis, urna velit suscipit orci, ut interdum leo sapien in erat. Donec sodales et est non dignissim. Sed id quam elit. Donec fermentum elit urna, in euismod magna molestie non. Vestibulum sit amet est pellentesque, placerat lacus in, varius nisi. Suspendisse ut dignissim augue. Nulla viverra ligula nisl, eget placerat diam commodo nec. Praesent a pharetra tellus, non euismod sapien. Quisque sed condimentum neque. Proin semper tellus lacus, a varius nisi imperdiet vel. Cras eu elementum enim. Cras nec porta odio.

Aliquam turpis lacus, finibus id augue sit amet, pellentesque mattis enim. Sed et mi magna. Curabitur quis massa convallis, egestas lacus a, aliquam mi. Pellentesque vehicula ac sem eget auctor. Aliquam maximus pharetra ipsum eget hendrerit. Donec hendrerit ligula arcu, a pretium eros faucibus nec. Morbi blandit turpis vel dolor faucibus, eu consectetur est suscipit. Morbi sodales sodales tortor ac tincidunt. Proin vel turpis nec tortor tempor tristique ac a justo. Morbi interdum, mauris ac ornare mattis, nisi turpis commodo nibh, sit amet elementum lacus nisi quis lacus. Phasellus pellentesque in massa laoreet consequat. Suspendisse sagittis iaculis nulla vel facilisis. Sed consequat ex vitae convallis varius. Nunc interdum risus eget leo auctor, eu luctus tortor placerat.

Curabitur feugiat lorem quis massa laoreet ornare. Proin imperdiet, metus aliquam vehicula consequat, massa massa feugiat nibh, tempor ornare quam purus vel ante. Nulla vitae mi nec risus ullamcorper vehicula. Morbi vel pretium ipsum, id iaculis risus. Etiam tristique id turpis ac mollis. Nulla dolor nisl, euismod ut dapibus non, varius in elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras rutrum metus vel orci viverra, dapibus gravida eros scelerisque. Nam varius libero vitae massa bibendum, non sodales mauris condimentum. Maecenas in hendrerit sem, quis fermentum augue. Nulla risus velit, finibus non libero vitae, tristique congue elit. Praesent sed accumsan ante. Sed convallis metus nec lectus fringilla lacinia. Pellentesque feugiat quis purus in scelerisque. Sed at faucibus nisi. Donec rhoncus, leo at scelerisque vehicula, sem ex facilisis neque, in consectetur nulla nibh euismod sem.

Morbi augue metus, pellentesque vel elit molestie, dapibus aliquam tortor. Phasellus nibh nunc, fermentum eu vehicula lacinia, auctor nec metus. Pellentesque viverra venenatis lorem eget fermentum. Donec sit amet ipsum porta, laoreet est sit amet, volutpat orci. Integer suscipit arcu et egestas aliquet. In luctus suscipit accumsan. Nullam ut odio faucibus, egestas diam ac, rhoncus lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam malesuada orci eget placerat pretium. Duis quis rutrum metus. Donec tempor pulvinar orci, quis placerat nunc rhoncus in. Sed vestibulum euismod massa, vitae aliquet neque imperdiet vel. Cras vitae enim a enim vestibulum tincidunt. Vestibulum in lacinia neque. Etiam facilisis sodales tortor.

Ut sagittis, magna eget dapibus efficitur, magna felis ornare nisi, sit amet blandit leo tellus id erat. Cras blandit scelerisque nibh id volutpat. Maecenas mattis scelerisque tellus. Aenean pellentesque vitae odio et luctus. Fusce facilisis turpis a felis commodo, luctus fringilla metus viverra. Vivamus egestas molestie consequat. Aliquam velit erat, sagittis in est feugiat, laoreet tempor mi. Vestibulum molestie quam ac sapien sagittis, non consequat ligula accumsan. Aliquam erat volutpat. Vestibulum sed luctus neque. Integer interdum sem in nisl accumsan fermentum. Sed tincidunt augue at consequat gravida. Suspendisse potenti. Phasellus non erat eu sem feugiat pretium nec nec purus.

Nam faucibus tempor tellus, sed lacinia tortor tristique ut. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus condimentum ipsum eros, sed venenatis quam porta eu. In risus augue, commodo vitae turpis non, consectetur varius orci. Morbi turpis risus, tempus ac iaculis vitae, rhoncus id turpis. Pellentesque sagittis consectetur sapien. Cras ut vehicula augue. Nunc ornare dictum erat.

Pellentesque pellentesque, elit non pretium vulputate, quam turpis molestie leo, vel interdum odio tortor id nunc. Vestibulum porttitor a velit quis aliquam. Sed nec nunc eu tortor interdum lobortis sit amet ac massa. Vivamus egestas sapien mi, eget rutrum nibh maximus nec. In id sapien ac augue lobortis elementum at in nulla. Maecenas dapibus viverra est ut rutrum. Nulla a suscipit erat. Sed congue leo sit amet lectus mattis, eu aliquam metus vehicula. Vivamus ac dapibus nulla. Cras in tincidunt metus.

Sed lacus tortor, vestibulum et nunc nec, varius tincidunt risus. Sed maximus nibh ut elit finibus, sit amet sagittis dolor dignissim. Praesent in pellentesque augue. Maecenas sit amet massa eu magna tincidunt placerat ac non massa. Donec fringilla gravida nisi, vestibulum lobortis tellus eleifend vitae. Phasellus lacus mi, euismod id ultrices sit amet, tempus in dolor. Cras efficitur diam at nisl ultrices porta. Suspendisse potenti. Aliquam congue ac ante ut maximus. Vivamus elit ipsum, vestibulum vitae ipsum ac, maximus consequat elit. Cras diam risus, elementum ut elit euismod, posuere faucibus justo. Pellentesque gravida massa eget nibh vehicula viverra. In sed malesuada tellus. Sed lacinia porttitor urna, in porttitor felis congue et.

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