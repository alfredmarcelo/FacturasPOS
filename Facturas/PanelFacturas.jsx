import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import Feather from '@react-native-vector-icons/feather';
import { useEffect, useState } from 'react';

export default function PanelFacturas({
  setabrirFac,
  setTrashpopup,
  setenviarpopup
}) {
  const [borrar, setborrar] = useState([]);
  const [TrashEnable, setTrashEnable] = useState(false);

  useEffect(() => {
    setTrashEnable(borrar.length > 0);
  });

  const clientes = [
    { id: 1, NCF: 'B0100000001', Fecha: '10/10/25', Total: 'RD$ 1000' },
    { id: 2, NCF: 'B0100000001', Fecha: '10/10/25', Total: 'RD$ 1000' },
    { id: 3, NCF: 'B0100000001', Fecha: '10/10/25', Total: 'RD$ 1000' },
    { id: 4, NCF: 'B0100000001', Fecha: '10/10/25', Total: 'RD$ 1000' },
    { id: 5, NCF: 'B0100000001', Fecha: '10/10/25', Total: 'RD$ 1000' },
    { id: 6, NCF: 'B0100000001', Fecha: '10/10/25', Total: 'RD$ 1000' },
    { id: 7, NCF: 'B0100000001', Fecha: '10/10/25', Total: 'RD$ 1000' },
    { id: 8, NCF: 'B0100000001', Fecha: '10/10/25', Total: 'RD$ 1000' },
    { id: 9, NCF: 'B0100000001', Fecha: '10/10/25', Total: 'RD$ 1000' },
    { id: 10, NCF: 'B0100000001', Fecha: '10/10/25', Total: 'RD$ 1000' },
  ];
  return (
    <View style={Style.Container}>
      <View style={Style.header}>
        <View style={Style.TextContainer}>
          <Text style={{ color: 'white', fontSize: 20 }}>Facturas</Text>
        </View>
        <View style={Style.FacturasButtons}>
          <TouchableOpacity style={Style.Icons}>
            <Feather name="search" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Style.Icons,
              { backgroundColor: TrashEnable ? 'white' : 'grey' },
            ]}
            disabled={!TrashEnable}
            onPress={() => setTrashpopup(true)}
          >
            <Feather name="trash" size={16} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Style.Icons,
              { backgroundColor: TrashEnable ? 'white' : 'grey' },
            ]}
            disabled={!TrashEnable}
            onPress={() => setenviarpopup(true)}
          >
            <Feather name="mail" size={17} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={Style.FlatlistContainer}
        data={clientes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={Style.FlatlistContent}
            onPress={() => setabrirFac(true)}
            onLongPress={() => {
              if (borrar.includes(item.id)) {
                setborrar(borrar.filter(id => id !== item.id));
              } else {
                setborrar([...borrar, item.id]);
              }
            }}
          >
            <View
              style={{
                width: '6%',
                height: '100%',
                backgroundColor: '#42a315d2',
                borderStartStartRadius: 10,
                borderStartEndRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white' }}>{item.id}</Text>
            </View>
            <Text>{item.NCF}</Text>
            <Text>{item.Fecha}</Text>
            <Text>{item.Total}</Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '10%',
                height: '100%',
              }}
            >
              <Feather name="alert-circle" size={25} color={'#dab12cff'} />
            </View>
            {borrar.includes(item.id) && (
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#00000079',
                  borderRadius: 10,
                }}
              ></View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const Style = StyleSheet.create({
  Container: {
    width: '95%',
    height: '91%',
    maxHeight: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'grey',
    position: 'relative',
  },
  header: {
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
  },
  TextContainer: {
    width: '50%',
    height: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    borderStartStartRadius: 10,
    borderEndEndRadius: 100,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FacturasButtons: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
  },
  Icons: {
    width: '19%',
    height: '65%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    elevation: 2,
  },
  FlatlistContainer: {
    flexDirection: 'column',
    padding: 5,
  },
  FlatlistContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
    elevation: 10,
  },
});
