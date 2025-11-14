import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export default function Etiquetas({ setabrirFac }) {
  return (
    <View style={Style.Content}>
      <View style={Style.header}>
        <FontAwesome
          name="close"
          size={30}
          color={'white'}
          onPress={() => setabrirFac(false)}
        />
      </View>
      <View style={Style.Body}>
        <View style={Style.Factura}>
            <View style={Style.FacturaContainer}>
                <Text>Nombre del Negocio</Text>
                <Text>RNC</Text>
                <Text>NCF</Text>
                <Text>Fecha</Text>
                <View>
                    <Text>Productos</Text>
                </View>
                <Text>Itbis</Text>
                <Text>Total</Text>
            </View>
        </View>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  Content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2e2c2cdc',
    opacity: 100,
    zIndex: 1,
    position: 'absolute',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: '10%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
  },
  Body: {
    width: '100%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Factura: {
    width: '80%',
    height: '100%',
    backgroundColor: 'white',
  },
});
