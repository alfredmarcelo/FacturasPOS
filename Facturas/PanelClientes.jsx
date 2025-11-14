import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function Clientes({ setobtenernombre, setobtenerrnc }) {
  const [abrir, setabrir] = useState(false);
  const height = useSharedValue(85);
  const heightHeader = useSharedValue(25);
  const flatlist = useRef(null);
  const [select, setselect] = useState(null);

  const scrollIndex = (index) => {
    setabrir(prev => !prev);
    height.value = withSpring(abrir ? 85 : 300);
    heightHeader.value = withSpring(abrir ? 25 : 25);
    flatlist?.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  };

  const toggle = () => {
    setabrir(prev => !prev);
    height.value = withSpring(abrir ? 85 : 300);
    heightHeader.value = withSpring(abrir ? 25 : 25);
  };

  const clientes = [
    { id: 1, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 2, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 3, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 4, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 5, Nombre: 'Liseth', rnc: '123456789' },
    { id: 6, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 7, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 8, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 9, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 10, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 11, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 12, Nombre: 'Alfred Varela', rnc: '123456789' },
    { id: 13, Nombre: 'Alfred Varela', rnc: '123456789' },
  ];

  return (
    <Animated.View style={[Style.IAs, { height }]}>
      <Animated.View style={[Style.Header, { height: heightHeader }]}>
        <Text style={{ color: 'white' }}>Seleccionar Cliente</Text>
      </Animated.View>
      <FlatList
        contentContainerStyle={Style.Flatlist}
        ref={flatlist}
        data={clientes}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              Style.FlatlistContent,
              select === index && { backgroundColor: '#a4c48f77' },
            ]}
            onPress={() => {
              scrollIndex(index),
                setselect(index),
                setobtenerrnc(item.rnc),
                setobtenernombre(item.Nombre);
            }}
          >
            <Text>{item.Nombre}</Text>
            <Text>{item.rnc}</Text>
          </TouchableOpacity>
        )}
      />
      {!abrir && (
        <TouchableOpacity
          style={{
            opacity: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#ffffffff',
            position: 'absolute',
          }}
          onPress={toggle}
        ></TouchableOpacity>
      )}
    </Animated.View>
  );
}

const Style = StyleSheet.create({
  IAs: {
    width: '95%',
    height: '50%',
    borderWidth: 0,
    borderRadius: 11,
    backgroundColor: '#e4d4d471',
    shadowColor: '#000',
    position: 'relative',
  },
  Header: {
    width: '100%',
    backgroundColor: 'green',
    borderRadius: 10,
    borderEndEndRadius: 0,
    borderStartEndRadius: 0,
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 10,
    elevation: 10,
  },
  Icon: {
    height: '60%',
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 10,
    flexDirection: 'row',
    gap: 10,
  },
  Flatlist: {
    flexDirection: 'column',
    margin: 5,
    borderRadius: 5,
  },
  FlatlistContent: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10,
  },
});
