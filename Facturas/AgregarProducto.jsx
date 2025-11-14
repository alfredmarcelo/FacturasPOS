import FontAwesome from '@react-native-vector-icons/fontawesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useState } from 'react';

export default function AgregarProducto() {
  const route = useRoute();
  const navigation = useNavigation();
  const { onSeleccionar } = route.params;
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState([
    {
      id: '1',
      nombre: 'Refresco Coca Cola',
      precio: 80,
      imagen: require('./7213d9b80cb64041b1b97a1741e255c4.png'),
    },
    {
      id: '2',
      nombre: 'Galletas Dino',
      precio: 50,
      imagen: require('./7213d9b80cb64041b1b97a1741e255c4.png'),
    },
    {
      id: '3',
      nombre: 'Arroz Campo',
      precio: 150,
      imagen: require('./7213d9b80cb64041b1b97a1741e255c4.png'),
    },
    {
      id: '4',
      nombre: 'Aceite Crisol',
      precio: 180,
      imagen: require('./7213d9b80cb64041b1b97a1741e255c4.png'),
    },
    {
      id: '5',
      nombre: 'Leche Rica',
      precio: 120,
      imagen: require('./7213d9b80cb64041b1b97a1741e255c4.png'),
    },
    {
      id: '6',
      nombre: 'Arroz Campo',
      precio: 150,
      imagen: require('./7213d9b80cb64041b1b97a1741e255c4.png'),
    },
    {
      id: '7',
      nombre: 'Aceite Crisol',
      precio: 180,
      imagen: require('./7213d9b80cb64041b1b97a1741e255c4.png'),
    },
    {
      id: '8',
      nombre: 'Leche Rica',
      precio: 120,
      imagen: require('./7213d9b80cb64041b1b97a1741e255c4.png'),
    },
  ]);
  const [seleccionados, setSeleccionados] = useState([]);

  const seleccionarProducto = item => {
    const existe = seleccionados.find(p => p.id === item.id);
    if (existe) {
      setSeleccionados(prev =>
        prev.map(p =>
          p.id === item.id ? { ...p, cantidad: p.cantidad + 1 } : p,
        ),
      );
    } else {
      setSeleccionados(prev => [...prev, { ...item, cantidad: 1 }]);
    }
  };

  const borrarProducto = id => {
    setSeleccionados(prev => prev.filter(p => p.id !== id));
  };

  const eliminarUnidad = id => {
    setSeleccionados(
      prev =>
        prev
          .map(item =>
            item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item,
          )
          .filter(item => item.cantidad > 0), // elimina los que llegan a 0
    );
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  const calcularTotal = () =>
    seleccionados.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0,
    );

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
          <Text style={{ fontSize: 20 }}>Productos</Text>
        </View>
      </View>

      <View style={Style.Body}>
        <View style={Style.BuscarContainer}>
          <Text style={{ marginBottom: 5 }}>Buscar producto</Text>
          <TextInput
            style={Style.InputBuscar}
            placeholder="Escribe el nombre del producto..."
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>

        <FlatList
          data={productosFiltrados}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={Style.FlatListContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={Style.ProductoCuadro}
              onPress={() => seleccionarProducto(item)}
            >
              <Image source={item.imagen} style={Style.ImagenProducto} />
              <Text style={Style.NombreProducto}>{item.nombre}</Text>
              <Text style={Style.PrecioProducto}>RD$ {item.precio}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Desglose de productos seleccionados */}
        <View style={Style.Desglose}>
          <Text style={Style.TituloDesglose}>Desglose de selección</Text>
          {seleccionados.length === 0 ? (
            <Text style={{ textAlign: 'center', color: 'gray' }}>
              No hay productos seleccionados
            </Text>
          ) : (
            seleccionados.map(item => (
              <View key={item.id} style={Style.ItemDesglose}>
                <Text style={{ flex: 2 }}>{item.nombre}</Text>
                <Text style={{ flex: 1, textAlign: 'center' }}>
                  x{item.cantidad}
                </Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>
                  RD$ {(item.precio * item.cantidad).toFixed(2)}
                </Text>
                <TouchableOpacity
                  onPress={() => eliminarUnidad(item.id)}
                  style={{ marginLeft: 15, marginRight: 10 }}
                >
                  <FontAwesome name="trash" size={20} color="red" />
                </TouchableOpacity>
              </View>
            ))
          )}
          <View style={Style.TotalContainer}>
            <Text style={Style.TotalTexto}>Total:</Text>
            <Text style={Style.TotalValor}>
              RD$ {calcularTotal().toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Botones de acción */}
        <View style={Style.Buttons}>
          <TouchableOpacity style={Style.ButtonsStyle}>
            <Text style={{ color: 'white' }}>Cancelar pedido</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[Style.ButtonsStyle, { backgroundColor: 'green' }]}
            onPress={() => {
              onSeleccionar(seleccionados);
              navigation.goBack();
            }}
          >
            <Text style={{ color: 'white' }}>Siguiente</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Body: {
    flex: 1,
    padding: 10,
  },
  BuscarContainer: {
    marginBottom: 10,
  },
  InputBuscar: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 8,
  },
  FlatListContainer: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  ProductoCuadro: {
    flexBasis: '48%',
    margin: '1%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    elevation: 3,
    alignSelf: 'flex-start',
  },
  ImagenProducto: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  NombreProducto: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  PrecioProducto: {
    fontSize: 13,
    color: 'green',
  },
  Desglose: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    maxHeight: '50%'
  },
  TituloDesglose: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ItemDesglose: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  TotalContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: 'gray',
    paddingTop: 5,
  },
  TotalTexto: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  TotalValor: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'green',
  },
  Buttons: {
    width: '100%',
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 30,
  },
  ButtonsStyle: {
    width: '40%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
  },
});
