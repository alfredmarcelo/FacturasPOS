import FontAwesome from '@react-native-vector-icons/fontawesome';
import Feather from '@react-native-vector-icons/feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialIcons from '@react-native-vector-icons/material-icons';

// Agregar NCF a Backend para generar el numero completo del comprobante
// Mejorar los Styles

export default function Agregar({ setagregar }) {
  const navigation = useNavigation();
  const date = new Date().toLocaleDateString('es-DO');
  const route = useRoute();
  const { obtenernombre, obtenerrcn } = route.params;

  const [descuento, setdescuento] = useState(0);
  const [check, setcheck] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
  const [nuevosseleccionados, setnuevos] = useState([]);
  const [openMetodoPago, setOpenMetodoPago] = useState(false);
  const [valueMetodoPago, setValueMetodoPago] = useState('');
  const [itemsMetodoPago, setItemsMetodoPago] = useState([
    { label: 'Transferencia', value: 'Transferencia' },
    { label: 'Caja (Manual)', value: 'Caja' },
  ]);

  const [DiasVencimiento, setDiasVencimiento] = useState();

  const [openComprobante, setOpenComprobante] = useState(false);
  const [valueComprobante, setValueComprobante] = useState('');

  useEffect(() => {
    if (nuevosseleccionados.length > 0) {
      setSeleccionados(prevSeleccionados => {
        const actualizados = [...prevSeleccionados];

        nuevosseleccionados.forEach(nuevo => {
          const index = actualizados.findIndex(p => p.id === nuevo.id);

          if (index !== -1) {
            // Si ya existe, sumar cantidad
            actualizados[index] = {
              ...actualizados[index],
              cantidad:
                (actualizados[index].cantidad || 0) + (nuevo.cantidad || 0),
            };
          } else {
            // Si no existe, agregar
            actualizados.push(nuevo);
          }
        });

        return actualizados;
      });

      // Limpia los nuevos seleccionados para evitar bucles infinitos
      setnuevos([]);
    }
  }, [nuevosseleccionados]);

  const [itemsComprobante, setItemsComprobante] = useState([
    { label: 'B01 – Factura de Crédito Fiscal', value: 'B01' },
    { label: 'B02 – Factura de Consumo', value: 'B02' },
    { label: 'B11 – Factura Gubernamental', value: 'B11' },
    { label: 'B15 – Comprobante para Regímenes Especiales', value: 'B15' },
    { label: 'B16 – Comprobante Gasto Menor', value: 'B16' },
  ]);

  const [tiposComprobantesElectronicos, settiposComprobantesElectronicos] =
    useState([
      { label: 'E31 – Factura de Crédito Fiscal', value: 'E31' },
      { label: 'E32 – Factura de Consumo', value: 'E32' },
      { label: 'E45 – Factura Gubernamental', value: 'E45' },
      { label: 'E34 – Comprobante para Regímenes Especiales', value: 'E44' },
      { label: 'E35 – Comprobante de Gasto Menor', value: 'E35' },
    ]);

  const calcularitbis = () =>
    seleccionados.reduce(
      (total, item) => total + Number(item.precio) * 0.18,
      0,
    );

  const calcularsubtotal = () => {
    const subtotal = seleccionados.reduce(
      (total, item) => total + Number(item.precio) * Number(item.cantidad),
      0,
    );

    const descuentoNum = parseFloat(descuento) || 0;

    return subtotal - descuentoNum;
  };

  const calcularTotal = () => {
    const total = calcularsubtotal() + calcularitbis();

    return total;
  };

  const Borrar = id => {
    setSeleccionados(prev => prev.filter(item => item.id !== id));
  };

  const MultCantidad = (a, b) => {
    const mult = a * b;
    return mult;
  };

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
      <ScrollView stickyHeaderHiddenOnScroll>
        <View style={Style.Body}>
          <View style={Style.Content}>
            <View style={Style.Clientes}>
              <Text>Cliente</Text>
              <TextInput
                value={obtenernombre + ' - ' + obtenerrcn}
                style={Style.InputText}
                disableKeyboardShortcuts
              />
            </View>
            <View style={Style.Clientes}>
              <Text>Metodo de pago</Text>
              <DropDownPicker
                open={openMetodoPago}
                value={valueMetodoPago}
                items={itemsMetodoPago}
                setOpen={setOpenMetodoPago}
                setValue={setValueMetodoPago}
                setItems={setItemsMetodoPago}
                placeholder=""
                style={Style.Input}
              />
            </View>
            <View style={Style.Clientes}>
              <Text>Fecha de emision</Text>
              <TextInput style={Style.InputText} value={date} />
            </View>
            <View style={Style.Clientes}>
              <Text>Dias para vencimiento</Text>
              <TextInput
                style={Style.InputText}
                keyboardType="number-pad"
                onChangeText={setDiasVencimiento}
              />
            </View>
            <View
              style={[
                Style.Clientes,
                { flexDirection: 'row', alignItems: 'center' },
              ]}
            >
              <MaterialIcons
                size={30}
                onPress={() => setcheck(prev => !prev)}
                name={check ? 'check-box' : 'check-box-outline-blank'}
              />
              <Text style={{ fontSize: 15 }}> Facturacion electronica?</Text>
            </View>
            <View style={Style.Clientes}>
              <Text>Tipo Comprobante</Text>
              <DropDownPicker
                open={openComprobante}
                value={valueComprobante}
                items={check ? tiposComprobantesElectronicos : itemsComprobante}
                setOpen={setOpenComprobante}
                setValue={setValueComprobante}
                setItems={
                  check ? settiposComprobantesElectronicos : setItemsComprobante
                }
                onChangeSearchText={valueComprobante}
                placeholder=""
                style={[Style.Input]}
              />
            </View>
            <View style={Style.Clientes}>
              <Text>Agregar Descuento</Text>
              <TextInput
                style={Style.InputText}
                keyboardType="number-pad"
                onChangeText={setdescuento}
              />
            </View>
            <View style={Style.Productos}>
              <Text style={{ color: 'white', fontSize: 20 }}>Productos</Text>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  padding: 11,
                  borderRadius: 10,
                }}
                onPress={() =>
                  navigation.navigate('BuscarProducto', {
                    onSeleccionar: seleccionados => {
                      setnuevos(seleccionados);
                    },
                  })
                }
              >
                <Text style={{ fontSize: 15 }}>Agregar Producto</Text>
              </TouchableOpacity>
            </View>
            <View style={Style.FlatlistContainer}>
              <FlatList
                contentContainerStyle={Style.Flatlist}
                data={seleccionados}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={Style.FlatlistContent}>
                    <View style={Style.FlatlistImagen}>
                      <Image
                        source={require('./7213d9b80cb64041b1b97a1741e255c4.png')}
                        style={{ resizeMode: 'cover', width: 100, height: 100 }}
                      />
                    </View>
                    <View style={Style.Flatlistprices}>
                      <View style={Style.FlatlistHeaderText}>
                        <Text style={{ fontSize: 20 }}>{item.nombre}</Text>
                      </View>
                      <View style={Style.Prices}>
                        <Text style={{ fontSize: 15 }}>
                          Cantidad: {item.cantidad}
                        </Text>
                        <Text style={{ fontSize: 15 }}>
                          Precio unitario: {item.precio}
                        </Text>
                        <Text style={{ fontSize: 15 }}>
                          Total:{' '}
                          {MultCantidad(
                            Number(item.precio),
                            Number(item.cantidad),
                          )}
                        </Text>
                      </View>
                    </View>
                    <View style={Style.FlatlistButtons}>
                      <Feather
                        name="x"
                        size={20}
                        color={'red'}
                        onPress={() => Borrar(item.id)}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={Style.Footer}>
        <View>
          <Text>Itbis: {calcularitbis().toFixed(2)}</Text>
          <Text>Descuento: {descuento}</Text>
          <Text>Subtotal: {calcularsubtotal().toFixed(2)}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <Text style={{ fontSize: 20 }}>Total:</Text>
          <Text style={{ fontSize: 15 }}>{calcularTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={Style.Buttons}
          onPress={() =>
            navigation.navigate('MetodosdePago', {
              factura: seleccionados,
              nombre: obtenernombre,
              rnc: obtenerrcn,
              ncf: valueComprobante,
              fecha: date,
              DiasVencimiento: DiasVencimiento,
              descuento: descuento,
              itbis: calcularitbis,
              subtotal: calcularsubtotal,
              total: calcularTotal,
            })
          }
        >
          <Text style={{ color: 'white' }}>Crear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Style = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'white',
    zIndex: 1,
  },
  header: {
    width: '100%',
    height: '7%',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Body: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    gap: 1,
  },
  HeaderText: {
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Clientes: {
    padding: 10,
  },
  InputText: {
    borderWidth: 1,
    borderColor: 'grey',
    width: '100%',
    borderRadius: 10,
    paddingLeft: 10,
    color: 'black',
  },
  Productos: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
    backgroundColor: 'green',
    margin: 0,
    alignItems: 'center',
    paddingLeft: 30,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  Flatlist: {
    flexDirection: 'column',
    borderRadius: 5,
    padding: 10,
  },
  FlatlistContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
    height: 110,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
  },
  FlatlistContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#b8b2b296',
  },
  Footer: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 50,
    borderTopColor: 'grey',
    borderTopWidth: 0.2,
  },
  FlatlistImagen: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Buttons: {
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: '30%',
    height: '50%',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  Flatlistprices: {
    width: '60%',
    height: '100%',
  },
  FlatlistHeaderText: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatlistButtons: {
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Prices: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
