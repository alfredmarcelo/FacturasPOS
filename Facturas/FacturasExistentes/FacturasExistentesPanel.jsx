import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FacturasExistentes() {
  const navigation = useNavigation();
  const route = useRoute();
  const { obtenernombre, obtenerrcn } = route.params;
  return (
    <View style={Style.Container}>
      <View style={Style.header}>
        <FontAwesome
          name="close"
          size={23}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <View style={Style.HeaderText}>
          <Text style={{ fontSize: 20 }}>Crear Factura</Text>
        </View>
      </View>
      <View style={Style.Body}>
        <View style={{ justifyContent: 'flex-start', width: '90%' }}>
          <Text style={{ fontSize: 20 }}>
            Cliente: {obtenernombre + ' - ' + obtenerrcn}
          </Text>
        </View>
        <View style={Style.ButtonsContainer}>
          <TouchableOpacity
            style={Style.Buttons}
            onPress={() => navigation.navigate('Camara')}
          >
            <FontAwesome name="photo" size={60} />
            <Text style={{ fontSize: 20 }}>Subir Factura con foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Style.Buttons}
            onPress={() => navigation.navigate('LlenadoManual')}
          >
            <FontAwesome name="pencil-square-o" size={60} />
            <Text style={{ fontSize: 20 }}>Subir Factura a Mano</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '7%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Body: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonsContainer: {
    width: '100%',
    height: '80%',
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  Buttons: {
    width: '80%',
    height: '40%',
    borderRadius: 10,
    backgroundColor: '#f2f5f4ff',
    justifyContent: 'center',
    borderWidth: 0.5,
    alignItems: 'center',
    gap: 10,
  },
});
