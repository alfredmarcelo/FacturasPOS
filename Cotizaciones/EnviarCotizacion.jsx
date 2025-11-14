import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { useNavigation } from '@react-navigation/native';
import PlanillaCotizacion from './PlanillaCotizacion'
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { useRoute } from '@react-navigation/native';


// Agregar funciones para envios de facturas en backend

export default function EnviarCotizacion() {
  const navigation = useNavigation();
  const route = useRoute();
  const { factura, rnc, fecha, ncf, nombre, DiasVencimiento, descuento, itbis, subtotal, total } = route.params;
  return (
    <View style={style.Container}>
      <View style={style.header}>
        <FontAwesome
          name="close"
          size={23}
          color={'black'}
          onPress={() => navigation.goBack()}
        />
        <View style={style.HeaderText}>
          <Text style={{ fontSize: 20 }}>Cotizacion creada</Text>
        </View>
      </View>
      <ScrollView>
        <View style={style.Body}>
          <View style={style.ContentContainer}>
            <PlanillaCotizacion
              factura={factura}
              rnc={rnc}
              ncf={ncf}
              nombre={nombre}
              fecha={fecha}
              DiasVencimiento={DiasVencimiento}
              subtotal={subtotal}
              itbis={itbis}
              total={total}
              descuento={descuento}
            />
          </View>
          <View style={style.EnviarFacturaContainer}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 15 }}>
                Enviar Factura a cliente por:{' '}
              </Text>
            </View>
            <View style={style.EnviarFactura}>
              <MaterialIcons name="content-copy" size={50} />
              <FontAwesome name="whatsapp" size={50} color={'green'} />
              <FontAwesome name="qrcode" size={50} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    width: '100%',
    height: '7%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    width: '90%',
    alignItems: 'center',
  },
  Body: {
    flex: 1,
    paddingBottom: 50,
    alignItems: 'center',
  },
  ContentContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  EnviarFacturaContainer: {
    width: '100%',
    height: '100%',
    marginTop: 30,
  },
  EnviarFactura: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
  },
});
