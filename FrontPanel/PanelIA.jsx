import { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function IA() {
  const [abrir, setabrir] = useState(false);
  const [icon, seticon] = useState(false)
  const height = useSharedValue(70);
  const heightHeader = useSharedValue(25);

  const toggle = () => {
    setabrir(prev => !prev);
    height.value = withSpring(abrir ? 70 : 300);
    heightHeader.value = withSpring(abrir ? 25 : 25);
  };

  useEffect(()=>{
   setTimeout(() => {
    seticon(prev => !prev)
   }, 5000); 
  })
  
  return (
    <Animated.View style={[Style.IAs, { height }]}>
      <AnimatedTouchable
        onPress={toggle}
        style={[Style.Header, { height: heightHeader }]}
      >
        <Text style={{ color: 'white' }}>Resumen de IA</Text>
      </AnimatedTouchable>
      {!abrir && (
        <View style={Style.Icon}>
          <MaterialDesignIcons name={icon ? 'robot-excited' : 'robot'} size={30} color={'grey'} />
          <Text style={{ color: 'grey', fontSize: 12 }}>
            Puedo darte recomendaciones rapidas para tu negocio
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

const Style = StyleSheet.create({
  IAs: {
    width: '95%',
    borderWidth: 0,
    borderRadius: 11,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#e4d4d471',
    overflow: 'visible',
    shadowColor: '#000',
    alignItems: 'flex-start',
  },
  Header: {
    width: '100%',
    backgroundColor: '#2a6047',
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
});
