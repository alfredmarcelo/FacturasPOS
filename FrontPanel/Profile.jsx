import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export default function Profile({ Abrirboton }) {
  return (
    <View style={style.Profile}>
      <TouchableOpacity style={style.NavbarButton} onPress={Abrirboton}>
        <FontAwesome name="navicon" size={35} />
      </TouchableOpacity>
      <View style={style.Notificaciones}></View>
    </View>
  );
}

const style = StyleSheet.create({
  Profile: {
    width: '100%',
    height: '7%',
    maxHeight: '7%',
    justifyContent: 'center',
    display: 'flex',
    position: 'static',
  },
  NavbarButton: {
    width: '15%',
    height: '100%',
    maxHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderEndEndRadius: 100,
  },
});
