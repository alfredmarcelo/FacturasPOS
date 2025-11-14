import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import Slice from '../NavMenu/SliceMenu';
import Profile from '../FrontPanel/Profile';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import Clientes from '../Facturas/PanelClientes';

export default function Cotizaciones() {
  const [abrir, setAbrir] = useState(false);
  const toggleMenu = () => setAbrir(prev => !prev);
  const navigation = useNavigation();
  const [cotizaciones, setCotizaciones] = useState([
    {
      id: '1',
      cliente: 'Juan Pérez',
      fecha: '2025-11-10',
      total: 3500,
      estado: 'Pendiente',
    },
    {
      id: '2',
      cliente: 'Empresa ABC',
      fecha: '2025-11-09',
      total: 7200,
      estado: 'Aprobada',
    },
    {
      id: '3',
      cliente: 'María Gómez',
      fecha: '2025-11-07',
      total: 1800,
      estado: 'Rechazada',
    },
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={Style.card}>
      <View style={Style.row}>
        <Text style={Style.cliente}>{item.cliente}</Text>
        <Text style={Style.fecha}>{item.fecha}</Text>
      </View>
      <View style={Style.row}>
        <Text style={Style.total}>RD$ {item.total.toLocaleString()}</Text>
        <Text
          style={[
            Style.estado,
            {
              color:
                item.estado === 'Aprobada'
                  ? 'green'
                  : item.estado === 'Pendiente'
                  ? 'orange'
                  : 'red',
            },
          ]}
        >
          {item.estado}
        </Text>
      </View>
      <View style={[Style.row, { marginTop: 10 }]}>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            borderWidth: 1,
            height: '100%',
            width: '30%',
            alignItems: 'center',
            backgroundColor: 'green'
          }}
        >
          <Text style={{color: 'white'}}>Llevar a Factura</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            borderWidth: 1,
            height: '100%',
            width: '30%',
            alignItems: 'center',
            backgroundColor: 'red'
          }}
        >
          <Text style={{color: 'white'}}>Borrar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const [obtenernombre, setobtenernombre] = useState();
  const [obtenerrcn, setobtenerrnc] = useState();

  return (
    <View style={Style.Container}>
      {/* Menú lateral */}
      <Slice abrir={abrir} setAbrir={toggleMenu} />

      {/* Panel superior */}
      <Profile Abrirboton={toggleMenu} />
      <View style={Style.Clientes}>
        <Clientes
          setobtenernombre={setobtenernombre}
          setobtenerrnc={setobtenerrnc}
        />
      </View>
      <View style={Style.ButtonsContainer}>
        <TouchableOpacity
          style={Style.Buttons}
          onPress={() =>
            navigation.navigate('CrearCotizacion', {
              obtenernombre: obtenernombre,
              obtenerrcn: obtenerrcn,
            })
          }
        >
          <Text style={{ color: 'white' }}>Crear Cotizacion</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Style.Buttons}>
          <Text style={{ color: 'white' }}>Agregar C. Existente</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[Style.Buttons, { width: 85 }]}>
          <MaterialDesignIcons name="robot" size={25} color={'white'} />
        </TouchableOpacity>
      </View>

      <View style={Style.Header}>
        <Text style={Style.Title}>Tabla de cotizaciones</Text>
      </View>

      {/* Lista */}
      <View style={Style.Body}>
        <FlatList
          data={cotizaciones}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Clientes: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  Header: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  Title: {
    fontSize: 18,
    fontWeight: '600',
  },
  Body: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: 'grey'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cliente: {
    fontWeight: '600',
    fontSize: 16,
  },
  fecha: {
    color: '#777',
  },
  total: {
    fontSize: 15,
    fontWeight: '500',
  },
  estado: {
    fontWeight: '700',
  },
  ButtonsContainer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 15,
    flexDirection: 'row',
  },
  Buttons: {
    width: '35%',
    height: 35,
    borderRadius: 5,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
