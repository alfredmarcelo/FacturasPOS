import { Text, TouchableOpacity, View } from 'react-native';

export default function Enviar({setenviarpopup}) {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#2e2c2cdc',
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width: '70%',
          height: '20%',
          backgroundColor: 'white',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            width: '100%',
            height: '50%',
            paddingTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 17 }}>Estas seguro de querer borrar?</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 20,
            width: '100%',
            height: '50%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: '20%',
              height: '50%',
              backgroundColor: 'green',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
          >
            <Text>Si</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '20%',
              height: '50%',
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={() => setenviarpopup(false)}
          >
            <Text>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
