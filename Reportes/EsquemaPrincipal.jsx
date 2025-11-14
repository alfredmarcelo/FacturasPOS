import { View, StyleSheet } from 'react-native';
import Structura from '../Componentes/EstructuraBody';

export default function EsquemaPrincipal({ nombre, content }) {
  return (
    <Structura
      Headername={nombre}
      content={
        <View style={style.Container}>
            <View style={style.header}>

            </View>
          {content}
        </View>
      }
    />
  );
}

const style = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
  },
  header:{
    width:'100%',
    height: '30%',
    backgroundColor: 'grey'
  }
});
