import { View, StyleSheet, Text, Dimensions } from 'react-native';
import Feather from '@react-native-vector-icons/feather';

export default function Linea() {
  const ventas = 2000;
  const compras = 10000;
  const total = ventas + compras;
  const ventasPorc = (ventas / total) * 100;
  const comprasPorc = (compras / total) * 100;

  return (
    <View style={styles.Container}>
      <View style={styles.LineasContainer}>
        <View style={[styles.Linea1, { width: `${comprasPorc}%` }]}>
          <Text
            style={{
              fontSize: 10,
              position: 'absolute',
              top: 5,
              fontWeight: '500',
            }}
          >
            Ingresos
          </Text>
        </View>
        <View style={[styles.Linea2, { width: `${ventasPorc}%` }]}>
          <Text
            style={{
              fontSize: 10,
              position: 'absolute',
              top: 5,
              fontWeight: '500',
            }}
          >
            Egresos
          </Text>
        </View>
      </View>
      <View style={styles.BloquesDatos}>
        <View style={styles.DatosEgresosContainer}>
          <View style={styles.icon}>
            <Feather name="arrow-down-circle" size={90} color={'#e61c1cff'} />
            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
              {comprasPorc.toFixed(1)}
            </Text>
          </View>
          <View style={styles.DatosEgresadosTexto}>
            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Compras</Text>
            <Text style={{ fontSize: 12 }}>RD$1000</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Gastos Op.</Text>
            <Text style={{ fontSize: 13 }}>RD$1000</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>
              Gastos Ext.
            </Text>
            <Text style={{ fontSize: 13 }}>RD$1000</Text>
          </View>
        </View>
        <View style={styles.DatosEgresosContainer}>
          <View style={styles.icon}>
            <Feather name="arrow-up-circle" color={'#2fc421ff'} size={90} />
            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
              {comprasPorc.toFixed(1)}
            </Text>
          </View>
          <View style={styles.DatosEgresadosTexto}>
            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Ventas</Text>
            <Text style={{ fontSize: 12 }}>RD$1000</Text>
            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Intereses</Text>
            <Text style={{ fontSize: 12 }}>RD$1000</Text>
            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
              Ventas Ext.
            </Text>
            <Text style={{ fontSize: 12 }}>RD$1000</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    width: '96%',
    height: '25%',
    maxHeight: '25%',
    marginBottom: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  LineasContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  Linea1: {
    width: '45%',
    height: '35%',
    backgroundColor: '#e61c1cff',
    borderEndStartRadius: 0,
    borderEndEndRadius: 0,
    borderRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  Linea2: {
    width: '45%',
    height: '35%',
    backgroundColor: '#2fc421ff',
    borderBottomEndRadius: 10,
    borderEndStartRadius: 10,
    alignContent: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  BloquesDatos: {
    width: '100%',
    height: '90%',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  DatosEgresosContainer: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: -5,
    gap: 10
  },
  DatosEgresadosTexto: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  icon: {
    padding: 0,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
});
