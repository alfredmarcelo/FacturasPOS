import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Structura from '../Componentes/EstructuraBody';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import Feather from '@react-native-vector-icons/feather';

export default function CrearCotizacion() {
  const date = new Date().toLocaleDateString('es-DO');
  const navigation = useNavigation();
  const route = useRoute();
  const { obtenernombre, obtenerrcn } = route.params;
  const [descuento, setdescuento] = useState();
  const [seleccionados, setSeleccionados] = useState([]);
  const [nuevosseleccionados, setnuevos] = useState([]);

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
    <Structura
      Headername={'Crear Cotizacion'}
      content={
        <ScrollView>
          <View style={style.Body}>
            <View style={style.Clientes}>
              <Text>Nombre</Text>
              <TextInput
                style={style.InputText}
                value={obtenernombre + ' - ' + obtenerrcn}
              />
            </View>
            <View style={style.Clientes}>
              <Text>Fecha</Text>
              <TextInput style={style.InputText} value={date} />
            </View>
            <View style={style.Clientes}>
              <Text>Agregar Descuento</Text>
              <TextInput style={style.InputText} onChangeText={setdescuento} />
            </View>
            <View style={style.Productos}>
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
            <View style={style.FlatlistContainer}>
              <FlatList
                contentContainerStyle={style.Flatlist}
                data={seleccionados}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <View style={style.FlatlistContent}>
                    <View style={style.FlatlistImagen}>
                      <Image
                        source={require('./7213d9b80cb64041b1b97a1741e255c4.png')}
                        style={{ resizeMode: 'cover', width: 100, height: 100 }}
                      />
                    </View>
                    <View style={style.Flatlistprices}>
                      <View style={style.FlatlistHeaderText}>
                        <Text style={{ fontSize: 20 }}>
                          {item.nombre}
                        </Text>
                      </View>
                      <View style={style.Prices}>
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
                    <View style={style.FlatlistButtons}>
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
        </ScrollView>
      }
      Footer={
        <View style={style.Footer}>
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
            style={style.Buttons}
            onPress={() =>
              navigation.navigate('EnviarCotizacion', {
                factura: seleccionados,
                nombre: obtenernombre,
                rnc: obtenerrcn,
                fecha: date,
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
      }
    />
  );
}

const style = StyleSheet.create({
  Body: {
    width: '100%',
    height: '100%',
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
    height: '1000%',
    backgroundColor: '#b8b2b296',
  },
  FlatlistImagen: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  Buttons: {
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: '30%',
    height: '50%',
    alignItems: 'center',
    backgroundColor: 'green',
  },
});
