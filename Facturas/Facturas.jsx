import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Profile from '../FrontPanel/Profile';
import { useState } from 'react';
import Slice from '../NavMenu/SliceMenu';
import Clientes from './PanelClientes';
import PanelFacturas from './PanelFacturas';
import Etiquetas from './Etiqueta';
import Borrar from './Borrar';
import Enviar from './Enviar';
import Agregar from './AgregarFacturas';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';

export default function Facturas() {
  const navigation = useNavigation();
  const [abrir, setAbrir] = useState(false);
  const [abrirFac, setabrirFac] = useState(false);
  const [trashpopup, setTrashpopup] = useState(false);
  const [enviarpopup, setenviarpopup] = useState(false);
  const toggleMenu = () => {
    setAbrir(prev => !prev);
  };

  const [obtenernombre, setobtenernombre] = useState();
  const [obtenerrcn, setobtenerrnc] = useState();

  return (
    <View style={Style.Container}>
      {abrirFac && <Etiquetas setabrirFac={setabrirFac} />}
      {trashpopup && <Borrar setTrashpopup={setTrashpopup} />}
      {enviarpopup && <Enviar setenviarpopup={setenviarpopup} />}

      <Slice abrir={abrir} setAbrir={toggleMenu} />
      <Profile Abrirboton={toggleMenu} />
      <View style={Style.Body}>
        <View style={Style.Clientes}>
          <Clientes
            setobtenernombre={setobtenernombre}
            setobtenerrnc={setobtenerrnc}
          />
        </View>
        <View style={Style.ButtonsContainer}>
          <View style={{ justifyContent: 'center' }}>
            <Text>Estado del cliente: </Text>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <Text>Buena</Text>
          </View>
        </View>
        <View style={Style.ButtonsContainer}>
          <TouchableOpacity
            style={Style.Buttons}
            onPress={() =>
              navigation.navigate('AgregarFactura', {
                obtenernombre: obtenernombre,
                obtenerrcn: obtenerrcn,
              })
            }
          >
            <Text style={{ color: 'white' }}>Agregar factura</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={Style.Buttons}
            onPress={() =>
              navigation.navigate('FacturasExistentesPanel', {
                obtenernombre: obtenernombre,
                obtenerrcn: obtenerrcn,
              })
            }
          >
            <Text style={{ color: 'white' }}>Agregar F. Existente</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[Style.Buttons, { width: 85 }]}>
            <MaterialDesignIcons name="robot" size={25} color={'white'} />
          </TouchableOpacity>
        </View>
        <View style={Style.PanelFacturas}>
          <PanelFacturas
            setabrirFac={setabrirFac}
            setTrashpopup={setTrashpopup}
            setenviarpopup={setenviarpopup}
          />
        </View>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
  },
  Body: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
  },
  ButtonsHeaderContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 40,
    marginTop: 20,
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
  Clientes: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  PanelFacturas: {
    alignItems: 'center',
    height: '70%',
    marginTop: 15,
  },
  ButtonsContainer: {
    width: '100%',
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 15,
    flexDirection: 'row',
  },
});
